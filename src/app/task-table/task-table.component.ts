import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Task } from 'src/types/Task';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { TaskDialogComponent } from '../dialogs/task-dialog/task-dialog.component';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss']
})
export class TaskTableComponent {

  @Input() taskList: Task[] = [];
  @Input() title = '';

  constructor(private firebaseSvc: FirebaseService, private dialog: MatDialog) {
  }

  editTask(task: Task): void {
    this.dialog.open(TaskDialogComponent, {
      height: '400px',
      width: '600px',
      // Object.assign so that Task changes are not shown in table until save
      data: Object.assign({}, task)
    });
  }

  deleteTask(task: Task): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '500px',
      data: {
        confirmQuestion: 'Are you sure you want to delete "' + task.name + '"?',
        yesButtonText: 'Yes',
        noButtonText: 'Cancel',
      }
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.firebaseSvc.deleteTask(task);
        }
      });
  }
}
