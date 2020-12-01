import React from "react";
import {
  Dialog,
  DialogActions,
  Button,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import InputField from "../../../Components/InputField/InputField";

export default function AddInvestment({ open }) {
  return (
    <Dialog fullWidth={true} open={open} >
      <DialogTitle>
        Add Investment
        <div>Please Enter the Details of the Investment</div>
      </DialogTitle>
      <DialogContent>
        <InputField placeholder="Select Company" />
        <InputField placeholder="Investment Amount" />
      </DialogContent>
      <DialogActions>
        <Button>Cancel</Button>
        <Button>Add Investment</Button>
      </DialogActions>
    </Dialog>
  );
}
