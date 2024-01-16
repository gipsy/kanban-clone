import { Schema } from "mongoose";

// export interface SearchParams {
//   query?: string | null;
//   type?: string | null;
// }

export interface GetIssuesParams {
  boardId: string;
  boardName?: string;
  searchParams?: Record<string, string> | null | undefined;
}

export interface GetIssueByIdParams {
  _id: string;
}

export interface CreateIssueParams {
  title: string;
  description: string;
  status: string;
  rank: string;
  boardId: Schema.Types.ObjectId;
  path?: string;
}

export interface UpdateIssueParams {
  _id: string;
  title: string;
  description: string;
  rank: string;
  status: string;
  boardId: Schema.Types.ObjectId;
  path: string;
}

export interface DeleteIssueParams {
  _id: string;
  boardId: string;
}

export interface CreateBoardParams {
  title: string;
  issues: string[];
  path: string;
}

export interface DeleteBoardParams {
  _id: string;
  path: string;
}

export interface GetBoardByIdParams {
  id: string;
}