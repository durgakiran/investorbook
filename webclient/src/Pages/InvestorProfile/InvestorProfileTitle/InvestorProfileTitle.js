import React from "react";
import { useHistory } from "react-router-dom";
import { Button, makeStyles } from "@material-ui/core";
import back from "./back.svg";
import Amount from "../../../Components/Amount/Amount";
import styles from "./InvestorProfileTitle.module.css";
import editIcon from "./edit-icon.svg";
import deleteIcon from "./delete-icon.svg";
import Image from "../../../Components/Image/Image";

const useStyles = makeStyles({
    button: {
        '& .MuiButton-label': {
            fontWeight: 700
        }
    }
})

export default function InvestorProfileTitle({
  id,
  name,
  image,
  amount,
}) {
  
    const history = useHistory();
    const classes = useStyles();



  return (
    <div className={styles["investor-profile"]}>
      <Button onClick={() => history.goBack()}>
        <img src={back} className={styles["back-icon"]} alt="previous page" />
      </Button>
      <Image alt={name} src={image} />
      <div className={styles.investor}>
        <div className={styles["investor-name"]}>{name}</div>
        <div className={styles.amount}>
          total Amount Invested
          <Amount amount={amount} />
        </div>
      </div>
      <div className={styles["occ-space"]}></div>
      <div className={styles["profile-actions"]}>
        <Button className={classes.button}>
          <img className={styles["icon"]} src={editIcon} alt="edit profile" />
          Edit Name
        </Button>
        <Button className={classes.button}>
          <img className={styles["icon"]} src={deleteIcon} alt="delete profile" />
          Remove Investor
        </Button>
      </div>
    </div>
  );
}
