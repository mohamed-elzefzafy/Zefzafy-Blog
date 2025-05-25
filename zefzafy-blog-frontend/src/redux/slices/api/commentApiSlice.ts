import { ICommentsResponse } from "@/types/comments";
import { apiSlice } from "./apiSlice";

export const commentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query: ({ text, postId }) => ({
        url: `/api/v1/comment/${postId}`,
        method: "POST",
        body: text,
      }),
    }),

    updateComment: builder.mutation({
      query: ({ text, postId, commentId }) => ({
        url: `/api/v1/comment/${commentId}/${postId}`,
        method: "PATCH",
        body: text,
      }),
    }),

    deleteComment: builder.mutation({
      query: (commentId) => ({
        url: `/api/v1/comment/${commentId}`,
        method: "DELETE",
      }),
    }),

    deleteCommentByAdmin: builder.mutation({
      query: (commentId) => ({
        url: `/api/v1/comment/admin/${commentId}`,
        method: "DELETE",
      }),
    }),




        getCommentsAdmin: builder.query<ICommentsResponse, string | void>({
          query: (queries = "") => ({
            url: `/api/v1/comment${queries}&_t=${Date.now()}`,
            headers: {
              "Cache-Control": "no-store",
            },
          }),
          keepUnusedDataFor: 1,
          providesTags: (result) =>
            result
              ? [
                  ...result.comments.map(({ text }) => ({
                    type: "Comment" as const,
                    text,
                  })),
                  { type: "Comment", id: "LIST" },
                ]
              : [{ type: "Comment", id: "LIST" }],
        }),
    
        deleteCommentAdminAdminDashPage: builder.mutation<
          void,
          { id: number; page?: number }
        >({
          query: ({ id }) => ({
            url: `/api/v1/comment/${id}`,
            method: "DELETE",
          }),
          async onQueryStarted({ id, page }, { dispatch, queryFulfilled }) {
            const queryParams = `?page=${page}`;
            const patchResult = dispatch(
              commentApiSlice.util.updateQueryData(
                "getCommentsAdmin",
                queryParams,
                (draft: ICommentsResponse) => {
                  draft.comments = draft.comments.filter(
                    (comment) => comment.id !== id
                  );
                  draft.pagination.total -= 1;
                  if (draft.comments.length === 0 && page && page > 1) {
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
          invalidatesTags: (result, error, { id }) => [{ type: "Comment", id }],
        }),
    toggleLikeComment: builder.mutation({
      query: (commentId) => ({
        url: `/api/v1/comment/like-comment/${commentId}`,
        method: "PUT",
      }),
    }),

  }),
});

export const {
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useDeleteCommentByAdminMutation,
  useDeleteCommentAdminAdminDashPageMutation,
  useGetCommentsAdminQuery,
  useToggleLikeCommentMutation
} = commentApiSlice;
