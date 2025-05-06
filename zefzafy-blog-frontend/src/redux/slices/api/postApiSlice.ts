import { apiSlice } from "./apiSlice";
import { IPost, IPostResponse } from "@/types/post";

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<IPostResponse, string | void>({
      query: (queries) => ({
        url: `/api/v1/post${queries}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Post"],
    }),

    getOnePost: builder.query<IPost, string | void>({
      query: (id) => ({
        url: `/api/v1/post/${id}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Post"],
    }),

    createPost: builder.mutation({
      query: (data) => ({
        url: `/api/v1/post`,
        method: "POST",
        body: data,
      }),
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `/api/v1/post/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useGetOnePostQuery,
} = postApiSlice;
