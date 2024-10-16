import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskListService } from '../../service/task-list.service';
import { ToastrService } from 'ngx-toastr';
import { task } from '../../models/task.model';
@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css'
})
export class TasksListComponent implements OnInit{
     taskList:any;
     //inject used services and modules
     constructor(private http:HttpClient 
    , private tasks:TaskListService
    ,private toastr:ToastrService){}

  ngOnInit(): void {
    //fetch the data from the json server 
    this.tasks.getTaskLists().subscribe((response)=>{
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


  uncheck(i:number){
    //  make the completed status of the unchecked task = false 
    this.taskList[i].completed = false;
}

}
