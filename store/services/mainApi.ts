import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { LoginResponse, LoginParameters } from './userApi';








export const mainApi: any = createApi({
    reducerPath: 'mainApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
    tagTypes: ['TAGS', 'POSTS','COMMENTS'],
    endpoints: (builder) => ({
        getAllTags: builder.query<Tags, void>({
            query: () => `/api/tags`,
            providesTags: ['TAGS']
        }),
        getAllPosts: builder.query({
            query: () => `/api/posts`,
            providesTags: ['POSTS']

        }),
        getSinglePost: builder.query({
            query: (body) => {
                return {
                    url: `/api/posts/${body}`,
                    method: 'GET',
                   
                }
},
            providesTags: ['POSTS']

        }),
        getComments: builder.query({
            query: (body) => `/api/comment/${body}`,
           providesTags: ['COMMENTS']

        }),
        rateComment: builder.mutation({
            query(body) {
                return {
                    url: `/api/comment/${body.commentId}/${body.action}`,
                    method: 'PUT',

                }
            },
            invalidatesTags: ['COMMENTS']
           
        }),
        createTag: builder.mutation({
            query(body) {
                return {
                    url: `/api/tags`,
                    method: 'POST',
                    body
                }
            },
            invalidatesTags: ['TAGS']
        }),
        loginUser: builder.mutation<LoginResponse, LoginParameters>({
            query(body) {
                return {
                    url: `/api/auth/login`,
                    method: 'POST',
                    // headers: {
                    //     'accept': 'application/json',
                    //     'content-type': 'application/x-www-form-urlencoded',
                    // },
                    body: body
                }
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    // dispatch(setToken(data.accessToken));
                    // dispatch(setUser(data.user));
                } catch (error) {
                    console.log(error.message)
                }
            },
        }),
        registerUser: builder.mutation({
            query(body) {
                return {
                    url: `/api/auth/register`,
                    method: 'POST',
                    body
                }
            }
        }),

        createPost: builder.mutation({
            query(body) {
                return {
                    url: `/api/posts/create-post`,
                    method: 'POST',
                    headers: {
                        'accept': 'application/json',
                        //'content-type': ' multipart/form-data',
                        'authorization': `Bearer=${body.token}`
                    },
                    body: body.data
                }
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    // dispatch(setToken(data.accessToken));
                    // dispatch(setUser(data.user));
                    console.log(data.message)
                } catch (error) {
                    console.log(error.message)
                }
            },
        }),
        createComment:
            builder.mutation({
                query(body) {
                    return {
                        url: `/api/comment`,
                        method: 'POST',
                        body
                    }

                },
                invalidatesTags: ['COMMENTS']
            }),
             replyComment:
            builder.mutation({
                query(body) {
                    return {
                        url: `/api/comment/${body.commentId}/reply`,
                        method: 'POST',
                        body
                    }

                },
                invalidatesTags: ['COMMENTS']
            }),
        deleteComment:
            builder.mutation({
                query(body) {
                    return {
                        url: `/api/comment/${body.commentId}/delete`,
                        method: 'POST',
                        body
                    }

                },
                invalidatesTags: ['COMMENTS']
            })
    }),
})

export const { useGetAllTagsQuery, useRateCommentMutation, useReplyCommentMutation, useDeleteCommentMutation, useGetCommentsQuery, useCreateCommentMutation, useGetAllPostsQuery, useCreateTagMutation, useRegisterUserMutation, useRegisterClientMutation, useLoginUserMutation, useCreatePostMutation, useGetSinglePostQuery } = mainApi