import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Task } from 'src/types/Task';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {

    constructor(private firestore: AngularFirestore) { }

    public saveTask(task: Task): Promise<Task> {
        return new Promise<any>((resolve, reject) => {
            this.firestore.collection('tasks')
                .add(task);
        });
    }

    public getTaskList(): Observable<any> {
        return this.firestore.collection('tasks').snapshotChanges();
    }
}
