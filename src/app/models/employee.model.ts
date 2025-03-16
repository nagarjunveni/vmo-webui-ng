export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female'
}

export enum WorkLocation {
  ONSITE = 'Onsite',
  OFFSHORE = 'Offshore',
  NEAR_TO_SHORE = 'Near_to_shore',
}

export enum EmploymentType {
  FULL_TIME = 'Full_Time',
  CONTRACTOR = 'Contractor',
}

export enum EmploymentStatus {
  ACTIVE = 'Active',
  ON_HOLD = 'On_hold',
  TERMINATED = 'Terminated',
  RESIGNED = 'Resigned',
  BENCH = 'Bench',
}

export interface Employee {
  id?: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  contactNumber: string;
  dateOfBirth: string | Date;
  gender: Gender;
  profileImage?: string;
  profileImageFile?: File;
  workLocation: WorkLocation;
  employmentType: EmploymentType;
  employmentStatus: EmploymentStatus;
  startDate: string | Date;
  department?: string;
  location?: string;
  vendorId?: number;
  isFreelancer: boolean;
  status: boolean;
}
