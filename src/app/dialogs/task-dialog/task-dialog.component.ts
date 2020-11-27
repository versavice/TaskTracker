import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/types/Task';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent {

  taskForSave: Task;
  isEditing = false;
  statusOptions = [
    { name: 'Planned', id: 0 },
    { name: 'In Progress', id: 1 },
    { name: 'Completed', id: 2 },
  ];

  constructor(private fireBaseSvc: FirebaseService, private dialog: MatDialogRef<TaskDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public taskToEdit: any) {

    if (taskToEdit != null) {
      this.taskForSave = taskToEdit;
      this.isEditing = true;
    } else {
      this.taskForSave = new Task();
    }
  }

  saveTask(): void {
    if (this.taskForSave.id != null) {
      // existing task, update
      this.fireBaseSvc.editTask(this.taskForSave);
    } else {
      // new task
      this.fireBaseSvc.saveTask(this.taskForSave);
    }
    this.close();
  }

  close(): void {
    this.dialog.close();
  }
}
