import React from 'react'
import styles from '../styles/ProductList.module.css'

const ProductList = ({productList}) => {
  return (
      <div className={styles.container}>
          <h1 className={styles.title}>One Click Eats</h1>
          <p className={styles.desc}>
          Get your favorite food from one Click
         try One Click Eats
          </p>
          
      </div>
  )
}

export default ProductList