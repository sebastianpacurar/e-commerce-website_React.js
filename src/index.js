import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {products} from "./utils/products";

import NavigationBar from "./components/NavigationBar";
import HomePage from "./components/HomePage";
import CartPage from "./components/CartPage";
import CheckoutPage from "./components/CheckoutPage";
import ProductsTypePage from "./components/ProductsTypePage";
import ProductPage from "./components/ProductPage";

import './index.css';


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


    // the initial items
    const [prodItems] = useState(prods);

    const [cartItems, setCartItems] = useState([]);
    const [cartCounter, setCartCounter] = useState(0);


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
                    render={(props) => <HomePage {...props} prodItems={prodItems}/>}
                />

                <Route
                    path={'/cart'}
                    render={(props) => <CartPage
                        {...props}
                        cartItems={cartItems}
                        clickQuantity={handleQuantity}
                    />}
                />

                <Route
                    path={'/checkout'}
                    render={(props) => <CheckoutPage
                        {...props}
                        cartItems={cartItems}
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