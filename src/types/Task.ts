
export class Task {

    constructor() {
        this.id = undefined;
        this.name = '';
        this.description = '';
        this.estimate = { hours: 0, minutes: 0, days: 0 },
        this.statusID = 0;
        this.isDeleted = false;
    }

    id: string | undefined;
    name: string;
    description: string;
    estimate: EstimateTime;
    statusID: number;
    isDeleted: boolean;
}


export interface EstimateTime {
    minutes: number;
    hours: number;
    days: number;
}
