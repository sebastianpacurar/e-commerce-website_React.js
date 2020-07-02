import React, {Fragment, memo} from "react";
import {Link} from "react-router-dom";
import RenderProductsBar from "./RenderProductsBar";

const HomePage = ({prodItems}) => {

    // scroll to top of the page in case the scroll is too low on the page
    if (window.pageYOffset > 800) {
        window.scrollTo(0, 0);
    }

    // shuffle the array using Fisher-Yates algorithm
    const shuffleItems = (arr) => {
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.trunc(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]]
        }
    }

    shuffleItems(prodItems);

    return (
        <Fragment>
            <RenderProductsBar products={prodItems}/>

            {/*this consists of cards of products in which every product has a name, photo, price, and Add To Cart button*/}
            <div className={'main'}>
                <h1>All products</h1>

                {prodItems.map((prod, index) => {
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
        </Fragment>
    )
}

// using React.memo HOC to prevent the items to reshuffle if clicking home page link more than once in a row
// check the length of products. this way is equivalent to shouldComponentUpdate related to classes
export default memo(HomePage, (prevProps, nextProps) => nextProps.prodItems.length === prevProps.prodItems.length);