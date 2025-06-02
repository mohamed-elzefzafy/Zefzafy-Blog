import { IUserResponse } from "@/types/user";
import { apiSlice } from "./apiSlice";
import { IPost, IPostResponse } from "@/types/post";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<IUserResponse, string | void>({
      query: (queries = "") => ({
        url: `/api/v1/users${queries}&_t=${Date.now()}`,
        headers: {
          "Cache-Control": "no-store",
        },
      }),
      keepUnusedDataFor: 1,
      providesTags: (result) =>
        result
          ? [
              ...result.users.map(({ id }) => ({ type: "User" as const, id })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),

    deleteUserAdminPage: builder.mutation<void, { id: number; page?: number }>({
      query: ({ id }) => ({
        url: `/api/v1/users/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted({ id, page }, { dispatch, queryFulfilled }) {
        const queryParams = `?page=${page}`;
        const patchResult = dispatch(
          userApiSlice.util.updateQueryData(
            "getUsers",
            queryParams,
            (draft: IUserResponse) => {
              draft.users = draft.users.filter((user) => user.id !== id);
              draft.pagination.total -= 1;
              if (draft.users.length === 0 && page && page > 1) {
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

        deleteCurrentUser: builder.mutation({
      query: () => ({
        url: `/api/v1/auth/delete-current-user`,
        headers: {
          "Cache-Control": "no-store", // Prevent caching
        },
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

  }),
});

export const { useGetUsersQuery, useDeleteUserAdminPageMutation , useDeleteCurrentUserMutation} =
  userApiSlice;
