import React, {Fragment} from "react";
import {products} from "../utils/products";
import {Link} from "react-router-dom";

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

export default RenderProductsBar;