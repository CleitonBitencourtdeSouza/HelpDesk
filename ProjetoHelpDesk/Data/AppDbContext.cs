using Microsoft.EntityFrameworkCore;
using ProjetoHelpDesk.Models;

namespace ProjetoHelpDesk.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // Tabelas do banco de dados
        public DbSet<Chamado> Chamados { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configuração da entidade Usuario
            modelBuilder.Entity<Usuario>()
                .HasIndex(u => u.Email)
                .IsUnique();

            // Configuração da entidade Chamado (sem relacionamento com Usuario)

            // Configuração de índices
            modelBuilder.Entity<Chamado>()
                .HasIndex(c => c.Status);
                
            modelBuilder.Entity<Chamado>()
                .HasIndex(c => c.DataAbertura);
        }
    }
}