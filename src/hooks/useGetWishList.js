import { useCallback, useState } from "react"
import fetchFromDb from "../utils/fetchFromDb";

let wishListRequest = null;

const useGetWishList = () => {
      const [wishListdata, setData] = useState([]);
      const [wishListError, setError] = useState(null);

      const getWishList = useCallback(async () => {
        try{
        if (!wishListRequest) {
          wishListRequest = fetchFromDb('http://localhost:5000/favorite/get', {
              method:'GET',
              headers: {'Content-Type': 'application/json'},
          });
        }

        const response = await wishListRequest;
        setData(response);
        return response;
      }catch(err){
        setError(err);
        throw err;
      }finally{
        wishListRequest = null;
      }
    }, []);

    return {getWishList, wishListError, wishListdata};
}

export default useGetWishList;