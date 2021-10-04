import HomePage from "./components/HomePage/HomePage";
import ProductsPage from "./components/ProductsPage/ProductsPage";
import Introduce from "./components/Introduce/Introduce";
import Service from "./components/ServicePage/ServicePage";
import LibraryPage from "./components/LibraryPage/LibraryPage";
import Contact from "./components/Contact/Contact";
import Addproducts from "./components/addProducts/Addproducts";
import NotFound from "./components/NotFound/NotFound";
import Cart from "./components/cart/Cart";
import Register from "./components/LoginRegister/Register";
import Login from "./components/LoginRegister/Login";
import Account from "./components/Account/Account";

const routers = [
    {
        to : '/',
        exact : true,
        main : ()=> <HomePage/>
    },
    {
        to : '/products',
        exact : false,
        main : ()=> <ProductsPage/>
    },
    {
        to : '/introduce',
        exact : false,
        main : ()=> <Introduce/>
    },
    {
        to : '/service',
        exact : false,
        main : ()=> <Service/>
    },
    {
        to : '/library-page',
        exact : false,
        main : ()=> <LibraryPage/>
    },
    {
        to : '/contact-page',
        exact : false,
        main : ()=> <Contact/>
    },
    {
        to : '/add-product-page',
        exact: false,
        main : ({history})=> <Addproducts history = {history}/>
    },
    {
        to : '/cart',
        exact: false,
        main : ()=> <Cart/>
    },
    {
        to : '/register',
        exact: false,
        main : ()=> <Register/>
    },
    {
        to : '/account',
        exact: false,
        main : ()=> <Account/>
    },
    {
        to : '/login',
        exact: false,
        main : ({history})=> <Login history = {history}/>
    },
    {
        to : '',
        exact : true,
        main : ()=> <NotFound/>
    },

];

export default routers;

