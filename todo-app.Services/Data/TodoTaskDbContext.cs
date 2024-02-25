using Microsoft.EntityFrameworkCore;
using todo_app.Services.Models;

namespace todo_app.Services.Data
{
    public class TodoTaskDbContext : DbContext
    {
        public TodoTaskDbContext(DbContextOptions<TodoTaskDbContext> options)
            : base(options)
        {
        }



        public DbSet<TodoTask> Tasks { get; set; }

    }
}
