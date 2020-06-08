import React, {Fragment, useState} from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';

import {products} from "./utils/products";

import './index.css';

const NavigationBar = () => {
    return (
        <nav>
            <ul className={'nav-list'}>

                <Link to={'/'}>
                    <li>Home</li>
                </Link>

                <Link to={'/cart'}>
                    <li>Cart</li>
                </Link>

                <Link to={'/checkout'}>
                    <li>Checkout</li>
                </Link>

            </ul>
        </nav>
    );
}


const CartPage = () => {
    return (
        <div className={'cart-checkout'}>
            <h2>Cart Page</h2>
        </div>
    );

}


const CheckoutPage = () => {
    return (
        <div className={'cart-checkout'}>
            <h2>Checkout Page</h2>
        </div>
    );
}

const LaptopsPage = () => {
    return (
        <div>
            <RenderSideBar/>
            <div className={'main'}>
                <h2>Laptops Page</h2>
            </div>
        </div>
    );
}

const PhonesPage = () => {
    return (
        <div>
            <RenderSideBar/>
            <div className={'main'}>
                <h2>Phones Page</h2>
            </div>
        </div>
    );
}

const AcerPage = () => {
    return (
        <div>
            <RenderSideBar/>
            <div className={'main'}>
                <h2>Acer Page</h2>
            </div>
        </div>
    );
}


const HpPage = () => {
    return (
        <div>
            <RenderSideBar/>
            <div className={'main'}>
                <h2>HP Page</h2>
            </div>
        </div>
    );
}


const DellPage = () => {
    return (
        <div>
            <RenderSideBar/>
            <div className={'main'}>
                <h2>Dell Page</h2>
            </div>
        </div>
    );
}


const CatPage = () => {
    return (
        <div>
            <RenderSideBar/>
            <div className={'main'}>
                <h2>CAT Page</h2>
            </div>
        </div>
    );
}


const IphonePage = () => {
    return (
        <div>
            <RenderSideBar/>
            <div className={'main'}>
                <h2>Iphone Page</h2>
            </div>
        </div>
    );
}


const XiaomiPage = () => {
    return (
        <div>
            <RenderSideBar/>
            <div className={'main'}>
                <h2>Xiaomi Page</h2>
            </div>
        </div>
    );
}


const HomePage = ({prodItems, addToCart}) => {

    // TODO - Implemented for mobile only
    return (
        <div>
            <RenderSideBar/>

            {/*this consists of cards of products in which every product has a name, photo, price, and Add To Cart button*/}
            <div className={'main'}>
                {prodItems.map((prod, index) => {
                    return (
                        <div className={'card'} key={index}>

                            <img
                                className={'card-image'}
                                src={prod['image']}
                                alt={`${prod['brand']} - ${prod['item']}`}
                                key={`img-${index}`}
                            />
                            <h2 key={`header-${index}`}>{prod['brand']} - {prod['item']}</h2>
                            <p key={`price-${index}`} className={'price'}>{`$${prod['details']['price']}`}</p>

                            <div key={`visit-${index}`} className={'visit-link'}>
                                <Link
                                    key={`link-${index}`}
                                    to={`${prod['item'].replace(' ', '_').toLowerCase()}`}
                                    value={prod['item']}

                                >
                                    Visit Product
                                </Link>
                            </div>

                            <button key={`addToCart-${index}`} value={prod['item']} onClick={(e) => addToCart(e)}>
                                Add To Cart
                            </button>

                        </div>
                    )
                })}
            </div>
        </div>
    )
}

const RenderSideBar = () => {

    // render side bar consists of a dropdown for each product type (laptops, phones) with links towards the specific page.
    //   every dropdown contains every product link to the specific page
    // if the window width is smaller than 1000px (this goes for mobiles) avoid using drop down and use links for product only
    return (
        <Fragment>
            <div className={'side-nav'}>


                {Object.keys(products).map((product, prodIndex) => {
                    return (
                        <Fragment key={`fragment-${prodIndex}`}>

                            {/* if window width > 1000 class is the one used for desktop, else class is the one used for mobile*/}
                            <div className={window.innerWidth > 1000 ? 'dropdown-div' : 'inline-div'}
                                 key={`dropdown-${prodIndex}`}>
                                <Link key={`link-${prodIndex}`} to={product.toLowerCase()}>
                                    {product}
                                </Link>
                            </div>

                            {
                                // This applies for desktop view
                                window.innerWidth > 1000 ?

                                    <div key={`content-${prodIndex}`} className={'dropdown-content'}>
                                        {Object.keys(products[product]).map((prodType, prodTypeIndex) => {
                                            return (
                                                <Link key={prodTypeIndex} to={prodType.toLowerCase()}>
                                                    {prodType}
                                                </Link>
                                            );

                                        })}
                                    </div>

                                    :

                                    // do not render div with dropdown-content class in case the width is smaller than 1000 px
                                    null}
                        </Fragment>
                    )
                })}
            </div>
        </Fragment>
    );
}


const App = () => {

    const prods = [];

    // compose a list of every product as a json which contains the product and details about it.
    //   this is needed to render the homepage with specific products
    for (let prod in products) {
        if (products.hasOwnProperty(prod)) {
            for (let brand in products[prod]) {
                if (products[prod].hasOwnProperty(brand)) {
                    for (let item in products[prod][brand]) {
                        if (products[prod][brand].hasOwnProperty(item)) {
                            prods.push({
                                'product': prod,
                                'brand': brand,
                                'item': item,
                                'image': products[prod][brand][item]['image'],
                                'details': products[prod][brand][item]['details'],
                            })
                        }
                    }
                }
            }
        }
    }


    // TODO - implemented in the future
    // make a list for every electronic type
    const phones = prods.filter(key => key['product'] === 'Phones')
    const laptops = prods.filter(key => key['product'] === 'Laptops')

    const [prodItems, setProdItems] = useState(prods);

    const [cartItems, setCartItems] = useState([]);


    // Add item to cartItems
    const handleAddToCart = (e) => {

        // data is the attribute for button which identifies the brand of the target

        const clickedItem = prodItems.filter(product => {
            return product['item'] === e.target.value;
        })



        // TODO: This logic is severely broken and needed to be dealt as soon as possible
        if (cartItems.length > 0) {
            for (let i = 0; i < cartItems.length; i++) {
                if (cartItems[i][0]['item'] === clickedItem[0]['item'] && cartItems[i][0]['quantity'] > 0) {
                    cartItems[i][0]['quantity'] += 1;
                } else {
                    clickedItem[0]['quantity'] = 1;
                    setCartItems([...cartItems, clickedItem]);
                }
            }
        } else {
            clickedItem[0]['quantity'] = 1;
            setCartItems([...cartItems, clickedItem]);
        }
    };

    return (
        <Router>
            <NavigationBar/>
            <Switch>
                <Route
                    path={'/'}
                    exact
                    render={() => <HomePage prodItems={prodItems} addToCart={handleAddToCart}/>}
                />

                <Route
                    path={'/cart'}
                    render={() => <CartPage cartItems={cartItems}/>}
                />

                <Route path={'/checkout'} component={CheckoutPage}/>
                <Route path={'/laptops'} component={LaptopsPage}/>
                <Route path={'/phones'} component={PhonesPage}/>
                <Route path={'/acer'} component={AcerPage}/>
                <Route path={'/hp'} component={HpPage}/>
                <Route path={'/dell'} component={DellPage}/>
                <Route path={'/iphone'} component={IphonePage}/>
                <Route path={'/cat'} component={CatPage}/>
                <Route path={'/xiaomi'} component={XiaomiPage}/>
            </Switch>
        </Router>
    );
}


ReactDOM.render(
    <App/>,
    document.getElementById('root'),
);
