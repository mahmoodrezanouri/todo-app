
using System.ComponentModel.DataAnnotations;

namespace todo_app.Services.Models
{
    public class TodoTask
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Description is required.")]
        [StringLength(255, MinimumLength = 10, ErrorMessage = "Description must be between 10 and 255 characters.")]
        public string Description { get; set; }
        public DateTime? Deadline { get; set; }
        public DateTime? DueDate { get; set; }
        public bool Done { get; set; }
    }
}
