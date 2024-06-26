import Image from "next/image";
import styles from "../styles/Featured.module.css";
import { UilArrowLeft } from '@iconscout/react-unicons';
import { UilArrowRight } from '@iconscout/react-unicons';
import { useState } from "react";

const Featured = () => {
    const [index, setIndex] = useState(0);
    const images = [
        "/img/pasta.jpg",
        "/img/seafoodnew1.jpg",
        "/img/burger.jpg",
    ];

    const handleArrow = (direction) => {
        if (direction === "l") {
            setIndex(index !== 0 ? index - 1 : 2);
        }
        if (direction === "r") {
            setIndex(index !== 2 ? index + 1 : 0);
        }
    };

    const imageTranslate = {
        transform: `translateX(${-100 * index}vw)`
    };

    return (
        <div className={styles.container}>
            <div className={styles.arrowContainer} style={{ left: 0 }} onClick={() => handleArrow("l")}>
                <UilArrowLeft color="white" size="90" layout="fill" objectFit="contain" />
            </div>

            <div className={styles.wrapper} style={imageTranslate}>
                {images.map((img, i) => (
                    <div className={styles.imgContainer} key={i}>
                        <Image src={img} alt="" layout="fill" objectFit="contain" />
                    </div>
                ))}
            </div>
            
            <div className={styles.arrowContainer} style={{ right: 0 }} onClick={() => handleArrow("r")}>
                <UilArrowRight color="white" size="90" objectFit="contain" layout="fill" />
            </div>
        </div>
    );
}

export default Featured;
