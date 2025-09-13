
import { useContext } from 'react';
import { ShopContext } from '../components/Context/ShopContext';
import Item from '../components/Item/Item';

export default function ShopCategory(props) {
    const { all_product } = useContext(ShopContext);
    return (
        <div className="container-fluid p-0">
            {/* Banner section */}
            <div className="position-relative text-center">
                <img
                    src={props.banner}
                    alt={props.category}
                    className="img-fluid w-100"
                    style={{ objectFit: "cover" }}
                />
            </div>
            <div className="main">
                <h1 className='text-center m-3 text-uppercase'>our collection</h1>
                <div className='main-card'>
                    {all_product.map((item, i) => {

                        if (props.category === item.category) {
                            return (
                                <Item key={i} id={item.id} name={item.name} old_price={item.old_price} priceAfter={item.new_price} image={item.image} />
                            )
                        }

                    })}
                </div>
            </div>
        </div>
    );
}
