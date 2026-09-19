import { Pencil, Trash } from "lucide-react"
import { Link } from "react-router"
const ProductCard = ({product}) => {
    return(
        <div>
                <div>
                    <div>
                        <div>
                            <img src={product.imageUrl} alt={product.title} />
                            <h1>{product.title}</h1>
                        </div>

                        <div>
                           <Link><Pencil size={20}/></Link> 
                           <Link><Trash size={20}/></Link>
                        </div>
                    </div>

                    <div>
                        <div>
                            <p>Category</p>
                            <h1>{product.category}</h1>
                        </div>

                        <div>
                            <p>Price</p>
                            <h1>${product.price}</h1>
                        </div>
                    </div>
                </div>
        </div>
    )
}
export default ProductCard;