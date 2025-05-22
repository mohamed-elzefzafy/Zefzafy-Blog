import { UserInfo } from "os";
import { CloudinaryObject, IUserInfo } from "./auth";
import { ICategory } from "./category";
import { IComments, ICommentsResponse } from "./comments";

export interface IPostData {
  title: string;
  content: string;
  category: ICategory;
  image?: CloudinaryObject;
}

export interface IPostData2 {
  title: string;
  content: string;
  category: number;
  image?: CloudinaryObject;
}

export interface IPost {
  id: number;
  title: string;
  content: string;
  category: ICategory;
  image: CloudinaryObject;
  createdAt: string;
  updatedAt: string;
  user :IUserInfo;
  comments : IComments[];
  likes : IUserInfo[];
}

export interface IPostResponse {
  posts: IPost[] ;
  pagination: Pagination;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  pagesCount: number;
}
