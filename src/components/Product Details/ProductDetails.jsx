import React, { useState, useEffect } from 'react';
import SingleProduct from './SingleProduct';
import Products from './Products';
import { useLocation } from 'react-router-dom';

function ProductDetails() {
    const [singleProduct, setSingleProduct] = useState(null);
    const location = useLocation();

    useEffect(() => {
        setSingleProduct(location.state.product);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const receiveProductFromChild = (product) => {
        setSingleProduct(product);
    };

    return (
        <>
            <SingleProduct product={singleProduct} />
            <Products passProductToParent={receiveProductFromChild} />
        </>
    );
}

export default ProductDetails;
