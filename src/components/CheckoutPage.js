import React, {Fragment} from "react";

const CheckoutPage = ({cartItems}) => {

    const prices = [];
    for (let i = 0; i < cartItems.length; i++) {
        prices.push((cartItems[i]['price'] * cartItems[i]['quantity']).toFixed(2))
    }

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
                            ${prices.reduce((acc, currVal) => acc + Number(currVal), 0).toFixed(2)}
                        </span></p>

                    </div>
                </div>

                <button
                    className={'buy-button'}
                    onClick={() => alert("Redirect to Receipt Page")}
                >
                    Buy
                </button>
            </div>
        </Fragment>
    );
}

export default CheckoutPage;