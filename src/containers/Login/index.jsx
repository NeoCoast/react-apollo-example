import React, { useState } from 'react';
import { withRouter } from "react-router";
import { useMutation } from '@apollo/react-hooks';
import Button from 'Components/Button';
import Form from 'Components/Form';
import Input from 'Components/Input';
import Layout from 'Components/Layout';
import LOGIN_USER from 'GraphQL/queries/login.mutation.gql';
import FETCH_HOME from 'GraphQL/queries/home.query.gql';

import "./index.scss";

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { loading, error }] = useMutation(
    LOGIN_USER,
    {
      variables: {
        credentials: {
          email,
          password,
        },
      },
      update(cache, { data: { signIn } }) {
        const { authenticationToken } = signIn.user;

        localStorage.setItem('token', authenticationToken);
        cache.writeData({ data: { isLoggedIn: true } });

        history.replace('/');
      },
    },
  );

  if (error) {
    return <div>Error</div>;
  }

  return (
    <Layout centered withTopbar={false}>
      <Form onSubmit={login}>
        <Input
          id="email"
          label="Email"
          type="text"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />

        <Input
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />

        <Button className="login__button" loading={loading} type="submit">
          Sign in
        </Button>
      </Form>
    </Layout>
  );
}

export default withRouter(Login);
