import gql from 'graphql-tag';

const CREATE_USER = gql`
  mutation createUser($user: UserInput!) {
    createUser(user: $user) {
      id
    }
  }
`;

export {
  CREATE_USER
};
