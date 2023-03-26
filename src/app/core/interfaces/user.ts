import { Role } from "./role";
import {Project} from "./project";

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    userPermissions: any[];
    roles: Role[];
    projects: any[];
}

export interface UsersResponse {
  id: number;
  createdAt: Date;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  isActive: boolean;
  userPermissions: string[];
  roles: Role[];
  projects: Project[];
}
