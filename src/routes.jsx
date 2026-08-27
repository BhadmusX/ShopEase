import { createBrowserRouter } from "react-router";
import ShopPage from "./pages/shopPage/shop-page";
import Homepage from "./pages/homePage/home-page";
import { CartPage } from "./pages/cartPage/cart-page";
import WishList from "./pages/wishListPage/wishList.jsx";
import { ErrorPage } from "./pages/errorPage/errorpage.jsx";
const router = createBrowserRouter([

    {
        errorElement: <ErrorPage/>,
        children: [
            {
        path: "/",
        element: <Homepage/>,
    },
    {
        path: "/shop",
        element: <ShopPage/>,
    },
    {
        path: "/cart",
        element: <CartPage/>,
    },
    {
        path: "/wishlist",
        element: <WishList/>,
    }, {
        path: "*",
        element: <ErrorPage/>
    }
        ]
    }
])

export default router;