/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faMagnifyingGlass, faMinus, faPlus, faTrash, faUser, faX } from '@fortawesome/free-solid-svg-icons'
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addProducts, removeSpecificItem, removProducts } from '../utils/store/slices/Products';
class NavBar extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super()
        this.state = {
            show: false
        };
    }
    //open and close the cart
    toggleButton = () => {
        this.setState(prevState => ({
            show: !prevState.show
        }));
    }
    
    // calculate Total Count
    calculateTotalCount = () => {
        const { cartItemCount } = this.props;
        let totalCount = 0;
        cartItemCount.forEach(item => {
            totalCount += item.count;
        });
        return totalCount;
    }

    // calculate Total price
    calculateTotalPrice = () => {
        const { cartItemCount } = this.props;
        let totalPrice = 0;
        cartItemCount.forEach(item => {
            totalPrice += (item.price * item.count); // Assuming each item has a price and count property
        });
        return totalPrice;
    }

    //
    removeProduct = (product) => {
        // Dispatch the addProducts action with the product as payload
        this.props.dispatch(removProducts(product));
    };
    removeItem = (product) => {
        this.props.dispatch(removeSpecificItem(product));

    }

    //
    addItem = (product) => {
        this.props.dispatch(addProducts(product));

    }
    componentWillUpdate() {
        const { cartItemCount } = this.props;
    }

    render() {
        const { show } = this.state
        const { cartItemCount } = this.props;
        const totalCount = this.calculateTotalCount();
        const totalPrice = this.calculateTotalPrice();
        return <>
            {show && (<>
                <div className='blackScreen' onClick={this.toggleButton}> </div>
            </>
            )}
            <nav className="navbar navbar-expand-lg bg-body-tertiary text-center">
                <div className="container">

                    {/* company logo */}
                    <a className="navbar-brand " >
                        <img src="../images/Damen Cash colored English.svg" style={{ width: '90px' }} />
                    </a>

                    {/* collapse button */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {/* taps */}
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            <li className="nav-item">
                                <Link className="nav-link" to="/">Products</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/Favoraite">Favorite</Link>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" >Best Seller</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" >New Arrival</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" >About Us</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" >Contact Us</a>
                            </li>

                        </ul>

                        {/* icons */}
                        <aside className="d-flex text-center justify-content-center" role="search">

                            {/* button Serarch */}
                            <button className='border-0 rounded-circle'>
                                <FontAwesomeIcon className=' p-2 rounded-circle' icon={faMagnifyingGlass} />
                            </button>

                            <button type="button" className="mx-3 rounded-circle position-relative border-0" >
                                <FontAwesomeIcon className='p-2' icon={faCartShopping} onClick={this.toggleButton} />

                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger text-light d-flex justify-content-center align-items-center">
                                    {totalCount}</span>

                                {show && (<>
                                    <main className='cart'>
                                        <header className='d-flex justify-content-between algin-items-center'>
                                            <h5>MY CART ({cartItemCount.length})</h5>
                                            <FontAwesomeIcon icon={faX} onClick={this.toggleButton} />
                                        </header>
                                        {cartItemCount.length === 0 ?
                                            (<p>Your cart is empty. Go and buy some product!</p>)
                                            :
                                            <>
                                                <ul className="list-group">
                                                    {cartItemCount.map((product) => (
                                                        <li key={product.id} className="row mb-3 align-items-center">
                                                            <img src={product.image} alt="" style={{ width: '50px', height: "50px" }} className="col-4 p-0" />
                                                            <div className="col-4">
                                                                <p className='m-0'>{product.title.substring(0, 10)}</p>
                                                                <span className='secondary-color'>{product.price}</span> {/* Assuming you have a price property */}
                                                            </div>
                                                            <div className='d-flex justify-content-between col-4'>

                                                                <FontAwesomeIcon icon={faMinus} onClick={() => this.removeItem(product)} />
                                                                <span>{product.count}</span>
                                                                <FontAwesomeIcon icon={faPlus} onClick={() => this.addItem(product)} />
                                                                <FontAwesomeIcon icon={faTrash} onClick={() => this.removeProduct(product)} />
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <div className="row">
                                                    <div className='col-12 d-flex justify-content-around'>
                                                        <span className='primary-color'>Sub Total </span>
                                                        <span className='secondary-color fw-semibold'>{totalPrice.toFixed(2)} EGP</span>
                                                    </div>
                                                    <button className='col-12 btn btn-dark'>GO TO CART</button>
                                                </div>
                                            </>}

                                    </main>
                                </>
                                )}

                            </button>

                            {/* button user */}
                            <button className='border-0 rounded-circle'>
                                <FontAwesomeIcon className='p-2' icon={faUser} />
                            </button>
                        </aside>

                    </div>

                </div>
            </nav>


        </>;
    }
}
const mapStateToProps = state => {
    return {
        cartItemCount: state.products.allProducts // Read the cart item count from Redux state
    };
};
export default connect(mapStateToProps)(NavBar)