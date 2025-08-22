using Microsoft.EntityFrameworkCore;
using ProjetoHelpDesk.Models;

namespace ProjetoHelpDesk.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // Tabelas do banco de dados
        public DbSet<Chamado> Chamados { get; set; }
        // Adicione outras tabelas aqui (ex: Usuarios)
    }
}