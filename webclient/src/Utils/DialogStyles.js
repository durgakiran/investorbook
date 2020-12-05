import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  root: {
    padding: "28px 22px 18px 32px",
    "& .MuiTypography-h6": {
      fontWeight: 700,
      fontSize: "24px",
      lineHeight: "32px",
      color: "#000000",
    },
  },
});

export const useDialogStyles = makeStyles({
  root: {
    padding: "28px 22px 18px 32px",
  },
});
