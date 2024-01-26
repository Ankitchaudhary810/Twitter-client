import { graphqlClient } from "@/clients/api";
import { getCurrentUserQuery, DetectLoggedInUser } from "@/graphql/query/user";
import { useQuery } from "@tanstack/react-query";


// export const useCurrentUser = () => {
//   const query = useQuery({
//     queryKey: ["current-user"],
//     queryFn: async() => graphqlClient.request(getCurrentUserQuery)
//   })
//   return { ...query ,  user: query.data?.getCurrentUser };
// };


// export const useDetectedCurrentlyLogedInUser = (token: string) => {

//   console.log(token);
//   const query = useQuery({
//     queryKey:['logged-in-user'],
//     queryFn: async() => await graphqlClient.request(DetectLoggedInUser, {token:token})
//   })

//   console.log("query: " , query);
//   return {...query, user: query.data}
// }