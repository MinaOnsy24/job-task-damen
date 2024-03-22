/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchProducts } from '../utils/services/APIs';
import { useNavigate } from 'react-router-dom';
import StarsRating from '../utils/shared/StarsRating';
import { useDispatch } from 'react-redux'
import { addProducts } from '../utils/store/slices/Products';
import Loading from './Loading';

function HomePage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        fetchProducts()
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                // setError(error.message);
            });
    }, []);

    const productDetails = (product) => {
        navigate(`/ProductDetails/${product.id}`, {
            state: {
                product
            }
        });
    };



    return (<>

        {loading && <Loading />}

        <div className="ps-5 py-3 bg-black text-light">
            <h6>Home / Products </h6>
        </div>

        <div className='products mt-3'>
            <main className='row container mx-auto'>
                {products.map((product) => (
                    <section className='mx-auto col-lg-3 col-md-6 col-12 mb-3' key={product.id}>
                        <div className="card">
                            <div className='imag' onClick={() => productDetails(product)}>
                                <img className='col-12' src={product.image} />
                                <div className='showDetails'>
                                    Show Details
                                </div>
                            </div>

                            <div className="card-body row">
                                <h5 className="card-title fw-semibold">{product.title.substring(0, 20)}</h5>
                                <p className="card-text primary-color m-0">{product.description.substring(0, 40)}</p>
                                <div>
                                    <StarsRating Rating={product.rating.rate} />
                                </div>
                                <span className='secondary-color fw-semibold'>{product.price} EGP</span>
                                <section className='col-12 d-flex justify-content-between p-0'>
                                    <a className="btn btn-dark" onClick={() => dispatch(addProducts(product))} >ADD TO CART</a>
                                    <button className='border-0 rounded-3'>
                                        <FontAwesomeIcon className='' icon={faHeart} />
                                    </button>
                                </section>
                            </div>
                        </div>
                    </section>
                ))}
            </main>
        </div>
    </>
    );
}

export default HomePage;
