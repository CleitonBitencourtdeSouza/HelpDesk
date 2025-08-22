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
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Chamado>>> Get()
        {
            var chamados = await _context.Chamados.AsNoTracking().ToListAsync();
            return Ok(chamados);
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
