import React from 'react';


export default function Amount({ amount }) {
    return (
        <div>
            {amount && '$' + amount.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
        </div>
    )
}
