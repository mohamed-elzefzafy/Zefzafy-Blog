import { IUserInfo } from "./auth";
import { Pagination } from "./post";


export interface IUserResponse {
  users: IUserInfo[] ;
  pagination: Pagination;
}