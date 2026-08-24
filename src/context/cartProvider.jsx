import { useState } from "react";
import { cartContext } from "./cartContext";
export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item, qty) => {
        setCartItems((prev) => {
             const  exist = prev.some((items) => {
            return items.id === item.id
        }) 
        if(exist){
            return prev.map((i) => {
                return i.id === item.id ? {...i, qty: i.qty + qty} : i
            })
        } 
        
       return [...prev, {...item, qty}]
        })
    }

    const increaseQty = (id) => {
        return setCartItems((prev) => 
        prev.map((item) => 
        item.id === id
        ? {...item, qty: item.qty + 1} : item
    )
        )
    }

    const decreaseQty = (id) => {
        return setCartItems((prev) => {
            return prev.map((item) => {
                return item.id === id ? {...item, qty: item.qty - 1} : item;
            
        }).filter((item) => item.qty > 0);
    })
    }

    const removeItem = (id) => {
        setCartItems((prev) => {
            return prev.filter((i) => i.id !== id)
        })
    }

    const clearCart = () => {
        setCartItems([]);
    }

    const updateQuantity = (id, newQty) => {
        return setCartItems((prev) => {
           return prev.map((item => {
                return item.id === id ? {...item, qty: newQty} : item
            })).filter((item) => item.qty > 0)
        })
    }

    return (
        <cartContext.Provider value={{cartItems, addToCart, increaseQty, decreaseQty, clearCart, removeItem, updateQuantity}}>
        {children}
        </cartContext.Provider>
    );
   
}