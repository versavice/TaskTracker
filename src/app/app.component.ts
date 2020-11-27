import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Task } from 'src/types/Task';
import { TaskDialogComponent } from './dialogs/task-dialog/task-dialog.component';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  loading = true;
  taskListColumns = ['name', 'description', 'estimate', 'status', 'action'];

  plannedTaskList: any[] = [];
  inProgressTaskList: any[] = [];
  completedTaskList: any[] = [];


  constructor(private fireBaseSvc: FirebaseService, public taskListConnection: AngularFirestore,
              private dialog: MatDialog, private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    // async connection with task database
    this.fireBaseSvc.getTaskList().subscribe(
      result => {

        const taskList = result.map((a: any) => {
          const data = a.payload.doc.data() as Task;
          data.id = a.payload.doc.id;
          return { ...data };
        });


        this.plannedTaskList = taskList.filter((t: any) => t.statusID === 0);
        this.inProgressTaskList = taskList.filter((t: any) => t.statusID === 1);
        this.completedTaskList = taskList.filter((t: any) => t.statusID === 2);
        this.loading = false;
      });
  }


  ngOnInit(): void {
    this.iconRegistry.addSvgIcon('delete_outline',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/delete_outline.svg'));
    this.iconRegistry.addSvgIcon('delete_filled',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/delete_filled.svg'));
    this.iconRegistry.addSvgIcon('edit',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/edit.svg'));
    this.iconRegistry.addSvgIcon('undo',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/undo.svg'));
  }

  addNewTaskTemplate(): void {
    this.dialog.open(TaskDialogComponent, {
      height: '400px',
      width: '600px',
    });
  }

}
