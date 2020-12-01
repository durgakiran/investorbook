import React from "react";
import { Snackbar, Aler } from "@material-ui/core";

export default function SnackBarElement({
  open,
  severity,
  duration,
  message,
  handleClose,
}) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
      key={'topcenter'}
      message={message}
    >
    </Snackbar>
  );
}
