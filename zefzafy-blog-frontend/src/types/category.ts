import { IPost, Pagination } from "./post";

export interface ICategoryResponse {
  categories: ICategory[] ;
  pagination: Pagination;
}

export interface ICategory {
  id: number;
  title: string;
  posts : IPost[];
  createdAt: string;
  updatedAt: string;
}
export interface IAddCategory {
  title: string;
}