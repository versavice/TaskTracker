import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Task } from 'src/types/Task';
import { NewTaskDialogComponent } from './new-task-dialog/new-task-dialog.component';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  loading = true;
  plannedTaskList: any[] = [];
  inProgressTaskList: any[] = [];
  completedTaskList: any[] = [];

  constructor(private fireBaseSvc: FirebaseService, public taskListConnection: AngularFirestore,
    private dialog: MatDialog, private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    // async connection with task database
    taskListConnection.collection('tasks').valueChanges().subscribe(
      result => {
        console.log(result);
        this.plannedTaskList = result.filter((t: any) => t.statusID === 0);
        this.inProgressTaskList = result.filter((t: any) => t.statusID === 1);
        this.completedTaskList = result.filter((t: any) => t.statusID === 2);
        this.loading = false;
      });
  }

  taskListColumns = ['name', 'description', 'estimate', 'status', 'action'];

  statusOptions = [
    { name: 'Planned', id: 0 },
    { name: 'In Progress', id: 1 },
    { name: 'Completed', id: 2 },
  ];

  ngOnInit(): void {
    this.iconRegistry.addSvgIcon('delete',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/delete.svg'));
    this.iconRegistry.addSvgIcon('edit',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/edit.svg'));
  }

  addNewTaskTemplate(): void {
    this.dialog.open(NewTaskDialogComponent, {
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
