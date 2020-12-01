import React from 'react';
import { Link } from 'react-router-dom'; 
import styles from './Investor.module.css';

export default function Investor({ id, photo_thumbnail, name }) {
    return (
        <div className={styles.investor}>
            <Link to={'/' + id}>
                {
                    photo_thumbnail && <img src={photo_thumbnail} className={styles.image} alt={`${name}`} />
                }
                <p className={styles.name}>{name}</p>
            </Link>
        </div>
    )
}
