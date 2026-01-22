import { ScheduleItem } from "./ScheduleItem.model";

export interface ScheduleResponse {
    success: boolean;
    data: ScheduleItem[];
}