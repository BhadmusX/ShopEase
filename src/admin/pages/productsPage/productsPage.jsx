import { useEffect } from "react";
import useFetchProducts from "../../../hooks/useFetchproducts";
import ProductCard from "../../component/productCard/adminProductCard";

const ProductsPage = () => {
    const {fetchProduct, productError, productData, productLoading} = useFetchProducts();

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);

    if (productLoading) {
        return <p>Loading products...</p>;
    }

    if (productError) {
        return <p>Something went wrong: {productError}</p>;
    }

    return(
        <div>
            {
                productData.map(prod => {
                    return <ProductCard key={prod.id} product={prod}/>;
                })
            }
        </div>
    )
}

export default ProductsPage;