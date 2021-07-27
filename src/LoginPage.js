import styled from "styled-components"
import { Input } from "./components/Input";
import { Button } from "./components/Button";
import { H1, P } from "./components/Typography";
import { useContext, useState } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { GlobalStyle } from "./components/GlobalStyle";
import { ThemeContext } from "./contexts/ThemeContext";

const LoginContainer = styled.div`
  padding: 6em;

  button {
    justify-self: end;
  }
`;

const LoginForm = styled.form`
  margin: auto;
  max-width: 30em;
  height: 2em;
  display: grid;
  gap: 2em;
`;

export default function LoginPage() {
  const { theme } = useContext(ThemeContext);
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('sending data...');
    fetch('https://principal-serve.herokuapp.com/api/v1/employees/auth/login', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if(!res.ok) {
        setLoading(false);
        setError(true);
        throw new Error('Could not login');
      }
      return res.json();
    }).then(res => {
      console.log('response:', res);
      setLoading(false);
      setError(false);
      localStorage.setItem('token', res.data.token);
      authContext.authenticate();
    }).catch(err => {
      setLoading(false);
      setError(true);
      console.log(err);
    });
  }

  return (
    <>
      <GlobalStyle theme={theme} />
      <LoginContainer>
        <LoginForm onSubmit={handleSubmit}>
          <H1>Log in</H1>
          { error && <P color="error">Something went wrong. Please try again.</P> }
          <Input name="email" type="email" placeholder="E-mail" required />
          <Input name="password" type="password" placeholder="Password" required />
          <Button type="submit" disabled={loading}>{loading ? 'LOGGING IN...' : 'LOG IN'}</Button>
        </LoginForm>
      </LoginContainer>
    </>
  );
}