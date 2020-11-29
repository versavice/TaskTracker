import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Task } from 'src/types/Task';
import { FirebaseService } from '../../../services/firebase.service';

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

  taskForm: FormGroup;

  constructor(private fireBaseSvc: FirebaseService, private dialog: MatDialogRef<TaskDialogComponent>,
    private snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public taskToEdit: any) {

    if (taskToEdit != null) {
      this.taskForSave = taskToEdit;
      this.isEditing = true;
    } else {
      this.taskForSave = new Task();
    }

    this.taskForm = new FormGroup({
      id: new FormControl(this.taskForSave.id),
      name: new FormControl(this.taskForSave.name, [Validators.required, Validators.maxLength(20)]),
      description: new FormControl(this.taskForSave.description, [Validators.required, Validators.maxLength(750)]),
      estimate: new FormGroup({
        days: new FormControl(this.taskForSave.estimate.days,
          [Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]*$')]),
        minutes: new FormControl(this.taskForSave.estimate.hours,
          [Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]*$')]),
        hours: new FormControl(this.taskForSave.estimate.minutes,
          [Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]*$')])
      }),
      statusID: new FormControl(this.taskForSave.statusID, [Validators.required])
    });
  }



  saveTask(): void {
    if (this.taskForm.valid) {
      this.taskForSave = this.taskForm.value;
      if (this.taskForSave.id != null) {
        // existing task, update
        this.fireBaseSvc.editTask(this.taskForSave);
      } else {
        // new task
        this.fireBaseSvc.saveTask(this.taskForSave);
      }
      this.snackBar.open('Task saved', 'Dismiss', {
        panelClass: ['success-snackbar']
      });
      this.close();
    } else {
      this.snackBar.open('There are errors in the Task form', 'Dismiss', {
        panelClass: ['error-snackbar']
      });
    }
  }

  close(): void {
    this.dialog.close();
  }
}
