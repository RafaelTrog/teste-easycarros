import React, { useState } from 'react'
import styled from 'styled-components'
import { FaUserAlt, FaLock } from 'react-icons/fa'
import axios from 'axios'

const LoginBox = styled.form`
    // border: 1px solid red;
    width: 350px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;

    & img {
        width: 120px;
        border-radius: 50%;
    }

    @media(max-width: 350px) {
        width: 90%;
    }
`

const StyledName = styled.span`
    font-weight: bold;
    font-size: 16pt;
    margin: 10px 0 30px 0;
    color: #fff;
`

const StyledInput = styled.div`
    width: 100%;
    height: 45px;
    box-sizing: border-box;
    position: relative;
    color: #808080;
    margin-top: 10px;
    

    & svg {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 13px;
        font-size: 10pt;

    }

    & input {
        width: 100%;
        height: 100%;
        border: none;
        border-radius: 40px;
        background-color: #fff;
        box-sizing: border-box;
        padding-left: 40px;
        font-weight: bold;
        outline: none;
    }
`

const StyledButton = styled.button`
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

    // @media(max-width: 350px) {
    //     width: 90%;
    // }
`

export default Login => {

    const [user, setUser] = useState()
    const [password, setPassword] = useState()

    const getLogin = async () => {

        if (user && password) {
            const config = {
                method: 'post',
                url: 'http://localhost:8181/auth',
                headers: {
                    "content-type": "application/json"
                },
                data: {
                    "email": user,
                    "password": password
                }
            }
    
            const res = await axios(config)
    
            console.log(res.data.data.token)
        }else {
            console.log('algum campo em branco')
        }
    }

    const handleUser = (event) => {
        setUser(event.target.value)
    }
    
    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('logou')
        console.log('EMAIL: ' + user)
        console.log('SENHA: ' + password)
        getLogin()
    }

    return (
        <LoginBox onSubmit={handleSubmit}>
            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="Profile" />

            <StyledName>
                John Doe
            </StyledName>

            <StyledInput>
                <FaUserAlt />
                <input type="text" placeholder="Email" onChange={handleUser} />
            </StyledInput>

            <StyledInput>
                <FaLock />
                <input type="password" placeholder="Password" onChange={handlePassword} />
            </StyledInput>

            <StyledButton type="submit">
                Login
            </StyledButton>
        </LoginBox>
    )
}