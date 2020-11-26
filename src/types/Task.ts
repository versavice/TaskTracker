
export interface Task {
    name: string;
    description: string;
    estimate: EstimateTime;
    statusID: number;

    // front-end properties
    isEditing?: boolean;
    toDelete?: boolean;
}


export interface EstimateTime {
    minutes: number;
    hours: number;
    days: number;
}
