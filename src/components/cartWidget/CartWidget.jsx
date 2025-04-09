import React, { useContext } from "react";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { ShopContext } from "../../context/ShopContext";
import { useNavigate } from "react-router-dom";

export const CartWidget = () => {
  const { getTotalItems  } = useContext(ShopContext)
  const navigate = useNavigate()
  return (
    <>
      <Badge badgeContent={getTotalItems ()} onClick={()=> navigate('/cart')} style={{cursor: "pointer"}} color="primary">
        <ShoppingCartIcon  fontSize="large"></ShoppingCartIcon>
      </Badge>
    </> 
  );
};
