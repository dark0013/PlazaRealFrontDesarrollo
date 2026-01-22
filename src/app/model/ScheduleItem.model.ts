export interface ScheduleItem {
    hour: string;
    responsable: string | null;
    disponibilidad: 'LIBRE' | 'OCUPADO';
}