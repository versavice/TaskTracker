
export class Task {

    constructor() {
        this.id = undefined;
        this.name = '';
        this.description = '';
        this.estimate = { hours: 0, minutes: 0, days: 0 },
        this.statusID = 0;
    }

    id: string | undefined;
    name: string;
    description: string;
    estimate: EstimateTime;
    statusID: number;
}


export class EstimateTime {
    constructor() {
        this.minutes = 0;
        this.hours = 0;
        this.days = 0;
    }

    minutes: number;
    hours: number;
    days: number;
}
