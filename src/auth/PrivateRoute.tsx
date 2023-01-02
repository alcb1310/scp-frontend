/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateStatus } from "../api/connection";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const storeData = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    validateStatus({
      token: storeData.token,
      type: storeData.type,
    })
      .then((data) => {
        dispatch({
          type: "users/SetCurrentUser",
          payload: data.data.detail,
        });
      })
      .catch(() => {
        navigate("/");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
}
