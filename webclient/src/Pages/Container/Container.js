import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Title from '../../Components/Title/Title';
import InvestorProfile from '../Investors/InvestorProfile/InvestorProfile';
import TableContainer from '../TableContainer/TableContainer';
import  styles from './Container.module.css'

export default function Container() {
    return (
        <div className={styles.container}>
            <Title />
            
            <Switch>
                <Route path="/:id" children={<InvestorProfile />} />
                <Route path="/" children={<TableContainer />} />
            </Switch>
        </div>
    )
}
