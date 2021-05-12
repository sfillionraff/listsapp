import React from "react";
import styled from "styled-components";

import AccountLogin from "./AccountLogin";

const Homepage = () => {
  return (
    <Container>
      <h1>Welcome to the Lists App</h1>
      <p>Sign in or create an account to start</p>
      <AccountLogin />
    </Container>
  );
};

const Container = styled.div`
  background-color: #7575a3;
  width: 100vw;
  height: 100vh;

  & h1,
  p {
    color: white;
  }
`;

export default Homepage;
