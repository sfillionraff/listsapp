import React, { useState } from "react";
import styled from "styled-components";

import Input from "./Input";

const AccountLogin = () => {
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState(null);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    if (
      name === "confirmPassword" &&
      formData.confirmPassword !== formData.password
    ) {
      setFormError("Passwords don't match");
    }
  };

  const validateEmail = (email) => {
    const emailPattern = new RegExp(/\S+@\S+\.\S+/);
    if (!emailPattern.test(email.toLowerCase())) {
      setFormError("Email is not valid");
      return false;
    } else {
      return true;
    }
  };

  // NEXT: keep working on onSubmit:
  // https://blog.bitsrc.io/understanding-json-web-token-authentication-a1febf0e15
  // https://dleroari.medium.com/learn-the-basics-of-json-web-tokens-jwt-and-how-it-works-in-practice-8b3b14cbe0f9
  // store JWT token in local storage?

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateEmail(formData.email)) {
      fetch("/auth", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then((result) => console.log(result));
      // need to resend JWT that the server responded with?
    }
  };

  return (
    <FormContainer>
      <form>
        <Input
          type="text"
          name="email"
          placeholder="Email:"
          value={formData.email}
          handleChange={handleChange}
        />
        <Input
          type="text"
          name="username"
          placeholder="Username:"
          value={formData.username}
          handleChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password:"
          value={formData.password}
          handleChange={handleChange}
        />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password:"
          value={formData.confirmPassword}
          handleChange={handleChange}
        />
        <button
          type="submit"
          value="Create Account"
          onClick={() => handleSubmit()}
        >
          Create Account{" "}
        </button>
      </form>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  width: 500px;
  border-radius: 12px;
  background-color: white;
`;

export default AccountLogin;
