import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

type SMButtonProps = {
  btnType: any;
  btnValue: any;
  onClick?: any;
};
export default function SMButton(props: SMButtonProps) {
  return (
    <>
      <Button variant="contained" type={props.btnType} onClick={props.onClick}>
        {props.btnValue}
      </Button>
    </>
  );
}
