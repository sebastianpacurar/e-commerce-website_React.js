import React, {Fragment, useState} from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';

import {products} from "./utils/products";

import './index.css';

const NavigationBar = ({itemsInCart}) => {
    return (
        <nav>
            <ul className={'nav-list'}>

                <Link to={'/'}>
                    <li>Home</li>
                </Link>

                <Link to={'/cart'}>
                    <li>Cart ({itemsInCart})</li>
                </Link>

                <Link to={'/checkout'}>
                    <li>Checkout</li>
                </Link>

            </ul>
        </nav>
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


const CartPage = ({cartItems, clickQuantity}) => {

    const totalPrice = [];

    for (let i = 0; i < cartItems.length; i++) {
        const productParsedPrice = cartItems[i]['price'] * cartItems[i]['quantity'];
        totalPrice.push(productParsedPrice);
    }

    return (
        <Fragment>

            {cartItems.length > 0

                // if cart is not empty, render cart page
                ?

                <div className={'cart-checkout-product'}>
                    <div className="row">

                        {cartItems.map((prod, index) => {
                            return (
                                <div className={'item-column'} key={`item-column-${index}`}>
                                    <div className={'item-card'} key={`item-card-${index}`}>
                                        <h2>{`${prod['brand']} - ${prod['item']}`}</h2>
                                        <img
                                            className={'card-image'}
                                            src={prod['image']}
                                            alt={`${prod['brand']} - ${prod['item']}`}
                                            style={{width: '50%', height: 'auto'}}
                                            key={`img-${index}`}
                                        />

                                        <h2>Quantity:</h2>
                                        <div className={'quantity-container'} key={`quantity-container-${index}`}>

                                            <button
                                                value={prod['item']}
                                                name={'add'}
                                                className={'quantity-button'}
                                                key={`add-button-${index}`}
                                                onClick={e => clickQuantity(e)}
                                            >+
                                            </button>

                                            <div className={'quantity-value'} key={`quantity-value-${index}`}>
                                                {prod['quantity']}
                                            </div>

                                            <button
                                                value={prod['item']}
                                                name={'subtract'}
                                                className={'quantity-button'}
                                                key={`subtract-button-${index}`}
                                                onClick={e => clickQuantity(e)}
                                            >-
                                            </button>
                                        </div>

                                        <h2>Price: ${(prod['price'] * prod['quantity']).toFixed(2)}</h2>
                                    </div>
                                </div>
                            )
                        })}

                        <div className={'card'}>
                            <p className={'price'}>Total Cost:
                                ${totalPrice.reduce((acc, currVal) => acc + currVal, 0)}</p>

                            {cartItems.map((prod, index) => {
                                return (
                                    <p
                                        key={`total-price- ${index}`}
                                        className={'price'}
                                    >{prod['quantity']} x {prod['brand']} {prod['item']} =
                                        ${(prod['price'] * prod['quantity']).toFixed(2)}</p>
                                )
                            })}
                        </div>

                        <button className={'buy-button'}>
                            Buy
                        </button>

                    </div>
                </div>

                // if cart is empty, render empty cart page
                :

                <img
                    className={'empty-cart-image'}
                    src={'https://i.ibb.co/PmBcj92/empty-cart.jpg'}
                    alt={'empty-cart'}
                />
            }
        </Fragment>
    );
}


const CheckoutPage = () => {
    return (
        <div className={'cart-checkout-product'}>
            <h2>Checkout Page</h2>
        </div>
    );
}


const ProductPage = ({prodItems, productName, addToCart}) => {

    // filter the prodItems to get the clicked product
    const prod = prodItems.filter(prod => prod['item'] === productName);

    return (
        <Fragment>
            <div className={'cart-checkout-product'}>
                <h3>{`${prod[0]['brand']} - ${prod[0]['item']}`}</h3>
                <div
                    className={'card'}
                    style={{boxShadow: '0px 0px 0px -200px rgba(255,255,255,1)'}}>

                    <img
                        className={'card-image'}
                        src={prod[0]['image']}
                        alt={`${prod[0]['brand']} - ${prod[0]['item']}`}
                    />

                    <button value={prod[0]['item']} onClick={(e) => addToCart(e)}>
                        Add To Cart
                    </button>

                    <p
                        className={'price'}
                        style={{fontSize: '35px', color: 'purple'}}
                    >{`$${prod[0]['price']}`}</p>

                    <table>
                        <thead>
                        <tr>
                            <th>Specifications</th>
                            <th>Descriptions</th>
                        </tr>
                        </thead>
                        <tbody>

                        {Object.entries(prod[0]['details']).map(([key, value], index) => {
                            return (
                                <tr key={`tr-${index}`}>
                                    <td>{key}</td>
                                    <td>{value}</td>
                                </tr>
                            );
                        })}

                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    );
}


const HomePage = ({prodItems}) => {

    // shuffle the array using Fisher-Yates algorithm
    const shuffleItems = (arr) => {
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.trunc(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]]
        }
    }

    shuffleItems(prodItems);

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
                            <p key={`price-${index}`} className={'price'}>{`$${prod['price']}`}</p>

                            <Link
                                className={'link'}
                                key={`link-${index}`}
                                to={`/${prod['item'].replace(' ', '_').toLowerCase()}`}
                                value={prod['item']}

                            >
                                Visit Product
                            </Link>

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
    // if the window width is smaller than 1100px (this goes for mobiles) avoid using drop down and use links for product only
    return (
        <Fragment>
            <div className={'side-nav'}>

                {Object.keys(products).map((product, prodIndex) => {
                    return (
                        <Fragment key={`fragment-${prodIndex}`}>

                            {/* if window width > 1100 class is the one used for desktop, else class is the one used for mobile*/}
                            <div className={window.innerWidth > 1100 ? 'dropdown-div' : 'inline-div'}
                                 key={`dropdown-${prodIndex}`}>
                                <Link key={`link-${prodIndex}`} to={`/${product.toLowerCase()}`}>
                                    {product}
                                </Link>
                            </div>

                            {
                                // This applies for desktop view
                                window.innerWidth > 1100 ?

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

                                    // do not render div with dropdown-content class in case the width is smaller than 1100 px
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
                                'price': products[prod][brand][item]['price'],
                                'quantity': products[prod][brand][item]['quantity'],
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

    // the initial items
    const [prodItems] = useState(prods);

    const [cartItems, setCartItems] = useState([]);
    const [cartCounter, setCartCounter] = useState(0);


    const handleQuantity = e => {

        const {name, value} = e.target;

        for (let i = 0; i < cartItems.length; i++) {
            if (cartItems[i]['item'] === value) {

                // if event.target.name === add, then increment in cart
                //   else decrement from cart
                if (name === 'add') {
                    cartItems[i]['quantity'] += 1;
                    setCartCounter(cartCounter + 1);
                } else if (name === 'subtract') {
                    cartItems[i]['quantity'] -= 1;
                    setCartCounter(cartCounter - 1);
                }
            }

            if (cartItems[i]['quantity'] === 0) {
                const newItems = cartItems.filter(item => item['quantity'] !== 0);

                setCartItems(newItems);
            }
        }

    }


    // Add item to cartItems
    const handleAddToCart = e => {

        const clickedItem = prodItems.filter(product => product['item'] === e.target.value);

        // if the item is already in cart increment quantity and cart counter
        if (cartItems.some(prod => prod['item'] === clickedItem[0]['item'])) {
            for (let i = 0; i < cartItems.length; i++) {

                if (cartItems[i]['item'] === clickedItem[0]['item']) {
                    clickedItem[0]['quantity'] += 1;
                    setCartCounter(cartCounter + 1)
                }
            }
        }

        // if item is not in cart increment quantity and add product to cart items
        else {
            clickedItem[0]['quantity'] += 1;

            const item = clickedItem[0];
            setCartItems([...cartItems, item])
            setCartCounter(cartCounter + 1)
        }
    };


    return (
        <Router>
            <NavigationBar itemsInCart={cartCounter}/>
            <Switch>
                <Route
                    path={'/'}
                    exact
                    render={(props) => <HomePage prodItems={prodItems}/>}
                />

                <Route
                    path={'/cart'}
                    render={(props) => <CartPage
                        cartItems={cartItems}
                        clickQuantity={handleQuantity}
                    />}
                />

                <Route path={'/checkout'} component={CheckoutPage}/>
                <Route path={'/laptops'} component={LaptopsPage}/>

                {/* the following segment of routes is reserved for desktop version. coming soon*/}
                {/* hard coded so i can see them directly as a reminder*/}
                <Route path={'/phones'} component={PhonesPage}/>
                <Route path={'/acer'} component={AcerPage}/>
                <Route path={'/hp'} component={HpPage}/>
                <Route path={'/dell'} component={DellPage}/>
                <Route path={'/iphone'} component={IphonePage}/>
                <Route path={'/cat'} component={CatPage}/>
                <Route path={'/xiaomi'} component={XiaomiPage}/>

                {/* This mapping applies to every single product, properties passed through render prop are the 'prodItems',
                        the 'name of the product item' and the 'add to cart' functionality. mainly to sort the item in the ProductPage component*/}
                {prodItems.map((prod, index) => {
                    return (
                        <Route
                            key={index}
                            path={`/${prod['item'].replace(' ', '_').toLowerCase()}`}
                            render={(props) => <ProductPage
                                prodItems={prodItems}
                                productName={prod['item']}
                                addToCart={handleAddToCart}
                            />}
                        />
                    );
                })}

            </Switch>
        </Router>
    );
}


ReactDOM.render(
    <App/>,
    document.getElementById('root'),
);
