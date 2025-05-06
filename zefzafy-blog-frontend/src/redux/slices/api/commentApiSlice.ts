import { apiSlice } from "./apiSlice";
import { IPost, IPostResponse } from "@/types/post";

export const commentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getPosts: builder.query<IPostResponse, string | void>({
    //   query: (queries) => ({
    //     url: `/api/v1/post${queries}`,
    //   }),
    //   keepUnusedDataFor: 5,
    //   providesTags: ["Post"],
    // }),

    // getOnePost: builder.query<IPost, string | void>({
    //   query: (id) => ({
    //     url: `/api/v1/post/${id}`,
    //   }),
    //   keepUnusedDataFor: 5,
    //   providesTags: ["Post"],
    // }),

    createComment: builder.mutation({
      query: ({text , postId}) => ({
        url: `/api/v1/comment/${postId}`,
        method: "POST",
        body: text,
      }),
    }),

    updateComment: builder.mutation({
      query: ({text , postId , commentId}) => ({
        url: `/api/v1/comment/${commentId}/${postId}`,
        method: "PATCH",
        body: text,
      }),
    }),

    // deletePost: builder.mutation({
    //   query: (id) => ({
    //     url: `/api/v1/post/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["Post"],
    // }),
  }),
});

export const {useCreateCommentMutation , useUpdateCommentMutation} = commentApiSlice;
