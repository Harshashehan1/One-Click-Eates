import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Featured from '../components/Featured';
import ProductList from '@/components/ProductList';
import axios from 'axios';
import Add from '@/components/Add';
import AddButton from '@/components/AddButton';
import { useState } from 'react';

export default function Home({productList, admin}) {
  const [close, setClose] = useState(true);
  return (
    <div className={styles.container}>
      <Head>
        <title>One Click Eats</title>
        <meta name="description" content="Place your order with One Click" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured/>
      {admin && <AddButton setClose={setClose}/> }
      <ProductList productList = {productList}/>
      {!close && <Add setClose={setClose}/>}
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if(myCookie.token === process.env.TOKEN){
    admin = true;
  }
  const res = await axios.get(process.env.BASE_URL + "/api/products");
  return {
    props: {
      productList: res.data,
      admin,
    },
  };

}
