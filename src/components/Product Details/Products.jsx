/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Component } from 'react';
import { fetchProducts } from '../../utils/services/APIs';
import StarsRating from '../../utils/shared/StarsRating';
import { addProducts } from '../../utils/store/slices/Products';
import { connect } from 'react-redux';


class Products extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            loading: true,
            error: null
        };
    }

    componentDidMount() {
        fetchProducts()
            .then(response => {
                this.setState({
                    products: response.data,
                    loading: false
                });
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    error: error.message
                });
            });
    }

    productDetails = (product) => {
        this.props.passProductToParent(product);
    }

    addItem = (product) => {
        this.props.dispatch(addProducts(product));

    }

    render() {
        const { products } = this.state;
        return <>
            <div className='container products'>
                <h1>You May Also Like</h1>
                <main className='d-flex table-responsive'>

                    {/* the product */}
                    {products.map((product) => {
                        return (
                            <section className='mx-3' key={product.id} onClick={() => this.productDetails(product)} >
                                <div className="card " style={{ width: '200px' }}>
                                    <div className='imag' >
                                        <img className='col-12' src={product.image} />
                                        <div className='showDetails'>
                                            Show Details
                                        </div>
                                    </div>

                                    <div className="card-body row">
                                        <h5 className="card-title fw-semibold">{product.title.substring(0, 20)}</h5>
                                        <p className="card-text primary-color m-0">{product.description.substring(0, 40)}</p>
                                        <StarsRating Rating={product.rating.rate} />

                                        <span className='secondary-color fw-semibold'>{product.price} EGP</span>
                                        <section className='col-12 d-flex justify-content-between p-0'>
                                            <a className="btn btn-dark" onClick={() => this.addItem(product)}>ADD TO CART</a>
                                            <button className='border-0 rounded-3'>
                                                <FontAwesomeIcon className='' icon={faHeart} />
                                            </button>

                                        </section>
                                    </div>
                                </div>
                            </section>
                        )
                    })}

                </main>
            </div>
        </>;

    }
}
const mapStateToProps = state => {
    return {
        cartItemCount: state.products.allProducts // Read the cart item count from Redux state
    };
};
export default connect(mapStateToProps)(Products)