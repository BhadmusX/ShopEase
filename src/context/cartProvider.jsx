import { useEffect, useState } from "react";
import { cartContext } from "./cartContext";
export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState(() => {
        try{
        const saved = localStorage.getItem("products");
        return saved ? JSON.parse(saved) : []
        }catch{
            return [];
        }
    });
    const [wishItems, setWishItems] = useState(() => {
        try{
        const saved = localStorage.getItem("wishItems");
        return saved ? JSON.parse(saved) : [];
        }catch{
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("products", JSON.stringify(cartItems))
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem("wishItems", JSON.stringify(wishItems));
    }, [wishItems]);

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

    const addToWish = ( product, qty) => {
        setWishItems((prev) => {
            const exist = prev.some((item) => item.id === product.id);
            if(exist){
                return prev.map((item) => item.id === product.id ? {...item, qty: item.qty + qty} : item)
            }
            else{
                return [...prev, {...product, qty}]
            }
        })
    };

    const removeWish = (product) => {
        setWishItems((prev) => {
            return prev.filter((item) => item.id !== product.id);
        });
    };

    return (
        <cartContext.Provider value={{cartItems, addToCart, increaseQty, decreaseQty, clearCart, removeItem, updateQuantity, addToWish, removeWish, wishItems}}>
        {children}
        </cartContext.Provider>
    );
   
}