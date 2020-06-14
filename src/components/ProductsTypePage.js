import React from "react";
import {Link} from "react-router-dom";
import RenderProductsBar from "./RenderProductsBar";

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

export default ProductsTypePage;