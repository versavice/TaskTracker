import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Task } from 'src/types/Task';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {

    constructor(private firestore: AngularFirestore, private snackBar: MatSnackBar) { }

    public saveTask(task: Task): Promise<Task> {
        return new Promise<any>((resolve, reject) => {
            this.firestore.collection('tasks')
            // Object.assign because for some reason Firebase throws error:
            // "Data must be an object, but it was: a custom object"
                .add(Object.assign({}, task))
                .then(res => {
                    console.log(res);
                }, err => {
                    console.error(err);
                    reject(err);
                });
        });
    }

    public getTaskList(): Observable<any> {
        return this.firestore.collection('tasks').snapshotChanges();
    }
}
