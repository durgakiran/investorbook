import { Tab, Tabs, withStyles } from "@material-ui/core";
import React from "react";
import Companies from "../Companies/Companies";
import Investors from '../Investors/Investors';
import styles from './TableContainer.module.css';

function TabPanel(props) {
  const {  value, index, children } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        children
      )}
    </div>
  );    
}

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}


const StyledTabs =  withStyles({
  root: {
    borderBottom: '1px solid #000000;',
    textAlign: "left",
    '& .wrapper': {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        '& .MuiTabItem-labelGroup': {
          minWidth: 0,
        },
        '& .MuiTabItem-label': {
          display: 'flex',
          alignItems: 'center',
        }
    }
  },
  indicator: {
    backgroundColor: '#000000'
  }
})(Tabs);


export default function TableContainer() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={styles.table__container}>
      <StyledTabs value={value} onChange={handleChange} aria-label="investors tabs">
        <Tab label="Investors" {...a11yProps(0)} />
        <Tab label="Companies" {...a11yProps(1)} />
      </StyledTabs>
      <TabPanel value={value} index={0}>
        <Investors />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Companies />
      </TabPanel>
    </div>
  );
}
