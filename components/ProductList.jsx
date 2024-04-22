import React from 'react'
import styles from '../styles/ProductList.module.css'
import ProductCard from './ProductCard'

const ProductList = ({productList}) => {
  return (
      <div className={styles.container}>
          <h1 className={styles.title}>One Click Eats</h1>
          <p className={styles.desc}>
         Get your favorite food from one Click
         try One Click Eats
          </p>
          <div className={styles.wrapper}>
            {productList.map((product) => (
            <ProductCard key ={product._id} product={product}/>
            ))}
          </div>
      </div>
  )
}

export default ProductList