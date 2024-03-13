import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./router/router";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loggedInUser } from "./features/auth/authApiSlice";
import { useEffect } from "react";
import {
  getUsers,
  setMessageEmpty as userMessageEmpty,
} from "./features/users/usersSlice";
import {
  setMessageEmpty as authMessageEmpty,
  getAuthData,
} from "./features/auth/authSlice";
import {
  setMessageEmpty as donarMessageEmpty,
  getDonars,
} from "./features/donars/donarsSlice";

function App() {
  const dispatch = useDispatch();

  const { message: userMessage, error: userError } = useSelector(getUsers);
  const { message: authMessage, error: authError } = useSelector(getAuthData);
  const { message: donarMessage, error: donarError } = useSelector(getDonars);

  useEffect(() => {
    dispatch(loggedInUser());
  }, [dispatch]);

  // message
  const message = userMessage || authMessage || donarMessage;
  const error = userError || authError || donarError;
  useEffect(() => {
    message && toast.success(message);
    error &&
      error !== "Unauthorized, Access token not found. Please login." &&
      toast.error(error);

    // empty message
    dispatch(userMessageEmpty());
    dispatch(authMessageEmpty());
    dispatch(donarMessageEmpty());
  }, [message, error, dispatch]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
    </>
  );
}

export default App;
