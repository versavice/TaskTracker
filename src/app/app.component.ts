import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { EstimateTime, Task } from 'src/types/Task';
import { NewTaskDialogComponent } from './new-task-dialog/new-task-dialog.component';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  taskList: Observable<any[]>;
  constructor(private fireBaseSvc: FirebaseService, public taskListConnection: AngularFirestore,
              private dialog: MatDialog) {
    this.taskList = taskListConnection.collection('tasks').valueChanges();
  }

  taskListColumns = ['name', 'description', 'estimate', 'status', 'action'];


  statusOptions = [
    { name: 'Planned', id: 0 },
    { name: 'In Progress', id: 1 },
    { name: 'Completed', id: 2 },
  ];

  ngOnInit(): void {
    // this.fireBaseSvc.getTaskList().subscribe(
    //   result => {
    //     this.taskList = new MatTableDataSource(result.payload.doc.data());
    //   });
  }

  addNewTaskTemplate(): void {
    // this.taskList.push({
    //   name: '',
    //   description: '',
    //   estimate: { hours: 0, minutes: 0, days: 0 },
    //   statusID: 1,
    //   isEditing: true,
    //   toDelete: false
    // });

    // required for table to update view after inserting data
    // this.taskList._updateChangeSubscription();

    const dialogRef = this.dialog.open(NewTaskDialogComponent, {
      height: '400px',
      width: '600px',
    });
  }

  saveTask(task: Task): void {
    this.fireBaseSvc.saveTask(task).then(res => {
      console.log(res);
    });
  }

}
