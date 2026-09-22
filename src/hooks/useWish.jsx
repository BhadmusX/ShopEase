import { useContext } from "react";
import wishContext from "../context/wishContext";

const useWish = () => {
    const context = useContext(wishContext);
    if(!context){
    throw new Error('useWish should be used inside the wishprovider');
    }
    return context;
}
export default useWish;