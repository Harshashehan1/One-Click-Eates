import React from 'react'
import Image from 'next/image'
import styles from '../../styles/Admin.module.css'
import axios from 'axios'
import { useState } from 'react'
import AddButton from '@/components/AddButton';
import Add from '@/components/Add';

const Index = ({orders,products}) => {

    const [pizzaList, setPizzaList] = useState(products);
    const [orderList, setorderList] = useState(orders);
    const status = ["preparing","On the way","delivered"];
    const [close, setClose] = useState(true);

    const handleDelete = async (id) => {
        console.log(id);
        try {
            const res = await axios.delete(process.env.BASE_URL +"/api/products/" + id);
            setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
            window.location.reload();
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }

    const handleStatus = async (id) => {

        const item = orderList.filter(order => order._id === id)[0];
        const currentStatus = item.status;

        try {
            const res = await axios.put(process.env.BASE_URL + "/api/orders/" + id, {
                status : currentStatus + 1 ,
            });
            setorderList([ res.data,
                ...orderList.filter((order) => order._id !== id ),
            ]);
            // ? res.data : order)));
            // console.log(res)
        } catch (error) {
            console.log(err);
        }
    };
  return (
    <div className={styles.container}>
        <div> <AddButton setClose={setClose}/> </div>
        {!close && <Add setClose={setClose}/>} 
        <div className={styles.item}>
            <h1 className={styles.title}>Products</h1>
            <table className={styles.table}>
                <tbody>
                    <tr className={styles.trTitle}>
                        <th className={styles.th}>Image</th>
                        <th className={styles.th}>ID</th>
                        <th className={styles.th}>Title</th>
                        <th className={styles.th}>Price</th>
                        <th className={styles.th}>Actions</th>
                    </tr>
                </  tbody>
                {products.map((product) => (
                <tbody key={product._id}>
                    <tr className={styles.trTitle}>
                        <td className={styles.td}>
                            <Image src = {product.img} width={50} height={50} objectFit="cover" />
                        </td>
                        <td className={styles.td}>{product._id.slice(0,5)}...</td>
                        <td className={styles.td}>{product.title}</td>
                        <td className={styles.td}>Rs.{product.prices[0]}</td>
                        <td className={styles.td}>
                            <button className={styles.btn}>Edit</button>
                            <button className={styles.btn} onClick={()=>handleDelete(product._id)}>Delete</button>
                        </td>
                    </tr>
                </  tbody>
                ))}
            </table>
        </div>
        
        <div className={styles.item}>
        <h1 className={styles.title}>Orders</h1>
            <table className={styles.table}>
                <tbody>
                    <tr className={styles.trTitle}>
                        <th className={styles.th}>ID</th>
                        <th className={styles.th}>Customer</th>
                        <th className={styles.th}>Total</th>
                        <th className={styles.th}>Payment</th>
                        <th className={styles.th}>Actions</th>
                    </tr>
                </  tbody>
                {orderList.map(order=>(
                <tbody key={order._id}>
                    <tr className={styles.trTitle}>
                        <td className={styles.td}>{order._id.slice(0,5)}...</td>
                        <td className={styles.td}>{order.customer}</td>
                        <td className={styles.td}>Rs.{order.total}</td>
                        <td className={styles.td}>{order.method === 0 ? (<span>cash</span>) : (<span>paid</span>)}</td>
                        <td className={styles.td}>{status[order.status]}</td>
                        <td className={styles.td}>
                            <button className={styles.btn} onClick={()=>handleStatus(order._id)}>NextStage</button>
                        </td>
                    </tr>
                </  tbody>
                ))}
            </table>
        </div>         
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
    const myCookie =ctx.req?.cookies || ""; 

    if(myCookie.token !== process.env.TOKEN){
        return {
            redirect: {
                destination: "/admin/login",
                permanent: false,
            },
        };
    }
    const productRes = await axios.get(process.env.BASE_URL + '/api/products') 
    const orderRes = await axios.get(process.env.BASE_URL + '/api/orders')

    return {
        props: {
            orders: orderRes.data,
            products: productRes.data
        }
    };
};

export default Index