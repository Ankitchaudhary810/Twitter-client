import { graphql } from "@/gql";

export const createTweetMutation = graphql(`#graphal
    mutation CreateTweet($payload: CreateTweetData!) {
        createTweet(payload: $payload) {
            id
        }
    }
`)
