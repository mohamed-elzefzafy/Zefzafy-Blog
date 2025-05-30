import { ICategory, ICategoryResponse } from "@/types/category";
import { apiSlice } from "./apiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<ICategoryResponse, void>({
      query: () => ({
        url: `/api/v1/category`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Category"],
    }),

        updateCategory: builder.mutation({
      query: ({ payLoad, categoryId }) => ({
        url: `/api/v1/category/${categoryId}`,
            headers: {
          "Cache-Control": "no-store", // Prevent caching
        },
        method: "PATCH",
        body: payLoad,
      }),
    }),

        getOneCategory: builder.query<ICategory, string | void>({
          query: (id) => ({
            url: `/api/v1/category/${id}`,
          }),
          keepUnusedDataFor: 5,
          providesTags: ["Category"],
        }),

    createCategory: builder.mutation({
      query: (data) => ({
        url: `/api/v1/category`,
        method: "POST",
        body: data,
      }),
    }),

    getCategoriesAdmin: builder.query<ICategoryResponse, string | void>({
      query: (queries = "") => ({
        url: `/api/v1/category${queries}&_t=${Date.now()}`,
        headers: {
          "Cache-Control": "no-store",
        },
      }),
      keepUnusedDataFor: 1,
      providesTags: (result) =>
        result
          ? [
              ...result.categories.map(({ id }) => ({
                type: "Category" as const,
                id,
              })),
              { type: "Category", id: "LIST" },
            ]
          : [{ type: "Category", id: "LIST" }],
    }),

    deleteCategoryAdminPage: builder.mutation<
      void,
      { id: number; page?: number }
    >({
      query: ({ id }) => ({
        url: `/api/v1/category/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted({ id, page }, { dispatch, queryFulfilled }) {
        const queryParams = `?page=${page}`;
        const patchResult = dispatch(
          categoryApiSlice.util.updateQueryData(
            "getCategoriesAdmin",
            queryParams,
            (draft: ICategoryResponse) => {
              draft.categories = draft.categories.filter(
                (category) => category.id !== id
              );
              draft.pagination.total -= 1;
              if (draft.categories.length === 0 && page && page > 1) {
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
      invalidatesTags: (result, error, { id }) => [{ type: "Category", id }],
    }),
  }),


  
  
});

export const {
  useGetCategoriesQuery,
  useGetCategoriesAdminQuery,
  useDeleteCategoryAdminPageMutation,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useGetOneCategoryQuery
} = categoryApiSlice;
