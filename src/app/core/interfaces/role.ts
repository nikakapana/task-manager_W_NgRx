import {Project} from "./project";

export interface Role {
  id: string;
  createdAt: Date;
  name: string;
  type: string;
  permissions: string[];
}
export interface RoleListResponse {
  data: Role[];
  totalCount: number;
  page: number;
  limit: number;
}
