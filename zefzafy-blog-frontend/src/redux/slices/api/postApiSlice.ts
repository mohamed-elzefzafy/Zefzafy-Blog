import { apiSlice } from "./apiSlice";
import { IPost, IPostResponse } from "@/types/post";

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getPosts: builder.query<IPostResponse, string | void>({
      query: (queries = "") => ({
        url: `/api/v1/post${queries}&_t=${Date.now()}`,
        headers: {
          "Cache-Control": "no-store",
        },
      }),
      keepUnusedDataFor: 1,
      providesTags: (result) =>
        result
          ? [
              ...result.posts.map(({ id }) => ({ type: "Post" as const, id })),
              { type: "Post", id: "LIST" },
            ]
          : [{ type: "Post", id: "LIST" }],
    }),

    deletePostHomePage: builder.mutation<
      void,
      { id: number; page?: number; search?: string; category?: string }
    >({
      query: ({ id }) => ({
        url: `/api/v1/post/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(
        { id, page, search = "", category = "" },
        { dispatch, queryFulfilled }
      ) {
        const queryParams = `?search=${search}&page=${page}&category=${category}`;
        const patchResult = dispatch(
          postApiSlice.util.updateQueryData(
            "getPosts",
            queryParams,
            (draft: IPostResponse) => {
              draft.posts = draft.posts.filter((post) => post.id !== id);
              draft.pagination.total -= 1;
              if (draft.posts.length === 0 && page && page > 1) {
                draft.pagination.page = page - 1;
              }
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Post", id }],
    }),


        deletePostProfilePage: builder.mutation<
      void,
      { id: number; page?: number; userId :number }
    >({
      query: ({ id }) => ({
        url: `/api/v1/post/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(
        { id, page, userId },
        { dispatch, queryFulfilled }
      ) {
        const queryParams = `?page=${page}&user=${userId}`;
        const patchResult = dispatch(
          postApiSlice.util.updateQueryData(
            "getPosts",
            queryParams,
            (draft: IPostResponse) => {
              draft.posts = draft.posts.filter((post) => post.id !== id);
              draft.pagination.total -= 1;
              if (draft.posts.length === 0 && page && page > 1) {
                draft.pagination.page = page - 1;
              }
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Post", id }],
    }),

    getPostsAdmin: builder.query<IPostResponse, string | void>({
      query: (queries) => ({
        url: `/api/v1/post/admin${queries}`,
        headers: {
          "Cache-Control": "no-store", // Prevent caching
        },
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Post"],
    }),

    getOnePost: builder.query<IPost, string | void>({
      query: (id) => ({
        url: `/api/v1/post/${id}`,
            headers: {
          "Cache-Control": "no-store", // Prevent caching
        },
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

    updatePost: builder.mutation({
      query: ({ payLoad, postId }) => ({
        url: `/api/v1/post/${postId}`,
        method: "PATCH",
        body: payLoad,
      }),
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `/api/v1/post/${id}`,
        headers: {
          "Cache-Control": "no-store", // Prevent caching
        },
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),

    deletePostAdminPage: builder.mutation<void, { id: number; page?: number }>({
      query: ({ id }) => ({
        url: `/api/v1/post/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted({ id, page }, { dispatch, queryFulfilled }) {
        const queryParams = `?page=${page}`;
        const patchResult = dispatch(
          postApiSlice.util.updateQueryData(
            "getPosts",
            queryParams,
            (draft: IPostResponse) => {
              draft.posts = draft.posts.filter((post) => post.id !== id);
              draft.pagination.total -= 1;
              if (draft.posts.length === 0 && page && page > 1) {
                draft.pagination.page = page - 1;
              }
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Post", id }],
    }),

    toggleLikePost: builder.mutation({
      query: (postId) => ({
        url: `/api/v1/post/like-post/${postId}`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useGetOnePostQuery,
  useToggleLikePostMutation,
  useUpdatePostMutation,
  useGetPostsAdminQuery,
  useDeletePostAdminPageMutation,
  useDeletePostHomePageMutation,
  useDeletePostProfilePageMutation,
} = postApiSlice;
