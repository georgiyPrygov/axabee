export interface IMission {
    id: string;
    description: string;
}
export interface ILaunch {
    mission_name: string;
    launch_date_utc: Date;
    mission_id: string;
    checked: boolean;
    description: string
}