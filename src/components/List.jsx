import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { STORAGE_KEY, logout } from './Auth'
import { history } from '../history'

const List = () => {

    const [cars, setCars] = useState([])

    const getCars = async () => {
        const config = {
            method: 'get',
            url: 'http://localhost:8181/vehicle',
            headers: {
                "content-type": "application/json",
                "Authorization": localStorage.getItem(STORAGE_KEY)
            }
        }

        const res = await axios(config)
        setCars(res.data.data)
        console.log(res.data.data)
    }

    useEffect(() => {
        getCars()
        console.log(localStorage.getItem(STORAGE_KEY))
    }, [])

    const handleLogout = () => {
        logout()
        history.push('/login')
    }
    
    return (
        <>
        <ul>
            {                
                    cars.map(carro => {
                        return <li key={carro.id}>{carro.plate}</li>
                    })
            }
        </ul>
        <button onClick={handleLogout}>SAIR</button>
        </>
    )
}

export default List