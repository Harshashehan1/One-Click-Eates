  import styles from "../styles/Navbar.module.css";
  import Image from "next/image";
  import { UilPhone,UilShoppingCart } from '@iconscout/react-unicons';
  import { useSelector } from "react-redux";
  import Link from "next/link";
  import cookie from 'cookie'
  import React, { useEffect, useState } from 'react';


const Navbar = () => {

  const [token, setToken] = useState(null);

  useEffect(() => {
    // Parse the cookie to get the token value
    const cookies = cookie.parse(document.cookie);
    const tokenFromCookie = cookies.token;
    
    // Set the token in state
    setToken(tokenFromCookie);
  }, []);

  function removeCookie(cookieName) {
    // Set the cookie's expiration date to a past date
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
  
  
  console.log(token)
 


const handleLogout = () => {
  removeCookie('token');
  // Refresh the page
  window.location.reload();

  };

  const quantity =useSelector((state)=> state.cart.quantity);
  return (
    <div className={styles.container}>
      <div className={styles.item}>
      <div className={styles.callButton}>
      <UilPhone size="30" color="white" />      
      </div>
      <div className={styles.texts}>
        <div className={styles.text}>ORDER NOW!</div>
        <div className={styles.text}>94 721349853</div>
      </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <Link href="/" passHref>
          <li className={styles.listItem}>HomePage</li>
          </Link> 
          <Link href="/Product-card" passHref>
          <li className={styles.listItem}>Menu</li></Link>
          <Link href="/" passHref><Image src="/img/Lars Peeters.jpg" alt="logo" width="150" height="100" /></Link>
          <Link href="/Events" passHref><li className={styles.listItem}>Events</li></Link>
          <Link href="/Contact" passHref><li className={styles.listItem}>Contact</li></Link>
          
        </ul>
      </div>
      <Link href= "/cart" passHref>
      <div className={styles.item}>
        {token  ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <div className={styles.cart}> 
              <UilShoppingCart size="37" color="black" />
              <div className={styles.counter}>{quantity}</div>
            </div>
          </>
        )}
      </div>

      </Link>
    </div>
  )
}

export default Navbar