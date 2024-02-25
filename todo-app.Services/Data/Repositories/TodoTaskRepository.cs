using System.Threading.Tasks;
using todo_app.Services.Models;

namespace todo_app.Services.Data.Repositories
{

    public class TodoTaskRepository : ITodoTaskRepository<TodoTask>
    {
        private readonly TodoTaskDbContext _context;

        public TodoTaskRepository(TodoTaskDbContext context)
        {
            _context = context;
        }

        public IEnumerable<TodoTask> GetAll()
        {
            return _context.Tasks.ToList();
        }

        public TodoTask GetById(int id)
        {
            return _context.Tasks.FirstOrDefault(t => t.Id == id);
        }

        public void Add(TodoTask task)
        {
            _context.Add(task);
            _context.SaveChanges();
        }

        public void Update(TodoTask task)
        {
            _context.Tasks.Update(task);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var task = _context.Tasks.FirstOrDefault(t => t.Id == id);
            _context.Tasks.Remove(task);
            _context.SaveChanges();
        }


    }

}
