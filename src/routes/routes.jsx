import { createBrowserRouter, Outlet } from "react-router";
import { Toaster } from "react-hot-toast";
import AuthProvider from "../context/AuthProvider.jsx";
import { CartProvider } from "../context/cartProvider.jsx";
import WishProvider from "../context/wishprovider.jsx";
import ShopPage from "../pages/shopPage/shop-page.jsx";
import Homepage from "../pages/homePage/home-page.jsx";
import { CartPage } from "../pages/cartPage/cart-page.jsx";
import WishList from "../pages/wishListPage/wishList.jsx";
import { ErrorPage } from "../pages/errorPage/errorpage.jsx";
import SignUpPage from "../pages/signupPage/signupPage.jsx";
import SignInPage from "../pages/signinPage/signinPage.jsx";
import ProtectedRoute from "./protectedroute.jsx";
import SucessPage from "../pages/successPage/success.jsx";
import AdminDashboard from "../admin/pages/admindashboard/admindashboard.jsx";
import CreateProductPage from "../admin/pages/createProductPage/createProductPage.jsx";
import ProductsPage from "../admin/pages/productsPage/productsPage.jsx";
import EditProductPage from "../admin/pages/editProductPage/editProductPage.jsx";
import AnalyticsPage from "../admin/pages/analyticsPage/analyticsPage.jsx";

const RootLayout = () => (
    <AuthProvider>
        <CartProvider>
            <WishProvider>
                <Toaster position="top-right" />
                <Outlet />
            </WishProvider>
        </CartProvider>
    </AuthProvider>
);

const router = createBrowserRouter([

    {
        element: <RootLayout />,
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
        path: 'purchase-success',
        element: <SucessPage/>
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
        element: <ProtectedRoute adminOnly={true}/>,
        children: [
            {
                path: "admin",
                element: <AdminDashboard/>,
                children: [
                    {
                        index: true,
                        element: <AnalyticsPage/>
                    },
                    {
                        path: 'analytics',
                        element: <AnalyticsPage/>
                    },
                    {
                        path: 'products',
                        element: <ProductsPage/>
                    },
                    {
                        path: "products/create",
                        element: <CreateProductPage/>
                    },
                    {
                        path: 'products/edit/:id',
                        element: <EditProductPage/>
                    }
                ]
            }
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