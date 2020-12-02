import React from 'react';
import logo from './Company-logo.png';
import styles from './Title.module.css';

export default function Title() {
    return (
        <div className={styles.title}>
            <img src={logo} alt="company logo" />
        </div>
    )
}

