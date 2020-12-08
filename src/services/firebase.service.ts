import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Task } from 'src/types/Task';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {

    constructor(private firestore: AngularFirestore) { }

    public saveTask(task: Task): Promise<any> {
        return new Promise<any>(result => {
            this.firestore.collection('tasks')
                // Object.assign because for some reason Firebase throws error:
                // "Data must be an object, but it was: a custom object"
                .add(Object.assign({}, task));
        });
    }

    public editTask(task: Task): Promise<Task> {
        return new Promise<any>(result => {
            this.firestore.collection('tasks')
                .doc(task.id)
                .set(task);
        });
    }

    public deleteTask(task: Task): Promise<Task> {
        return new Promise<any>(result => {
            this.firestore.collection('tasks')
                .doc(task.id)
                .delete();
        });
    }

    public getTaskList(): Observable<any> {
        return this.firestore.collection('tasks').snapshotChanges();
    }
}
