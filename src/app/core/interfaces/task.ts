import { Epic } from "./epic";
import { IssueType } from "./issue-type";
import { Project } from "./project";
import { User } from "./user";

export interface Tasks {
    id: number;
    name: string;
    description: string;
    issueTypeId: number;
    issueType: IssueType;
    epicId: number;
    epic: Epic;
    projectId: number;
    project: Project;
    boardId: number;
    board: string;
    boardColumnId: number;
    boardColumn: string;
    isBacklog: boolean;
    priority: string;
    taskStatus: string;
    assigneeId: number;
    assignee: User;
    reporterId: number;
    reporter: User;
    createdById: number;
    createdBy: User;
    deletedById: number;
    deletedBy: User;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    taskProperty: TaskProperty[]
}

export interface TaskProperty {
  di: number;
  name: string;
  fieldName: string;
  value: string;
  isRequired: boolean
}
