import React, { useEffect, useState } from "react";
import axios from "axios";
import { STORAGE_KEY, logout } from "./Auth";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { FaTrashAlt } from "react-icons/fa";

const CarsContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  // background-color: #fff;
  border-radius: 22px;

  @media (max-width: 350px) {
    width: 90%;
  }
`;

const CarList = styled.ul`
  //   border: 1px solid red;
  width: 100%;
  background-color: #fff;
  border-radius: 22px;
  padding: 0;
  margin: 0;
`;

const CarItem = styled.li`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  list-style: none;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #b5b5b5;
  line-height: 50px;
  padding: 0 20px 0 20px;
  font-weight: bold;
  transition: all 2s ease-out;

  & svg {
    margin: auto 0;
    color: #c90000;
    font-size: 18px;
    cursor: pointer;
  }
`;

const LogoutButton = styled.button`
  width: 100%;
  height: 45px;
  border: none;
  border-radius: 40px;
  box-sizing: border-box;
  color: #fff;
  font-weight: bold;
  background-color: #0083d4;
  cursor: pointer;
  outline: none;
  margin-bottom: 20px;

  &:hover {
    background-color: #0068a8;
  }
`;

const AddButton = styled(LogoutButton)`
  width: 100px;
  border-radius: 0 40px 40px 0;
  margin: 0;
`;

const InputPlate = styled.input`
  width: 100%;
  height: 45px;
  outline: none;
  font-size: 20px;
  line-height: 45px;
  box-sizing: border-box;
  border: none;
  border-radius: 40px 0 0 40px;
  text-align: center;
  flex: 1;
`;

const InsertPlateError = styled.div`
  width: 100%;
  height: 20px;
  border-radius: 10px;
  background-color: red;
  color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  transition: all 0.2s ease-out;
`

const InsertPlateHit = styled(InsertPlateError)`
  background-color: green;
`

const Insertion = styled.div`
  width: 100%;
  margin-bottom: 5px;
  display: flex;
  flex-direction: row;
`

const List = () => {
  const [cars, setCars] = useState([]);
  const [placa, setPlaca] = useState("");
  const [erro, setErro] = useState(false);
  const [acerto, setAcerto] = useState(false);

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
    console.log(res.data.data);
  };

  useEffect(() => {
    getCars();
    console.log(localStorage.getItem(STORAGE_KEY));
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

    // if (placa.length === 7) {
    //   await axios(config);
    // } else {
    //   alert('PLACA INVÁLIDA')
    // }

    // await axios(config).catch(function (error) {
    //   if (error.response) {
    //     console.log(error.response.data.error.message)
    //     console.log(error.response.status)
    //     console.log(error.response.headers)
    //   } else if (error.request) {
    //     console.log(error.request)
    //   } else {
    //     console.log('Error', error.message)
    //   }
    // })

    try {
      let res = await axios(config);

      let data = res.data;

      console.log(data);
      setErro(false)
      setAcerto(true)
    } catch (error) {
      console.log(error.response.data.error.message);
      setErro(true)
      setAcerto(false)
    }

    getCars();
  };

  const RenderCars = () => {
    if (cars.length > 0) {
      return cars.map((carro) => {
        return (
          <CarItem key={carro.id}>
            {carro.plate} <FaTrashAlt onClick={() => handleDelete(carro.id)} />{" "}
          </CarItem>
        );
      });
    } else {
      return <CarItem>Nenhum veículo cadastrado!</CarItem>;
    }
  };

  const RenderMessage = () => {
    if (erro) {
      return (
        <InsertPlateError>ERRO!</InsertPlateError>
      )
    } else if (acerto) {
      return (
        <InsertPlateHit>ADICIONADO!</InsertPlateHit>
      )
    } else {
      return null
    }
  }

  return (
    <CarsContainer>
      <LogoutButton onClick={handleLogout}>SAIR</LogoutButton>
      <RenderMessage />
      <Insertion>
        <InputPlate type="text" placeholder="XXX0000"  onChange={(e) => { setPlaca(e.target.value)}} />
        <AddButton
          onClick={() => {
            handleAdd(placa);
          }}
        >
          ADICIONAR
        </AddButton>
      </Insertion>
      <CarList>
        <RenderCars />
      </CarList>
    </CarsContainer>
  );
};

export default List;
