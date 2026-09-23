import { useEffect, useState } from 'react';
import styles from '../featuredProduct/featuredProduct.module.css';
import useFetchProducts from '../../hooks/useFetchproducts';
import ProductCard from '../productCard/productCard';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
const FeaturedProduct = () => {
    const {featuredProduct, featuredProductLoading, getFeaturedProducts} = useFetchProducts();
    useEffect(()=> {
        getFeaturedProducts();
    }, [getFeaturedProducts]);

    console.log(featuredProduct);

    return(
        <div className={styles.featuredProduct}>
            <div className={styles.featuredProductText}>
                <p>CURATED NEW ARRIVALS</p>
                <h1>Featured Products</h1>
                
                <Link to='/shop' className={styles.featuredCTA}><p>View All Products </p><ArrowRight size={20}/></Link>
            </div>
            {
                featuredProductLoading ? <div className={styles.spinnerContainer}><div className={styles.spinner}></div></div> : <div className={styles.featuredProductCard}>{featuredProduct.map(p => {
                    return <ProductCard key={p.id} product={p}/>
                })}</div>
            }
        </div>
    )

}
export default FeaturedProduct;