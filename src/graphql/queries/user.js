import gql from 'graphql-tag';

const GET_USERS = gql`
  {
    users {
      id
      name
      lastName
      age
    }
  }
`;

export {
  GET_USERS
}