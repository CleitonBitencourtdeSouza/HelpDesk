using System.ComponentModel.DataAnnotations;

namespace ProjetoHelpDesk.Models
{
    public class Usuario
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Nome { get; set; }

        [Required]
        [MaxLength(100)]
        public string Email { get; set; }

        [Required]
        [MaxLength(255)]
        public string SenhaHash { get; set; }

        // Navegação para os chamados do usuário
        public ICollection<Chamado> Chamados { get; set; } = new List<Chamado>();
    }
}
