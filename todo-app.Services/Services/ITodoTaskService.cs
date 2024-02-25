using todo_app.Services.Models;

namespace todo_app.Services
{

    public interface ITodoTaskService
    {
        IEnumerable<TodoTask> GetAllTasks();
        TodoTask GetTaskById(int taskId);
        void AddTask(TodoTask task);
        void MarkTaskAsDone(int taskId);
        void DeleteTask(int taskId);
        IEnumerable<TodoTask> GetOverdueTasks();
    }
}
