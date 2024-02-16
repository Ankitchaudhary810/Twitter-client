import { graphql } from "@/gql";

export const createTweetMutation = graphql(`
  #graphql
  mutation CreateTweet($payload: CreateTweetData!) {
    createTweet(payload: $payload) {
      id
    }
  }
`);

export const ToggleLikeMutation = graphql(`
  #graphql
  mutation LikeTweet($id: String!) {
    likeTweet(tweetId: $id) {
      id
      content
      likeIds
    }
  }
`);
