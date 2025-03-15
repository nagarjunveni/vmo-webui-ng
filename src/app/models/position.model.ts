export interface Position {
  id?: number;
  title: string;
  description: string;
  amount: number;
  hourlyRate: number;
  monthlyRate: number;
  skills: string;
  expertise: string;
  createdDate?: Date;
  updatedDate?: Date;
  status?: boolean;
}