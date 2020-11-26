import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/types/Task';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-new-task-dialog',
  templateUrl: './new-task-dialog.component.html',
  styleUrls: ['./new-task-dialog.component.scss']
})
export class NewTaskDialogComponent {

  newTask: Task;
  statusOptions = [
    { name: 'Planned', id: 0 },
    { name: 'In Progress', id: 1 },
    { name: 'Completed', id: 2 },
  ];

  constructor(private fireBaseSvc: FirebaseService, private dialog: MatDialogRef<NewTaskDialogComponent>) {
    this.newTask = {
      name: '',
      description: '',
      estimate: { hours: 0, minutes: 0, days: 0 },
      statusID: 1,
      isEditing: true,
      toDelete: false
    };
  }

  saveTask(): void {
    this.fireBaseSvc.saveTask(this.newTask).then(res => {
      console.log(res);
    });
  }

  cancel(): void {
    this.dialog.close();
  }
}
