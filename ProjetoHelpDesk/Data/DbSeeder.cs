using ProjetoHelpDesk.Models;

namespace ProjetoHelpDesk.Data
{
    public static class DbSeeder
    {
        public static void Seed(AppDbContext db)
        {
            // Se já tiver dados, não faz nada
            if (db.Chamados.Any()) return;

            var agora = DateTime.Now;
            var seed = new List<Chamado>
            {
                new Chamado
                {
                    Titulo = "Erro ao acessar sistema",
                    Descricao = "Usuário relata erro 500 ao logar.",
                    Status = StatusChamado.Aberto,
                    DataAbertura = agora.AddDays(-2)
                },
                new Chamado
                {
                    Titulo = "Impressora não imprime",
                    Descricao = "Fila trava ao enviar PDF.",
                    Status = StatusChamado.EmAndamento,
                    DataAbertura = agora.AddDays(-1)
                },
                new Chamado
                {
                    Titulo = "Solicitação de acesso ao ERP",
                    Descricao = "Novo colaborador precisa de acesso.",
                    Status = StatusChamado.Fechado,
                    DataAbertura = agora.AddHours(-12)
                }
            };

            db.Chamados.AddRange(seed);
            db.SaveChanges();
        }
    }
}
