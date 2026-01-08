export class Reservation {
  id: number;
  sportsmanId: number;
  courtId: number;
  reservationDate: string;
  startTime: string;
  endTime: string;
  duration: number;
  status: string;
  reservationType: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
