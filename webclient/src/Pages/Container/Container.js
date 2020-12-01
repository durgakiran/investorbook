import React from 'react';
import { Switch, Route } from 'react-router-dom';
import InvestorProfile from '../Investors/InvestorProfile/InvestorProfile';
import TableContainer from '../TableContainer/TableContainer';


export default function Container() {
    return (
        <div className="container">
            <Switch>
                <Route path="/:id" children={<InvestorProfile />} />
                <Route path="/" children={<TableContainer />} />
            </Switch>
        </div>
    )
}
