
namespace todo_app.Services.Models
{
    public class TodoTask
    {
        public int Id { get; set; }
        public string Desription { get; set; }
        public DateTime? Deadline { get; set; }
        public bool Done { get; set; }
    }
}
