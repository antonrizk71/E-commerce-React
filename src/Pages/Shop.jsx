import React from 'react'
import Hero from '../components/Hero/Hero'
import Item from '../components/Item/Item'
import data_product from '../components/Assets/data'
import new_collections from '../components/Assets/new_collections'
export default function Shop() {
    return (
        <>
            <Hero />
            {/* { image, name, price, priceAfter} */}
            <div className="main">
                <h1 className='text-center m-3'>POPULAR IN WOMEN</h1>
                <div className='main-card'>
                    {data_product.map((item, i) => {
                        return (
                            <Item key={i} id={item.id} name={item.name} old_price={item.old_price} priceAfter={item.new_price} image={item.image} />
                        )

                    })}
                </div>
            </div>


            <div className="main">
                <h1 className='text-center m-3'>NEW COLLECTIONS</h1>
                <div className='main-card'>
                    {new_collections.map((item, i) => {
                        return (
                            <Item key={i} id={item.id} name={item.name} old_price={item.old_price} priceAfter={item.new_price} image={item.image} />
                        )

                    })}
                </div>
            </div>



        </>
    )
}
