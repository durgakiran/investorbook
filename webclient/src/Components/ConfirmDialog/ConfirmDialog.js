import React from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import { useStyles } from "../../Utils/DialogStyles";
import { useButtonStyles, useButtonStyles2 } from "../../Utils/ButtonStyles";

export function ConfirmDialog({ title, open, closeDialog, confirm }) {
  const classes = useStyles();
  const buttonClasses = useButtonStyles();
  const buttonClasses2 = useButtonStyles2();

  return (
    <Dialog open={open}>
      <DialogTitle className={classes.root}>{title}</DialogTitle>
      <DialogActions>
        <Button
          type="button"
          className={buttonClasses2.root}
          onClick={closeDialog}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          className={buttonClasses.root}
          color="primary"
          onClick={() => confirm()}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
