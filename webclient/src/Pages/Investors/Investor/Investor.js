import React from 'react';
import { Link } from 'react-router-dom'; 
import Image from '../../../Components/Image/Image';
import styles from './Investor.module.css';

export default function Investor({ id, photo_thumbnail, name }) {
    return (
        <div className={styles.investor}>
            <Link to={'/' + id}>
                {
                    photo_thumbnail && <Image alt={name} src={photo_thumbnail} />
                }
                <p className={styles.name}>{name}</p>
            </Link>
        </div>
    )
}
