import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/types/Task';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-new-task-dialog',
  templateUrl: './new-task-dialog.component.html',
  styleUrls: ['./new-task-dialog.component.scss']
})
export class NewTaskDialogComponent {

  taskForSave: Task;
  isEditing = false;
  statusOptions = [
    { name: 'Planned', id: 0 },
    { name: 'In Progress', id: 1 },
    { name: 'Completed', id: 2 },
  ];

  constructor(private fireBaseSvc: FirebaseService, private dialog: MatDialogRef<NewTaskDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public taskToEdit: any) {

    if (taskToEdit != null) {
      this.taskForSave = taskToEdit;
      this.isEditing = true;
    } else {
      this.taskForSave = new Task();
    }
  }

  saveTask(): void {
    this.fireBaseSvc.saveTask(this.taskForSave);
    this.close();
  }

  close(): void {
    this.dialog.close();
  }
}
