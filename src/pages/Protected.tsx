import { useNavigate } from "react-router-dom";
import { fbAuth } from "../config/firebase/firebase-methods";
import { useEffect, useState } from "react";
export default function Protected({ Screen }: any) {
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  let checkAuth = () => {
    //Checking Authentication
    setLoader(true);
    fbAuth()
      .then((res) => {
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        navigate("/login");
      });
  };
  useEffect(() => {
    checkAuth();
  }, []);

  return loader ? (
    <>
      <h1>Loading...</h1>
    </>
  ) : (
    <Screen />
  );
}
