export interface TournamentParticipant {
    id: number;
    tournament_id: number;
    sportsman_id: number;
    partner_id: number | null;
    name_team: string | null;
}
