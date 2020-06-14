import React from "react";
import {Link, useHistory} from "react-router-dom";

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

export default NavigationBar;