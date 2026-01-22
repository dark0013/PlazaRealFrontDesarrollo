export interface CreateReservationPayload {
    scenario_id: number;
    id_sportmen: number;
    reservation_date: string; 
    start_time: string; 
    end_time: string; 
    responsable_person: string;
}