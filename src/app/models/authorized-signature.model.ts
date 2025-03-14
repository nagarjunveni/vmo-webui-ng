export interface AuthorizedSignature {
  id?: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  contactNumber: string;
  digitalSignature?: File;
  status?: boolean;
}
