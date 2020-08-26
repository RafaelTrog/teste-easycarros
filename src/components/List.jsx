import React, { useEffect, useState } from "react";
import axios from "axios";
import { STORAGE_KEY, logout } from "./Auth";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Container from "./ui-components/Container";
import PlateCards from "./ui-components/PlateCards";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { FaSignOutAlt, FaPlus } from "react-icons/fa";
import TextField from "@material-ui/core/TextField";

const Title = styled.div`
  font-size: 25px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
  color: #383838;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const PlateInput = withStyles({
  root: {
    flex: "1",
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

const LogoutButton = withStyles({
  root: {
    color: "#fff",
    backgroundColor: "#007392",
    "&:hover": {
      backgroundColor: "#00576d",
    },
  },
})(Button);

const AddButton = withStyles({
  root: {
    marginLeft: "20px",
    color: "#fff",
    backgroundColor: "#007392",
    "&:hover": {
      backgroundColor: "#00576d",
    },
  },
})(Button);

const PlatesContainer = styled.div`
  width: 400px;
  max-height: 280px;
  text-align: center;

  overflow: auto;

  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #f4f4f4;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: #c2c2c2;
  }

`

const List = () => {
  const [cars, setCars] = useState([]);
  const [placa, setPlaca] = useState("");
  const [erro, setErro] = useState(false);
  const [msg, setMsg] = useState("");

  const history = useHistory();

  const getCars = async () => {
    const config = {
      method: "get",
      url: "http://localhost:8181/vehicle",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem(STORAGE_KEY),
      },
    };

    const res = await axios(config);
    setCars(res.data.data);
  };

  useEffect(() => {
    getCars();
  }, []);

  const handleLogout = () => {
    logout();
    history.push("/");
  };

  const handleDelete = async (id) => {
    const config = {
      method: "delete",
      url: "http://localhost:8181/vehicle/" + id,
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem(STORAGE_KEY),
      },
    };

    await axios(config);
    getCars();
  };

  const handleAdd = async (placa) => {
    if (placa.length === 7) {
      const config = {
        method: "post",
        url: "http://localhost:8181/vehicle",
        headers: {
          "content-type": "application/json",
          Authorization: localStorage.getItem(STORAGE_KEY),
        },
        data: {
          plate: placa,
        },
      };

      try {
        let res = await axios(config);
        let data = res.data;
        setErro(false);
      } catch (error) {
        setErro(true);
        setMsg("Erro ao adicionar veículo!");
      }
      getCars();
    } else {
      setErro(true);
      setMsg("A placa deve estar no formato XXX0000!");
    }
  };

  const RenderCars = () => {
    if (cars.length > 0) {
      return cars.map((carro) => {
        return (
          <PlateCards
            key={carro.id}
            plate={carro.plate}
            deleteCar={handleDelete}
            carId={carro.id}
          />
        );
      });
    } else {
      return <p>Nenhum veículo cadastrado!</p>;
    }
  };

  const RenderMessage = () => {
    if (erro) {
      return <p>{msg}</p>;
    } else {
      return null;
    }
  };

  return (
    <Container>
      <Title>
        Placas
        <LogoutButton
          variant="contained"
          startIcon={<FaSignOutAlt />}
          onClick={handleLogout}
        >
          Sair
        </LogoutButton>
      </Title>
      <InputContainer>
        <PlateInput
          id="outlined-basic"
          label="Placa (XXX0000)"
          variant="outlined"
          size="small"
          onChange={(e) => {
            setPlaca(e.target.value);
          }}
        />
        <AddButton
          variant="contained"
          startIcon={<FaPlus />}
          onClick={() => {
            handleAdd(placa);
          }}
        >
          Adicionar
        </AddButton>
      </InputContainer>
      <PlatesContainer>
        {RenderCars()}
      </PlatesContainer>
      {RenderMessage()}
    </Container>
  );
};

export default List;
