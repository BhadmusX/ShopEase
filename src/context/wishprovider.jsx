import { useState, useEffect, useCallback } from "react";
import wishContext from "./wishContext";
import fetchFromDb from "../utils/fetchFromDb";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";
const WishProvider = ({children}) => {
  const { user, loading: authLoading } = useAuth();
    const [wishListdata, setWishListData] = useState([]);
    const [wishListError, setWishListError] = useState(null);
    const [wishError, setWishError] = useState(null);
    const [wishData, setWishData] = useState([]);
    const [wishLoading, setLoading] = useState(false);
    const [wishListIds, setWishListIds] = useState(new Set());
    const navigate = useNavigate();

    let wishListRequest = null;
      const getWishList = useCallback(async () => {
        setLoading(true);
        setWishError(null);
        try{
        if (!wishListRequest) {
          wishListRequest = fetchFromDb('http://localhost:5000/favorite/get', {
              method:'GET',
              headers: {'Content-Type': 'application/json'},
          });
        }

        const response = await wishListRequest;
        setWishData(response);
        console.log(response);
        setWishError(null);
        return response;
      }catch(err){
        setWishError(err);
        setWishData(null);
        throw err;
      }finally{
        wishListRequest = null;
        setLoading(false)
      }
    }, []);

    useEffect(() => {
        if (authLoading || !user) {
          setWishData([]);
          setWishListIds(new Set());
          return;
        }
            async function loadWishList() {
                const wishList = await getWishList();
                const ids = wishList.map(favorite => {
                  const productId = favorite.productId?._id ?? favorite.productId;
                  return String(productId);
                });
                setWishListIds(new Set(ids));
            }
            loadWishList();
          }, [authLoading, getWishList, user]);


      const addToWish = async (product) => {
        if(authLoading){
          return false
        }

        if(!user){
          navigate('/signin');
          return false
        }
        try{
            const productId = String(product.productId || product.id);
            const imageUrl = product.imageUrl || product.image;
            await fetchFromDb('http://localhost:5000/favorite/create', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                  title: product.title,
                  productId,
                  category: product.category,
                  price: product.price,
                  source: product.source,
                  imageUrl
                })
            });
            setWishData((currentWishlist) => {
              const alreadyExists = currentWishlist.some((favorite) => {
                const favoriteProductId = favorite.productId?._id ?? favorite.productId;
                return String(favoriteProductId) === productId;
              });
              return alreadyExists ? currentWishlist : [...currentWishlist, {
                ...product,
                id: product.id,
                productId,
                image: imageUrl,
                imageUrl
              }];
            });
            return true
        }catch(err){
           throw err;
        }
      };

        const removeFromWish = async (productId) => {
        try{
          await fetchFromDb(`http://localhost:5000/favorite/delete/${productId}`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'}
            }); 
            setWishData((currentWishlist) => currentWishlist.filter((favorite) => {
              const favoriteProductId = favorite.productId?._id ?? favorite.productId;
              return String(favoriteProductId) !== String(productId);
            }));
        }catch(err){
            throw err;
        }
    }

    const wishCount = wishListIds.size;
    

    return (
      <wishContext.Provider value={{setWishListIds, wishListIds, addToWish, removeFromWish, wishCount, wishError, wishLoading, wishData}}>
        {children}
      </wishContext.Provider>
    );
}
export default WishProvider;