import { graphql } from "../../gql";

export const verifyUserGoogleTokenQuery = graphql(`
    #graphal
    query VerifyUserGoogleToken($token: String!){
        verifyGoogleToken(token: $token)
    }
`);


export const getCurrentUserQuery = graphql(`
  query GetCurrentUser {
  getCurrentUser {
    id
    firstName
    email
    lastName
    profileImageUrl
  }
}
`)



export const getOnlyName = graphql(`

query Query {
  getOnlyName
}

`)


export const DetectLoggedInUser = graphql(`
query DetectLoggedInUser($token: String!) {
  DetectLoggedInUser(token: $token) {
    id
    email
    firstName
    lastName
    profileImageUrl
    tweets {
      id 
      content
      author {
        firstName
        lastName
        profileImageUrl
      }
    }
  }
}
`)