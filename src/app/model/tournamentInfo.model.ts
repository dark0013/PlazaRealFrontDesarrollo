import { TournamentParticipant } from './TournamentParticipant.model';

export interface TournamentByIdResponse {
    id: number;
    name: string;
    start_date: string;
    end_date: string;
    tournament_type: string;
    mode: string;
    category_id: number;
    status: string;
    description: string | null;
    isTeam: number; 
    partitioning_amount: number;
    created_at: string;
    updated_at: string;
    participants: TournamentParticipant[];
    matches: any[];
}
