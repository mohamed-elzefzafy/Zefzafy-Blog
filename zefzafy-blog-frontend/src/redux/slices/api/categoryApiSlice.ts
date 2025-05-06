import { ICategory } from "@/types/category";
import { apiSlice } from "./apiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints : (builder) => ({
   getCategories : builder.query<ICategory[] , void>({
    query: () => ({
       url : `/api/v1/category`
    }),
    keepUnusedDataFor: 5,
    providesTags: ["Category"],

   }),


  })
})


export const {useGetCategoriesQuery } = categoryApiSlice;