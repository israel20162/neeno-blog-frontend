import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setToken } from '../slices/userSlice'
import type { RootState } from '../main'
//import { RootState } from '../index';


export interface LoginResponse {
    access_token: string,
    token_type: string
}
export interface LoginParameters {
    username: string,
    password: string
}

export const userApi: any = createApi({
    //reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://easyblurb.onrender.com/api/',
    prepareHeaders: (headers, { getState  }) => {
    const token = typeof window !== 'undefined' ? JSON.parse(`${localStorage.getItem("accessToken")}` || '') :  (getState() as RootState).userSlice.token

    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }

    return headers
  },}), 
    endpoints: (builder) => ({
        getUser: builder.query<LoginResponse, String>({
            query:(body)=> {
                return {
                    url: `token`,
                    method: 'GET',
                    headers: {
                        'accept': 'application/json',
                    },
                    body: body
                }
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setToken(data.access_token));
                } catch (error) { }
            },
        }),
    }),
})


export const { useGetUserQuery } = userApi