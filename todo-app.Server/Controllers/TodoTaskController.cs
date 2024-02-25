using Microsoft.AspNetCore.Mvc;
using todo_app.Services.Models;
using todo_app.Services;
using Microsoft.AspNetCore.Cors;

[Route("api/tasks")]
[ApiController]
[DisableCors]
public class TodoTaskController : ControllerBase
{
    private readonly ITodoTaskService _todoTaskService;

    public TodoTaskController(ITodoTaskService todoTaskService)
    {
        _todoTaskService = todoTaskService ?? throw new ArgumentNullException(nameof(todoTaskService));
    }

    [HttpGet]
    public IActionResult GetAllTasks()
    {
        var tasks = _todoTaskService.GetAllTasks();
        return Ok(tasks);
    }

    [HttpGet("{id}")]
    public ActionResult<TodoTask> GetTaskById(int id)
    {
        var task = _todoTaskService.GetTaskById(id);
        if (task == null)
        {
            return NotFound();
        }

        return Ok(task);
    }

    [HttpPost]
    public ActionResult<TodoTask> AddTask([FromBody] TodoTask task)
    {
        if (task == null)
        {
            return BadRequest("Invalid task data.");
        }

        _todoTaskService.AddTask(task);
        return CreatedAtAction(nameof(GetTaskById), new { id = task.Id }, task);
    }

    [HttpPut("{id}/done")]
    public IActionResult MarkTaskAsDone(int id)
    {
        var existingTask = _todoTaskService.GetTaskById(id);
        if (existingTask == null)
        {
            return NotFound();
        }

        _todoTaskService.MarkTaskAsDone(id);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteTask(int id)
    {
        var existingTask = _todoTaskService.GetTaskById(id);
        if (existingTask == null)
        {
            return NotFound();
        }

        _todoTaskService.DeleteTask(id);
        return NoContent();
    }

    [HttpGet("overdue")]
    public ActionResult<IEnumerable<TodoTask>> GetOverdueTasks()
    {
        var overdueTasks = _todoTaskService.GetOverdueTasks();
        return Ok(overdueTasks);
    }
}
