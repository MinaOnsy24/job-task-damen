/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import StarsRating from '../utils/shared/StarsRating';
import { useDispatch } from 'react-redux'
import { removfavoraite } from '../utils/store/slices/Favorite';

export default function Favoraite() {
  const dispatch = useDispatch()

  const allFavoraiteProduct = useSelector((state) => state.favoraite.allfavoraite)

  useEffect(() => {
    console.log(allFavoraiteProduct);
  }, [allFavoraiteProduct]);

  return (<>
    <div className="ps-5 py-3 bg-black text-light">
        <h6>Home / Products </h6>
    </div>

    <div className='products mt-3'>
        <main className='row container'>
            {allFavoraiteProduct.map((product) => (
                <section className='col-lg-3 col-md-6 col-12 mb-3' key={product.id}>
                    <div className="card">
                        <div className='imag'>
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
                                <a className="btn btn-dark" >ADD TO CART</a>
                                <button className='border-0 rounded-3'>
                                    <FontAwesomeIcon className='secondary-color' icon={faHeart} onClick={()=>dispatch(removfavoraite(product))}/>
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
