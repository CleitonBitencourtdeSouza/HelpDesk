using Microsoft.AspNetCore.Http;
using ProjetoHelpDesk.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using ProjetoHelpDesk.Data;

namespace ProjetoHelpDesk.Controllers
{
    [Route("api/[controller]")] // Rota base: /api/chjamados
    [ApiController]
    public class ChamadosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ChamadosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/chamados
        // Suporta filtros, ordenação e paginação via query string, por exemplo:
        //   /api/chamados?status=Aberto&search=impressora&sortBy=dataAbertura&sortDir=desc&page=1&pageSize=10
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Chamado>>> Get(
            [FromQuery] StatusChamado? status,
            [FromQuery] string? search,
            [FromQuery] string? sortBy,
            [FromQuery] string? sortDir,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10)
        {
            if (page <= 0) page = 1;
            if (pageSize <= 0 || pageSize > 100) pageSize = 10;

            IQueryable<Chamado> query = _context.Chamados.AsNoTracking();

            // Filtros
            if (status.HasValue)
            {
                query = query.Where(c => c.Status == status.Value);
            }
            if (!string.IsNullOrWhiteSpace(search))
            {
                var term = search.Trim().ToLower();
                query = query.Where(c =>
                    (c.Titulo != null && c.Titulo.ToLower().Contains(term)) ||
                    (c.Descricao != null && c.Descricao.ToLower().Contains(term))
                );
            }

            // Ordenação
            bool desc = string.Equals(sortDir, "desc", StringComparison.OrdinalIgnoreCase);
            switch ((sortBy ?? string.Empty).ToLower())
            {
                case "titulo":
                    query = desc ? query.OrderByDescending(c => c.Titulo) : query.OrderBy(c => c.Titulo);
                    break;
                case "status":
                    query = desc ? query.OrderByDescending(c => c.Status) : query.OrderBy(c => c.Status);
                    break;
                case "dataabertura":
                case "data":
                case "created":
                    query = desc ? query.OrderByDescending(c => c.DataAbertura) : query.OrderBy(c => c.DataAbertura);
                    break;
                default:
                    // Padrão: DataAbertura desc (mais recentes primeiro)
                    query = query.OrderByDescending(c => c.DataAbertura);
                    break;
            }

            // Paginação
            var total = await query.CountAsync();
            var items = await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();

            // Metadados de paginação em headers para facilitar consumo por front-ends
            Response.Headers["X-Total-Count"] = total.ToString();
            Response.Headers["X-Page"] = page.ToString();
            Response.Headers["X-Page-Size"] = pageSize.ToString();

            return Ok(items);
        }

        // GET: api/chamados/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Chamado>> GetById(int id)
        {
            var chamado = await _context.Chamados.FindAsync(id);
            if (chamado == null) return NotFound();
            return Ok(chamado);
        }

        // POST: api/chamados
        [HttpPost]
        public async Task<ActionResult<Chamado>> Post([FromBody] Chamado novoChamado)
        {
            novoChamado.DataAbertura = DateTime.Now;
            _context.Chamados.Add(novoChamado);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = novoChamado.Id }, novoChamado);
        }

        // PUT: api/chamados/5
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Put(int id, [FromBody] Chamado chamadoAtualizado)
        {
            // Observação: não exigimos Id no corpo; usamos o Id da rota
            var existente = await _context.Chamados.FindAsync(id);
            if (existente == null) return NotFound();

            // Atualiza apenas campos editáveis
            existente.Titulo = chamadoAtualizado.Titulo;
            existente.Descricao = chamadoAtualizado.Descricao;
            existente.Status = chamadoAtualizado.Status;
            // DataAbertura permanece a original

            await _context.SaveChangesAsync();
            return Ok(existente);
        }

        // DELETE: api/chamados/5
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var existente = await _context.Chamados.FindAsync(id);
            if (existente == null) return NotFound();

            _context.Chamados.Remove(existente);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
