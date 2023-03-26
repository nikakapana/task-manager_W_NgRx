export interface Project {
  id: number;
  name: string;
  abbreviation: string;
  description: string;
  color: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: any;
}
