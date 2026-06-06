using Microsoft.AspNetCore.Mvc;

namespace TodoListApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TodoController : ControllerBase
{
    private readonly List<TodoItem> _todos;

    public TodoController(List<TodoItem> todos)
    {
        _todos = todos;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(_todos);
    }

    [HttpPost]
    public IActionResult Add([FromBody] TodoItem item)
    {
        item.Id = _todos.Count == 0 ? 1 : _todos.Max(t => t.Id) + 1;
        _todos.Add(item);
        return CreatedAtAction(nameof(GetAll), item);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var item = _todos.FirstOrDefault(t => t.Id == id);
        if (item == null) return NotFound();
        _todos.Remove(item);
        return NoContent();
    }
}