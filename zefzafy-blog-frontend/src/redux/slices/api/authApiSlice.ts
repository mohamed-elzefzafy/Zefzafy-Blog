import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `/api/v1/auth/login`,
        method: "POST",
        body: data,
      }),
    }),

    registerUser: builder.mutation({
      query: (data) => ({
        url: `/api/v1/auth/register`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `/api/v1/auth/logout`,
        method: "POST",
      }),
    }),
    verifyAccount: builder.mutation({
      query: () => ({
        url: `/api/v1/auth/send-verification-code`,
        method: "POST",
      }),
    }),

    enterVerifyCode: builder.mutation({
      query: (data) => ({
        url: `/api/v1/auth/verify-account`,
        method: "POST",
        body : data
      }),
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: `/api/v1/auth/reset-password`,
        method: "POST",
        body : data
      }),
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: `/api/v1/auth/validateVerificationCode`,
        method: "POST",
        body : data
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginMutation,
  useLogoutMutation,
  useVerifyAccountMutation,
  useEnterVerifyCodeMutation,
  useResetPasswordMutation,
  useUpdatePasswordMutation
} = usersApiSlice;
