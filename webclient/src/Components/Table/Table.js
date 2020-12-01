import React from "react";
import styles from './Table.module.css';


export default function Table({ columns, data, children }) {

  return (
    <div className={styles.table__container}>
      <table>
        <thead>
          <tr>
            {columns.map((value) => {
              return <th key={value.id} className={styles.column}>{value.column}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>
    </div>
  );
}
