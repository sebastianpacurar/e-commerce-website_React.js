import React, {Fragment} from "react";

const ProductPage = ({prodItems, productName, addToCart}) => {

    // scroll to top of the page in case the scroll is too low on the page
    if (window.pageYOffset > 800) {
        window.scrollTo(0, 0);
    }

    // filter the prodItems to get the clicked product
    const prod = prodItems.filter(prod => prod['item'] === productName);

    return (
        <Fragment>
            <div className={'cart-checkout-product'}>
                <h3>{`${prod[0]['brand']} - ${prod[0]['item']}`}</h3>
                <div
                    className={'card'}
                    style={{boxShadow: '0px 0px 0px -200px rgba(255,255,255,1)'}}>

                    <img
                        className={'card-image'}
                        src={prod[0]['image']}
                        alt={`${prod[0]['brand']} - ${prod[0]['item']}`}
                    />

                    <button value={prod[0]['item']} onClick={addToCart}>
                        Add To Cart
                    </button>

                    <p
                        className={'price'}
                        style={{fontSize: '35px', color: 'purple'}}
                    >{`$${prod[0]['price']}`}</p>

                    <table>
                        <thead>
                        <tr>
                            <th>Specifications</th>
                            <th>Descriptions</th>
                        </tr>
                        </thead>
                        <tbody>

                        {Object.entries(prod[0]['details']).map(([key, value], index) => {
                            return (
                                <tr key={`tr-${index}`}>
                                    <td>{key}</td>
                                    <td>{value}</td>
                                </tr>
                            );
                        })}

                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    );
}

export default ProductPage;