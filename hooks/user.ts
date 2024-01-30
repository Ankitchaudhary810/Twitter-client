import { graphqlClient } from "@/clients/api";
import { getCurrentUserQuery, DetectLoggedInUser } from "@/graphql/query/user";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { print } from "graphql";



const BASE_URL = 'http://localhost:8000/graphql';


export const useCurrentUser = () => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['curent-user"'],
    queryFn: async () => {
      const response = await axios.post(
        BASE_URL,
        {
          query: print(getCurrentUserQuery),
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${window.localStorage.getItem('__twitter_token')}`,
          },
        }
      );
      return response.data;
    },
  });


  return { ...query, user: query?.data?.data.getCurrentUser };
};
