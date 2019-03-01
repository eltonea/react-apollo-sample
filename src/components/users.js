import React, { Fragment } from 'react';
import { graphql, compose } from "react-apollo";

import { GET_USERS } from '../graphql/queries/user'
import { CREATE_USER } from '../graphql/mutations/user'

const UserTile = ({ user }) => {
  return (
    <div>
      <p>{user.id}</p>
      <p>{user.name}</p>
      <p>{user.lastName}</p>
      <p>{user.age}</p>
      {user.job &&
        <div>
          <p>{user.job.name}</p>
          {user.job.company && <p>{user.job.company.name}</p>}
        </div>
      }
    </div>
  )
}

const saveUser = (form, { createUser }) => {
  form.preventDefault();
  const array = [...form.target.elements];
  const obj = array.reduce((prev, cur) => {
    if (cur.name === '') return prev;
    prev[cur.name] = cur.value;
    return prev;
  }, {})

  createUser({
    variables: { user: obj },
    refetchQueries: [{
      query: GET_USERS
    }]
  });
}

const UserForm = (mutate) => {
  return (
    <Fragment>
      <form onSubmit={form => saveUser(form, mutate)}>
        <input type="text" name="name" placeholder="name" />
        <input type="text" name="lastName" placeholder="lastName" />
        <input type="number" name="age" placeholder="age" />
        <input type="submit" text="Salvar" />
      </form>
    </Fragment>
  );
}

const Users = props => {
  return (
    <Fragment>
      <div>
        {props.data.loading && <h3>loading...</h3>}
        {props.data.error && <p>ERROR</p>}
      </div>
      <UserForm createUser={props.createUser} />
      {
        props.data.users &&
        props.data.users.map(user => (
          <UserTile
            key={user.id}
            user={user}
          />
        ))
      }
    </Fragment>
  );
};

export default compose(
  graphql(GET_USERS),
  graphql(CREATE_USER, { name: 'createUser' }),
)(Users)
