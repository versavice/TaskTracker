import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from 'src/types/Task';
import { FirebaseService } from '../../services/firebase.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { TaskDialogComponent } from '../dialogs/task-dialog/task-dialog.component';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss']
})
export class TaskTableComponent implements OnChanges {

  @Input() taskList: Task[] = [];
  @Input() title = '';

  dayTotal = 0;
  hourTotal = 0;
  minuteTotal = 0;

  constructor(private firebaseSvc: FirebaseService, private dialog: MatDialog) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.taskList.currentValue.length > 0) {
      const list = changes.taskList.currentValue as Task[];

      // this.dayTotal = list.map(t => t.estimate.days).reduce((a, b) => a + (b || 0), 0);
      // this.hourTotal = list.map(t => t.estimate.hours).reduce((a, b) => a + (b || 0), 0);
      // this.minuteTotal = list.map(t => t.estimate.minutes).reduce((a, b) => a + (b || 0), 0);
      this.dayTotal = 0;
      this.hourTotal = 0;
      this.minuteTotal = 0;

      list.forEach(task => {
        this.dayTotal += task.estimate.days;
        this.hourTotal += task.estimate.hours;
        this.minuteTotal += task.estimate.minutes;
      });
    }
  }

  editTask(task: Task): void {
    this.dialog.open(TaskDialogComponent, {
      height: '400px',
      width: '600px',
      // Object.assign so that Task changes are not applied until save
      data: (Object.assign({}, task))
    });
  }

  deleteTask(task: Task, event: any): void {
    event.stopPropagation();
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
