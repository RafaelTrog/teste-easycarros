import React from 'react'
import styled from 'styled-components'
import { FaTrash } from 'react-icons/fa'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const Card = styled.div`
    width: 100%;
    background-color: #fff;
    height: 80px;
    border-radius: 5px;
    border: 1px solid #007392;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 20px;
    margin-bottom: 10px;
    opacity: ${(props) => (props.delete ? "0" : "1")};
    transition: opacity 1s ease-out;

    & svg {
        & :hover {
            color: #d10000;
            cursor: pointer;
        }
    }
`

const Plate = styled.span`
    font-size: 20px;

`

const PlateCards = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleCloseDelete = () => {
      props.deleteCar(props.carId);
      setAnchorEl(null);
    };
    
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
        <Card>
            <Plate>{props.plate}</Plate>
            <FaTrash onClick={handleClick}></FaTrash>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleCloseDelete}>Excluir</MenuItem>
                <MenuItem onClick={handleClose}>Cancelar</MenuItem>
                
            </Menu>
        </Card>
    )
}

export default PlateCards