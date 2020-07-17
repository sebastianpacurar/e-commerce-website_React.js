import React, {useEffect, useState} from 'react';

// router related
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// redux related
import {useSelector, useDispatch} from 'react-redux';
import {decrement, increment} from "../redux";

// components
import NavigationBar from "./NavigationBar";
import HomePage from "./HomePage";
import CartPage from "./CartPage";
import CheckoutPage from "./CheckoutPage";
import ProductsTypePage from "./ProductsTypePage";
import ProductPage from "./ProductPage";

import '../index.css';


const App = () => {

    // async function used to grab the products from the API
    const loadData = async () => {
        const response = await fetch('http://localhost:3001');

        const data = await response.json();
        console.log(data);
        return data;
    }

    useEffect(() => {
        loadData()
            .then(res => setProdItems(res))
            .catch(rej => console.log({message: rej}));
    }, []);


    const cartCounter = useSelector(state => state.cartIcon)
    const dispatch = useDispatch();


    // the initial items
    const [prodItems, setProdItems] = useState([]);

    // cart items
    const [cartItems, setCartItems] = useState([]);


    // handle quantity for cart items
    const handleQuantity = e => {

        const {name, value} = e.target;

        for (let i = 0; i < cartItems.length; i++) {
            if (cartItems[i]['item'] === value) {

                // if event.target.name === add, then increment in cart
                //   else decrement from cart
                if (name === 'add') {
                    cartItems[i]['quantity'] += 1;
                    dispatch(increment());
                } else if (name === 'subtract') {
                    cartItems[i]['quantity'] -= 1;
                    dispatch(decrement());
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
                    dispatch(increment())
                }
            }
        }

        // if item is not in cart increment quantity and add product to cart items
        else {
            clickedItem[0]['quantity'] += 1;

            const item = clickedItem[0];
            setCartItems([...cartItems, item])
            dispatch(increment());
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

export default App;