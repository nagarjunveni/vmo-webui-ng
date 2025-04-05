export interface Milepost {
  id?: number;
  name: string;
  description: string;
  dueDate: string;
  amount: number;
  status: boolean;
  sowId?: number;
}