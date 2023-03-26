import {IssueTypeColumn} from "./issue-type-column";
import {IssueTypeEnum} from "../enums";

export interface IssueType {
  id: number;
  name: string;
  description: string;
  icon: string;
  isActive: boolean;
  type: IssueTypeEnum;
  issueTypeColumns: IssueTypeColumn[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
