import React from 'react';
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


const HomePage = () => {
    const prodItems = [];

    // compose a list of every product as a json which contains the product and details about it.
    //   this is needed to render the homepage with specific products
    for (let prod in products) {
        if (products.hasOwnProperty(prod)) {
            for (let brand in products[prod]) {
                if (products[prod].hasOwnProperty(brand)) {
                    for (let item in products[prod][brand]) {
                        if (products[prod][brand].hasOwnProperty(item)) {
                            for (let itemType in products[prod][brand][item]) {
                                if (products[prod][brand][item].hasOwnProperty(itemType)) {
                                    prodItems.push({
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
        }
    }


    // TODO - implemented in the future
    // make a list for every electronic type
    const phones = prodItems.filter(key => key['product'] === 'Phones')
    const laptops = prodItems.filter(key => key['product'] === 'Laptops')


    return (
        <div>
            <RenderSideBar/>
            <div className={'main'}>
                <h2>Home Page</h2>
            </div>
        </div>
    )
}

const RenderSideBar = () => {

    // render side bar consists of a drop down for each product type (laptops, phones).
    //   every dropdown contains every product link to the specific page
    return (
        <div>
            <div className='sidenav'>
                {Object.keys(products).map((product, prodIndex) => {
                    return (
                        <div>
                            <div className={'dropdown-div'} key={prodIndex}>{product}</div>
                            <div className={'dropdown-content'}>
                                {Object.keys(products[product]).map((prodType, prodTypeIndex) => {
                                    return (
                                        <Link key={prodTypeIndex} to={prodType.toLowerCase()}>
                                            <li key={prodTypeIndex} value={prodType}>{prodType}</li>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

const App = () => {
    return (
        <Router>
            <NavigationBar/>
            <Switch>
                <Route path={'/'} exact component={HomePage}/>
                <Route path={'/cart'} component={CartPage}/>
                <Route path={'/checkout'} component={CheckoutPage}/>
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
