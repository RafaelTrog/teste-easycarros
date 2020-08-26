import React, { useState } from "react";
import styled from "styled-components";
import ProfileImg from "../assets/profile.png";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { login } from "./Auth";
import { useHistory } from "react-router-dom";

const MaterialInput = withStyles({
  root: {
    marginBottom: "20px",
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: "5px",
    "& label.Mui-focused": {
      color: "#007392",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#007392",
      },
      "&:hover fieldset": {
        borderColor: "#007392",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#00576d",
      },
    },
  },
})(TextField);

const MaterialButton = withStyles({
  root: {
    width: "100%",
    backgroundColor: "#007392",
    "&:hover": {
      backgroundColor: "#00576d",
    },
  },
})(Button);

const LoginBox = styled.div`
  width: 500px;
  height: 500px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.7);

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const LoginForm = styled.form`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const ImgProfile = styled.img`
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  width: 150px;
  margin-bottom: 20px;
`;

const LoginErro = styled.p`
  position: absolute;
  bottom: 15px;
`;

const Login = () => {
  const [user, setUser] = useState();
  const [password, setPassword] = useState();
  const [notUser, setNotUser] = useState(false);
  const [notPass, setNotPass] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const history = useHistory();

  const getLogin = async () => {
    const config = {
      method: "post",
      url: "http://localhost:8181/auth",
      headers: {
        "content-type": "application/json",
      },
      data: {
        email: user,
        password: password,
      },
    };

    try {
      const res = await axios(config);
      login(res.data.data.token);
      history.push("/consulta");
    } catch (error) {
      setInvalidCredentials(true);
    }
  };

  const handleUser = (event) => {
    setUser(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (user && password) {
      getLogin();
    }

    if (!user && !password) {
      setNotUser(true);
      setNotPass(true);
    } else if (!user) {
      setNotUser(true);
      setNotPass(false);
    } else if (!password) {
      setNotPass(true);
      setNotUser(false);
    } else {
      setNotPass(false);
      setNotUser(false);
      getLogin();
    }
  };

  const handleErrorLogin = () => {
    if (notUser && notPass) {
      return <LoginErro>Usuário e senha em branco!</LoginErro>;
    } else if (notPass) {
      return <LoginErro>Senha em branco!</LoginErro>;
    } else if (notUser) {
      return <LoginErro>Usuário em branco!</LoginErro>;
    } else if (invalidCredentials) {
      return <LoginErro>Credenciais inválidas!</LoginErro>;
    } else {
      return null;
    }
  };

  return (
    <LoginBox>
      <LoginForm onSubmit={handleSubmit}>
        <ImgProfile src={ProfileImg} alt="profile" />
        <MaterialInput
          label="E-mail"
          variant="outlined"
          size="small"
          onChange={handleUser}
        />
        <MaterialInput
          label="Senha"
          variant="outlined"
          size="small"
          type="password"
          onChange={handlePassword}
        />
        <MaterialButton
          variant="contained"
          color="primary"
          size="large"
          disableElevation
          type="submit"
        >
          Entrar
        </MaterialButton>
        {handleErrorLogin()}
      </LoginForm>
    </LoginBox>
  );
};

export default Login;
