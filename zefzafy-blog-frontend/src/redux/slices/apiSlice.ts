import { baseURL } from "@/utils/baseUrl";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"


const baseQuery = fetchBaseQuery({
  baseUrl : baseURL,
  credentials : "include"
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes : ["Product", "Order" , "User" , "Category" , "Reviews" , "Banners"],
  endpoints : (builder) => ({}),
}) 

