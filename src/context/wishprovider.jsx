import { useState, useEffect, useCallback } from "react";
import wishContext from "./wishContext";
import fetchFromDb from "../utils/fetchFromDb";
import toast from "react-hot-toast";
const WishProvider = ({children}) => {
    const [wishListdata, setWishListData] = useState([]);
    const [wishListError, setWishListError] = useState(null);
    const [wisherror, setWishError] = useState(null);
    const [wishdata, setWishData] = useState([]);
    const [wishloading, setLoading] = useState(false);
    const [wishListIds, setWishListIds] = useState(new Set());

    let wishListRequest = null;
      const getWishList = useCallback(async () => {
        try{
        if (!wishListRequest) {
          wishListRequest = fetchFromDb('http://localhost:5000/favorite/get', {
              method:'GET',
              headers: {'Content-Type': 'application/json'},
          });
        }

        const response = await wishListRequest;
        setWishData(response);
        return response;
      }catch(err){
        setWishError(err);
        throw err;
      }finally{
        wishListRequest = null;
      }
    }, []);

    useEffect(() => {
            async function loadWishList() {
                const wishList = await getWishList();
                setWishListIds(new Set(wishList.map(favorite =>
                    String(favorite.productId._id)
                )));
            }
            loadWishList();
        }, [getWishList]);


      const addToWish = async (productId) => {
        try{
            await fetchFromDb('http://localhost:5000/favorite/create', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({productId: productId})
            });

        }catch(err){
           toast.error(err);
        }
      };

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

    const wishCount = wishListIds.size;
    

    return (
      <wishContext.Provider value={{setWishListIds, wishListIds, addToWish, removeFromWish, wishCount, wisherror, wishloading, wishdata}}>
        {children}
      </wishContext.Provider>
    );
}
export default WishProvider;