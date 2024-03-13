import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import usersReducer from "../features/users/usersSlice";
import donarsReducer from "../features/donars/donarsSlice";
import historyReducer from "../features/history/historySlice";
import patientsReducer from "../features/patient/patientSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    donars: donarsReducer,
    history: historyReducer,
    patient: patientsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}),
  devTools: true,
});

export default store;
