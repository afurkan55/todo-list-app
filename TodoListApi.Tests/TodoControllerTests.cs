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

    [Fact]
    public void Update_UpdatesIsCompleted_WhenIdExists()
   {
        var controller = CreateController();
        var item = new TodoItem { Title = "Test todo" };
        controller.Add(item);

        var updatedItem = new TodoItem { Id = 1, Title = "Test todo", IsCompleted = true };
        controller.Update(1, updatedItem);

        var result = controller.GetAll() as OkObjectResult;
        var todos = result!.Value as List<TodoItem>;
        Assert.True(todos![0].IsCompleted);
    }

    [Fact]
    public void Update_ReturnsNotFound_WhenIdDoesNotExist()
   {

    var controller = CreateController();
    var updatedItem = new TodoItem { Id = 99, Title = "Test", IsCompleted = true };
    var result = controller.Update(99, updatedItem);
    Assert.IsType<NotFoundResult>(result);
   }
}