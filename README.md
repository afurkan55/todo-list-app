# Todo List App

A full-stack Todo List application built with Angular and .NET Web API as part of a technical assessment.

## Tech Stack

**Frontend**
- Angular 22
- TypeScript
- CSS
- HTML

**Backend**
- .NET 10 Web API
- C#
- In-memory data storage
- Swagger UI for API documentation

**Testing**
- xUnit (unit tests)
- Playwright (E2E tests) with Page Object Model pattern

## Project Structure

```
todo-list-app/
├── TodoListApi/          # .NET Web API backend
│   └── Controllers/      # API controllers
├── TodoListApi.Tests/    # Unit tests (xUnit)
└── TodoListApp/          # Angular frontend
    └── tests/            # E2E tests (Playwright)
        └── pages/        # Page Object Model
```

## Getting Started

### Prerequisites
- Node.js v18+
- .NET 10 SDK
- Angular CLI

### Run the Backend

```bash
cd TodoListApi
dotnet run
```

API runs on `http://localhost:5287`  
Swagger UI available at `http://localhost:5287/swagger`

### Run the Frontend

```bash
cd TodoListApp
npm install
ng serve
```

App runs on `http://localhost:4200`

### Run Unit Tests

```bash
cd TodoListApi.Tests
dotnet test
```

### Run E2E Tests

Make sure both backend and frontend are running, then:

```bash
cd TodoListApp
npx playwright test
```

## Architecture Decisions

- **In-memory storage** was used as CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
