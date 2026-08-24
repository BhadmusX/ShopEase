import { createBrowserRouter } from "react-router";
import ShopPage from "./pages/shopPage/shop-page";
import Homepage from "./pages/homePage/home-page";
import { CartPage } from "./pages/cartPage/cart-page";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Homepage/>
    },
    {
        path: "/shop",
        element: <ShopPage/>
    },
    {
        path: "/cart",
        element: <CartPage/>
    }
])

export default router;