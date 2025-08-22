using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;

namespace ProjetoHelpDesk.Models
{

    public enum StatusChamado
    {
        Aberto,
        EmAndamento,
        Fechado
    }
    public class Chamado
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(200)]
        public string? Titulo { get; set; }

        [MaxLength(2000)]
        public string? Descricao { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]

        public StatusChamado Status { get; set; } = StatusChamado.Aberto; // Valores possíveis: "Aberto", "Em Andamento", "Fechado"
        public DateTime DataAbertura { get; set; } = DateTime.Now;
    }
}
