import React, {Fragment} from 'react';
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

    // render side bar consists of a dropdown for each product type (laptops, phones) with links towards the specific page.
    //   every dropdown contains every product link to the specific page
    // if the window width is smaller than 1000px (this goes for mobiles) avoid using drop down and use links for product only
    return (
        <Fragment>
            <div className={'side-nav'}>


                {Object.keys(products).map((product, prodIndex) => {
                    return (
                        <Fragment>

                            {/* if window width > 1000 class is the one used for desktop, else class is the one used for mobile*/}
                            <div className={window.innerWidth > 1000 ? 'dropdown-div' : 'inline-div'} key={prodIndex}>
                                <Link key={prodIndex} to={product.toLowerCase()}>
                                    {product}
                                </Link>
                            </div>

                            {
                                // This applies for desktop view
                                window.innerWidth > 1000 ?

                                    <div className={'dropdown-content'}>
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
    return (
        <Router>
            <NavigationBar/>
            <Switch>
                <Route path={'/'} exact component={HomePage}/>
                <Route path={'/cart'} component={CartPage}/>
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
