/* eslint-disable jsx-a11y/alt-text */
import { faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Component } from 'react';
import StarsRating from '../../utils/shared/StarsRating'
import { connect } from 'react-redux';
import { addProducts, removeSpecificItem } from '../../utils/store/slices/Products';

class SingleProduct extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {
            singleProduct: null
        };
    }

    componentDidMount() {
        // Update singleProduct state when the prop arrives from the parent
        const { product } = this.props;
        if (product) {
            this.setState({ singleProduct: product });
        }
    }

    componentDidUpdate(prevProps) {
        // Check if the prop has changed and update singleProduct state accordingly
        if (prevProps.product !== this.props.product) {
            this.setState({ singleProduct: this.props.product });
        }
    }

    //
    removeItem = (product) => {
        this.props.dispatch(removeSpecificItem(product));

    }

    //
    addItem = (product) => {
        this.props.dispatch(addProducts(product));
    }

    render() {
        const { singleProduct } = this.state;

        // Check if this.singleProduct is null or undefined
        if (!singleProduct) {
            return null;
        }

        // Once this.singleProduct is available, render the content
        return (
            <>

                <div className="ps-5 py-3 bg-black text-light">
                    <h6>Home / Products / POS / {singleProduct.title.substring(0, 10)}</h6>
                </div>

                <div className="primary-color card border-0 mb-3 container singleProduct" >
                    <div className="row g-0">
                        <div className="col-md-4 border-1">
                            <img src={singleProduct.image} style={{ width: '100%', height: "300px" }} />
                        </div>
                        <div className="col-md-8 container">
                            <div className="card-body">
                                <h5 className="card-title ">{singleProduct.title}</h5>
                                {/* <span>{singleProduct.rating.rate}</span> */}
                                <StarsRating Rating={singleProduct.rating.rate} />


                                <section>
                                    <span className="secondary-color fs-2 me-4 fw-semibold">{singleProduct.price} EGP</span>
                                    <span className='me-2 text-decoration-line-through fs-4'>{singleProduct.price + 100} EGP</span>
                                </section>

                                {/* description */}
                                <p className="card-text">{singleProduct.description}</p>

                                {/* buttons */}
                                <div className='row'>

                                    <div className='ms-3 col-4 border rounded-4 d-flex justify-content-between align-items-center'>
                                        <button className='fs-1 border-0 bg-transparent' onClick={() => this.removeItem(singleProduct)}>-</button>
                                        <button className='fs-3 border-0 bg-transparent'>1</button>
                                        <button className='fs-1 border-0 bg-transparent' onClick={() => this.addItem(singleProduct)}>+</button>
                                    </div>

                                    <button className='offset-1 col-6 btn btn-dark' onClick={() => this.addItem(singleProduct)}>BUY NOW</button>
                                </div>

                                {/* icons */}
                                <div className='col-12 col-lg-8 mt-3 row'>

                                    {/* add to  wishlis*/}
                                    <section className='col-6 '>
                                        <FontAwesomeIcon icon={faHeart} className='me-3' />
                                        <span>add to wishlis</span>
                                    </section>

                                    {/* share */}
                                    <section className='col-6 '>
                                        <FontAwesomeIcon icon={faShare} className='me-3' />
                                        <span>share</span>
                                    </section>

                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </>);

    }
}
const mapStateToProps = state => {
    return {
        cartItemCount: state.products.allProducts // Read the cart item count from Redux state
    };
};
export default connect(mapStateToProps)(SingleProduct);
