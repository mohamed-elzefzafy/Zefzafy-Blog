import { IUserInfo } from "./auth";
import { IPost } from "./post";

export interface IComment {
  text: string;
}

export interface ICommentResponse {
  id: number;
  text: string;
  post: IPost;
  user: IUserInfo;
  createdAt: string;
  updatedAt: string;
}
