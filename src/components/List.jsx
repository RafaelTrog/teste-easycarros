import React, { useEffect, useState } from "react";
import axios from "axios";
import { STORAGE_KEY, logout } from "./Auth";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { FaTrashAlt } from 'react-icons/fa'

const CarsContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  background-color: #fff;
  border-radius: 22px;
`;

const CarList = styled.ul`
//   border: 1px solid red;
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
  margin-top: 20px;
  color: #fff;
  font-weight: bold;
  background-color: #0083d4;
  cursor: pointer;
  outline: none;

  &:hover {
      background-color: #0068a8;
  }
`;

const List = () => {
  const [cars, setCars] = useState([]);

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

  return (
    <CarsContainer>
      <CarList>
        {cars.map((carro) => {
          return <CarItem key={carro.id}>{carro.plate} <FaTrashAlt /> </CarItem>;
        })}
      </CarList>
      <LogoutButton onClick={handleLogout}>SAIR</LogoutButton>
    </CarsContainer>
  );
};

export default List;
