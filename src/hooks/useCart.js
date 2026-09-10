import {useContext } from "react";
import { cartContext } from "../context/cartContext.js";

export const useCart = () => {
const context = useContext(cartContext);
if(!context) throw new Error ("useCart must be used inside cartprovider");
return context
};
