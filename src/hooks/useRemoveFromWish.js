import toast from "react-hot-toast";
import fetchFromDb from "../utils/fetchFromDb"

const useRemoveFromWish = () => {

    const removeFromWish = async (productId) => {
        try{
            await fetchFromDb(`http://localhost:5000/favorite/delete/${productId}`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'}
            });
        }catch(err){
            toast.error(err);
        }
    }

    return {removeFromWish};
}
export default useRemoveFromWish;