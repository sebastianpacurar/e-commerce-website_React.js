import React, {Fragment} from "react";
import {Link} from "react-router-dom";

const RenderProductsBar = ({products}) => {

    // obtain a list of every product type, and sort the items alphabetically
    const sortedProductTypes = [...new Set(products.map(item => (item['product'])))].sort((a, b) => a.localeCompare(b));

    // products bar is composed of links to ProductsType Pages such as Headphones, Laptops and Phones
    return (
        <Fragment>
            <div className={'side-nav'}>

                {sortedProductTypes.map((product, prodIndex) => {
                    return (
                        <Fragment key={`fragment-${prodIndex}`}>

                            <div className={'inline-div'}
                                 key={`dropdown-${prodIndex}`}>

                                <Link key={`link-${prodIndex}`} to={`/${product.toLowerCase()}`}>
                                    {product}
                                </Link>
                            </div>
                        </Fragment>
                    )
                })}
            </div>
        </Fragment>
    );
}

export default RenderProductsBar;