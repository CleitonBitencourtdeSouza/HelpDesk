using System.ComponentModel.DataAnnotations;

namespace ProjetoHelpDesk.Models
{
    public class UsuarioRegisterDto
    {
        [Required]
        [MaxLength(100)]
    public string? Nome { get; set; }

        [Required]
        [MaxLength(100)]
    public string? Email { get; set; }

        [Required]
        [MaxLength(100)]
    public string? Senha { get; set; }
    }

    public class UsuarioLoginDto
    {
        [Required]
        [MaxLength(100)]
    public string? Email { get; set; }

        [Required]
        [MaxLength(100)]
    public string? Senha { get; set; }
    }
}
