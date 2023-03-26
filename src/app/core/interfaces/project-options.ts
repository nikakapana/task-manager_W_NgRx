export interface ProjectOptions {
  page: number;
  limit: number;
  order?: 'ASC' | 'DESC';
  orderBy?: string;
  search?: string
}
