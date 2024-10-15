import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {
  // injecting the HttpClient module in the service
  constructor(private http:HttpClient) { 
  }

 
  // method to return observable of the static json data 
  getTaskLists(){
    return this.http.get('http://localhost:3000/tasks')
  }
}
