export interface Tournament {
    id?: number;
    name: string;
    description: string;
    tournament_type: string;
    mode: string;
    category_id: number;
    start_date: string;
    end_date: string;
    status?: string;
    created_at?: string;
    updated_at?: string;
}
