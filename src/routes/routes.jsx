import { createBrowserRouter } from "react-router";
import ShopPage from "../pages/shopPage/shop-page.jsx";
import Homepage from "../pages/homePage/home-page.jsx";
import { CartPage } from "../pages/cartPage/cart-page.jsx";
import WishList from "../pages/wishListPage/wishList.jsx";
import { ErrorPage } from "../pages/errorPage/errorpage.jsx";
import SignUpPage from "../pages/signupPage/signupPage.jsx";
import SignInPage from "../pages/signinPage/signinPage.jsx";
import ProtectedRoute from "./protectedroute.jsx";
const router = createBrowserRouter([

    {
        errorElement: <ErrorPage/>,
        children: [
            {
        index: true,
        element: <Homepage/>,
    },
    {
        path:'signup',
        element: <SignUpPage/>
    },
    {
        path:'signin',
        element: <SignInPage/>
    },
    {
        element: <ProtectedRoute/>,
        children: [
             {
        path: "shop",
        element: <ShopPage/>,
    },
    {
        path: "cart",
        element: <CartPage/>,
    },
    {
        path: "wishlist",
        element: <WishList/>,
    }, 
        ]
    },
    {
        path: "*",
        element: <ErrorPage/>
    }
        ]
    }
])

export default router;