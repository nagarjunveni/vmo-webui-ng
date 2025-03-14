export interface Vendor {
  id?: number;
  employeeIdentificationNumber: string;
  companyName: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  location: string;
  rating: number;
  commission: number;
  createdDate?: Date;
  updatedDate?: Date;
  status?: boolean;
}
