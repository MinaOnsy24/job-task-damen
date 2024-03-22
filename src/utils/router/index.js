import { Route, Routes } from "react-router-dom";
import HomePage from "../../components/HomePage";
import ProductDetails from "../../components/Product Details/ProductDetails";

export default function Router (){
    return (
        <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/ProductDetails/:id" element={<ProductDetails />}></Route>
        </Routes>
    )
}