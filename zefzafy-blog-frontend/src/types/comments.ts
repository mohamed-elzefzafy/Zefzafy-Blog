import { IUserInfo } from "./auth";
import { IPost, Pagination } from "./post";

export interface ICommentDto {
  text: string;
}

export interface IComments {
  id: number;
  text: string;
  post: IPost;
  likes: IUserInfo[];
  user: IUserInfo;
  createdAt: string;
  updatedAt: string;
}

export interface ICommentsResponse {
  comments: IComments[];
  pagination: Pagination;
}
