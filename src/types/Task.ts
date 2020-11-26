
export class Task {

    constructor() {
        this.name = '';
        this.description = '';
        this.estimate = { hours: 0, minutes: 0, days: 0 },
        this.statusID = 0;
    }

    name: string;
    description: string;
    estimate: EstimateTime;
    statusID: number;
}


export interface EstimateTime {
    minutes: number;
    hours: number;
    days: number;
}
