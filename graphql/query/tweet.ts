import { graphql } from "@/gql";


export const getAllTweetsQuery = graphql(`
    #graphal
    query GetAllTweets {
        getAllTweets {
            id
            content
            imageURL
            author {
            id
            firstName
            lastName
            profileImageUrl
            }
        }
    }
`)