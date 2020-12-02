import React, { useState } from "react";
import placeholder from "../../plceholderImage.jpg";
import styles from "./Image.module.css";

export default function Image({ src, alt }) {
  const [error, setError] = useState(false);
  return (
    <>
      {!error ? (
        <img src={src} alt={alt}  className={styles.image} onError={() => setError(true)} />
      ) : (
        <img src={placeholder} className={styles.image} alt={alt} />
      )}
    </>
  );
}
