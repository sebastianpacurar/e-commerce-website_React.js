import React, {Fragment} from "react";
import {Link} from "react-router-dom";


const CartPage = ({cartItems, clickQuantity}) => {

    const prices = [];
    for (let i = 0; i < cartItems.length; i++) {
        prices.push((cartItems[i]['price'] * cartItems[i]['quantity']).toFixed(2))
    }

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
                            <p className={'price'}>Total Cost:
                                ${prices.reduce((acc, currVal) => acc + Number(currVal), 0).toFixed(2)}</p>

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

export default CartPage;