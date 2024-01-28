import { graphqlClient } from "@/clients/api"
import { CreateTweetData } from "@/gql/graphql"
import { createTweetMutation } from "@/graphql/mutations/tweet"
import { getAllTweetsQuery } from "@/graphql/query/tweet"
import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import axios from "axios"
import { print } from "graphql"

export const useGetAllTweets = () => {
    const query  =  useQuery({
        queryKey:['all-tweets'],
        queryFn: () => graphqlClient.request(getAllTweetsQuery),
    })

    return {...query, tweets: query.data?.getAllTweets}
}

const BASE_URL = 'http://localhost:8000/graphql';

export const useCreateTweet = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
      mutationFn: async (payload: CreateTweetData) => {
        const response = await axios.post(
          BASE_URL,
          { query: print(createTweetMutation), variables: { payload } },
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem('__twitter_token')}`,
            },
          }
        );
        return response.data;
      },
      onMutate: (payload) => toast.loading('Creating Tweet', {id: "1"}),
      onSuccess: async(payload) => {
        await queryClient.invalidateQueries({ queryKey: ['all-tweets'] });
        toast.success("Created Tweet", {id:"1"})
      },
    });
  
    return mutation;
  };

