using todo_app.Services;
using todo_app.Services.Data.Repositories;
using todo_app.Services.Models;

public class TodoTaskService : ITodoTaskService
{
    private readonly ITodoTaskRepository<TodoTask> _taskRepository;

    public TodoTaskService(ITodoTaskRepository<TodoTask> taskRepository)
    {
        _taskRepository = taskRepository ?? throw new ArgumentNullException(nameof(taskRepository));
    }

    public IEnumerable<TodoTask> GetAllTasks()
    {
        return _taskRepository.GetAll();
    }

    public TodoTask GetTaskById(int taskId)
    {
        return _taskRepository.GetById(taskId);
    }

    public void AddTask(TodoTask task)
    {
        if (task == null)
        {
            throw new ArgumentNullException(nameof(task));
        }

        _taskRepository.Add(task);
    }

    public void MarkTaskAsDone(int taskId)
    {
        var task = _taskRepository.GetById(taskId);
        if (task != null)
        {
            task.SetDone(true);
            _taskRepository.Update(task);
        }
    }

    public void DeleteTask(int taskId)
    {
        _taskRepository.Delete(taskId);
    }

    public IEnumerable<TodoTask> GetOverdueTasks()
    {
        var currentDate = DateTime.Now;
        return _taskRepository.GetAll()
            .Where(task => task.Deadline.HasValue && task.Deadline.Value < currentDate && !task.Done);
    }

    public void MarkTaskAsUnDone(int taskId)
    {
        var task = _taskRepository.GetById(taskId);
        if (task != null)
        {
            task.SetDone(false);
            _taskRepository.Update(task);
        }
    }
}
