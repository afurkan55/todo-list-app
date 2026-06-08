import { Component, signal, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface TodoItem {
  id: number;
  title: string;
  isCompleted: boolean;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  todos = signal<TodoItem[]>([]);
  newTitle = signal('');

  private apiUrl = 'http://localhost:5287/api/Todo';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.http.get<TodoItem[]>(this.apiUrl).subscribe((data) => {
      this.todos.set(data);
    });
  }

  addTodo() {
    if (!this.newTitle()) return;
    this.http
      .post<TodoItem>(this.apiUrl, { title: this.newTitle(), isCompleted: false })
      .subscribe(() => {
        this.newTitle.set('');
        this.loadTodos();
      });
  }

  deleteTodo(id: number) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      this.loadTodos();
    });
  }

  toggleTodo(id: number) {
    const todo = this.todos().find(t => t.id === id);
    if (!todo) return;
    this.http.put<TodoItem>(`${this.apiUrl}/${id}`, { ...todo, isCompleted: !todo.isCompleted })
      .subscribe(() => {
        this.loadTodos();
      });
  }
}
