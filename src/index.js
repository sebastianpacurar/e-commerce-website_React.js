import React, {Fragment, useState} from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter as Router, Link, Route, Switch, useHistory} from 'react-router-dom';
import {products} from "./utils/products";
import './index.css';


const NavigationBar = ({itemsInCart}) => {

    const history = useHistory();

    return (
        <nav>
            <ul className={'nav-list'}>

                <li id={'go-back-button-item'} style={{borderRight: 'solid indigo 2px'}}>
                    <button onClick={() => history.goBack()}> Go Back</button>
                </li>

                <Link to={'/'}>
                    <li>Home</li>
                </Link>

                <Link to={'/cart'}>
                    <li>Cart ({itemsInCart})</li>
                </Link>

                {/* disable link to checkout if there are no items in cart*/}
                <Link to={'/checkout'} style={itemsInCart < 1 ? {pointerEvents: 'none'} : null}>
                    <li style={itemsInCart < 1 ? {color: 'grey'} : null}>Checkout</li>
                </Link>

            </ul>
        </nav>
    );
}

const CartPage = ({cartItems, clickQuantity, totalCost}) => {

    return (
        <Fragment>


            {cartItems.length > 0

                // if cart is not empty, render cart page
                ?


                <div className={'cart-checkout-product'}>
                    <h1>Cart Page</h1>
                    <div className={'item-row'}>

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
                            <p className={'price'}>Total Cost: {totalCost}</p>

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

                        <div className={'card'}>
                            <Link to={'/checkout'}>
                                Proceed To Checkout
                            </Link>
                        </div>

                        <button id={'scroll-to-top'} onClick={() => window.scroll({top: 0, behavior: 'smooth'})}>
                            Top
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

            <div className={'card'} style={{
                boxShadow: '0px 0px 0px -200px rgba(255,255,255,1)',
            }}>
                <Link className={'link'} to={'/'}>
                    {cartItems.length < 1 ? 'Go Shopping' : 'Continue Shopping'}
                </Link>
            </div>
        </Fragment>
    );
}


const CheckoutPage = ({cartItems, totalCost}) => {

    return (
        <Fragment>
            <div className={'cart-checkout-product'}>
                <h1>Checkout Page</h1>

                <div className={'checkout-col'}>
                    <div className={'checkout-container'}>
                        <p>Cart <span className={'price'}><span>Cost</span> </span></p>

                        {cartItems.map((prod, index) => {
                            return (
                                <p key={`checkout-item-${index}`}>
                                    {prod['quantity']} x {prod['item']}
                                    <span className={'price'}>${(prod['quantity'] * prod['price']).toFixed(2)}</span>
                                </p>
                            )
                        })}

                        <hr/>

                        <p style={{color: 'red'}}
                        >Total<span
                            className={'price'} style={{color: 'red'}}
                        >
                            ${totalCost}
                        </span></p>

                    </div>
                </div>

                <button
                    className={'buy-button'}
                    onClick={() => alert("Thank you for visiting my e-com website!\nCreated By Sebastian Pacurar")}
                >
                    Buy
                </button>
            </div>
        </Fragment>
    );
}


const ProductsTypePage = ({prodItems, productType}) => {

    // scroll to top of the page in case the scroll is too low on the page
    if (window.pageYOffset > 800) {
        window.scrollTo(0, 0);
    }

    const filteredItems = prodItems.filter(key => key['product'] === productType)

    return (
        <div>
            <RenderProductsBar/>

            {/*this consists of cards of products in which every product has a name, photo, price, and Add To Cart button*/}
            <div className={'main'}>
                <h1>{productType}</h1>

                {filteredItems.map((prod, index) => {
                    return (
                        <div className={'card'} key={index}>

                            <img
                                className={'card-image'}
                                src={prod['image']}
                                alt={`${prod['brand']} - ${prod['item']}`}
                            />
                            <h2>{prod['brand']} - {prod['item']}</h2>
                            <p className={'price'}>{`$${prod['price']}`}</p>

                            <Link
                                to={`/${prod['item'].replace(' ', '_').toLowerCase()}`}
                                value={prod['item']}

                            >
                                Visit Product
                            </Link>

                        </div>
                    )
                })}
                <button id={'scroll-to-top'} onClick={() => window.scroll({top: 0, behavior: 'smooth'})}>
                    Top
                </button>
            </div>
        </div>
    )
}


const ProductPage = ({prodItems, productName, addToCart}) => {


    // scroll to top of the page in case the scroll is too low on the page
    if (window.pageYOffset > 800) {
        window.scrollTo(0, 0);
    }

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

    // scroll to top of the page in case the scroll is too low on the page
    if (window.pageYOffset > 800) {
        window.scrollTo(0, 0);
    }

    return (
        <Fragment>
            <RenderProductsBar/>

            {/*this consists of cards of products in which every product has a name, photo, price, and Add To Cart button*/}
            <div className={'main'}>
                <h1>All products</h1>

                {prodItems.map((prod, index) => {
                    return (
                        <div className={'card'} key={index}>

                            <img
                                className={'card-image'}
                                src={prod['image']}
                                alt={`${prod['brand']} - ${prod['item']}`}
                            />
                            <h2>{prod['brand']} - {prod['item']}</h2>
                            <p className={'price'}>{`$${prod['price']}`}</p>

                            <Link
                                to={`/${prod['item'].replace(' ', '_').toLowerCase()}`}
                                value={prod['item']}

                            >
                                Visit Product
                            </Link>

                        </div>
                    )
                })}
                <button id={'scroll-to-top'} onClick={() => window.scroll({top: 0, behavior: 'smooth'})}>
                    Top
                </button>
            </div>
        </Fragment>
    )
}

const RenderProductsBar = () => {

    // render side bar consists of a dropdown for each product type (laptops, phones, headphones) with links towards the specific page.
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

    const prices = [];
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


    // the initial items
    const [prodItems] = useState(prods);

    const [cartItems, setCartItems] = useState([]);
    const [cartCounter, setCartCounter] = useState(0);
    const [totalCost, setTotalCost] = useState(0);


    // handle quantity for cart items
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

        // calculate total price
        for (let i = 0; i < cartItems.length; i++) {
            prices.push((cartItems[i]['price'] * cartItems[i]['quantity']).toFixed(2));

        }
        setTotalCost(prices.reduce((acc, currVal) => acc + Number(currVal), 0));
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

        // calculate total price
        if (cartItems.length < 1) {
            prices.push(clickedItem[0]['price']);
        } else {
            for (let i = 0; i < cartItems.length; i++) {
                prices.push((cartItems[i]['price'] * cartItems[i]['quantity']).toFixed(2));

            }
        }
        setTotalCost(prices.reduce((acc, currVal) => acc + Number(currVal), 0));
    };


    return (
        <Router>
            <NavigationBar itemsInCart={cartCounter}/>
            <Switch>
                <Route
                    path={'/'}
                    exact
                    render={(props) => <HomePage {...props} prodItems={prodItems}/>}
                />

                <Route
                    path={'/cart'}
                    render={(props) => <CartPage
                        {...props}
                        cartItems={cartItems}
                        totalCost={totalCost}
                        clickQuantity={handleQuantity}
                    />}
                />

                <Route
                    path={'/checkout'}
                    render={(props) => <CheckoutPage
                        {...props}
                        cartItems={cartItems}
                        totalCost={totalCost}
                    />}
                />


                {/* The following segment refers to every product type, such as laptops, phones, etc*/}
                {prodItems.map((prod, index) => {
                    return (
                        <Route
                            key={index}
                            path={`/${prod['product'].toLowerCase()}`}
                            render={(props) => <ProductsTypePage
                                {...props}
                                prodItems={prodItems}
                                productType={prod['product']}
                                addToCart={handleAddToCart}
                            />}
                        />
                    );
                })}

                {/* This mapping applies to every single product, properties passed through render prop are the 'prodItems',
                        the 'name of the product item' and the 'add to cart' functionality. mainly to sort the item in the ProductPage component*/}
                {prodItems.map((prod, index) => {
                    return (
                        <Route
                            key={index}
                            path={`/${prod['item'].replace(' ', '_').toLowerCase()}`}
                            render={(props) => <ProductPage
                                props={props}
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