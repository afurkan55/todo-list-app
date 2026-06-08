using Microsoft.AspNetCore.Mvc;
using TodoListApi.Controllers;

namespace TodoListApi.Tests;

public class TodoControllerTests
{
    private TodoController CreateController()
    {
        var todos = new List<TodoItem>();
        return new TodoController(todos);
    }

    [Fact]
    public void GetAll_ReturnsEmptyList_WhenNoTodosExist()
    {
        var controller = CreateController();
        var result = controller.GetAll() as OkObjectResult;
        var todos = result!.Value as List<TodoItem>;
        Assert.Empty(todos!);
    }

    [Fact]
    public void Add_ReturnsTodo_WhenTitleIsValid()
    {
        var controller = CreateController();
        var item = new TodoItem { Title = "Test todo" };
        controller.Add(item);

        var result = controller.GetAll() as OkObjectResult;
        var todos = result!.Value as List<TodoItem>;
        Assert.Single(todos!);
        Assert.Equal("Test todo", todos![0].Title);
    }

    [Fact]
    public void Delete_RemovesTodo_WhenIdExists()
    {
        var controller = CreateController();
        var item = new TodoItem { Title = "To delete" };
        controller.Add(item);

        controller.Delete(1);

        var result = controller.GetAll() as OkObjectResult;
        var todos = result!.Value as List<TodoItem>;
        Assert.Empty(todos!);
    }
}