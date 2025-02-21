import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskListService } from '../../service/task-list.service';
import { ToastrService } from 'ngx-toastr';
import { task } from '../../models/task.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css'
})
export class TasksListComponent implements OnInit{
  @ViewChild('InputEle') inputelement!:ElementRef;
     public newTask!:task;
     public taskList!:any;
     //inject used services and modules
     constructor(private http:HttpClient 
    , private taskService:TaskListService
    ,private toastr:ToastrService){

    }

  ngOnInit(): void {
    //fetch the data from the json server 
    this.taskService.getTaskLists().subscribe((response)=>{
      this.taskList = response;
     })
  }

  //function when changing the checking value of the checkbox
  onCheckboxChange(event:any , index:number){
    if(event.target.checked){
      //method check() executed when checked
      this.check(index);
    }
    else{
      //method uncheck() executed when unchecked
      this.uncheck(index);
    }
  }

  // method to check the selected task
  check(i:number){
      //  make the completed status of the checked task = true 
        this.taskList[i].completed = true;
      // toaster message  
        this.toastr.success(`${this.taskList[i].task} is completed!` , '' , {
            timeOut:1500
        });
  }

  selectValue(input:HTMLInputElement){
    input.select();
  }

  addNewTask(){
    const newTaskName = this.inputelement.nativeElement.value;
    const taskID = uuidv4();
    const isCompleted = false;

   this.newTask = {
    id:taskID ,
    task:newTaskName,
    completed:false
   }
    
    this.taskService.addTask(this.newTask).subscribe({
      next:(res)=>this.toastr.success('Task Added!' , '' , {
        timeOut:3000
      }),
     error:(err)=>this.toastr.error('failed to Add task' , '' , {
      timeOut:3000
     })
    })
  }

  uncheck(i:number){
    //  make the completed status of the unchecked task = false 
    this.taskList[i].completed = false;
}

}
