import { graphql } from "../../gql";

export const verifyUserGoogleTokenQuery = graphql(`
  #graphql
  query VerifyUserGoogleToken($token: String!) {
    verifyGoogleToken(token: $token)
  }
`);

export const getCurrentUserQuery = graphql(`
  query GetCurrentUser {
    getCurrentUser {
      id
      profileImageUrl
      email
      firstName
      lastName
      followers {
        id
        firstName
        lastName
        profileImageUrl
      }
      following {
        id
        firstName
        lastName
        profileImageUrl
      }
      tweets {
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
  }
`);

export const getUserByIdQuery = graphql(`
  #graphql
  query GetuserById($id: ID!) {
    getUserById(id: $id) {
      id
      firstName
      lastName
      profileImageUrl
      followers {
        id
        firstName
        lastName
        profileImageUrl
      }
      following {
        id
        firstName
        lastName
        profileImageUrl
      }
      tweets {
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
  }
`);
