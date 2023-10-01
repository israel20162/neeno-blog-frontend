"use client";

import { PropsWithChildren } from "react";
import { store } from "../../../store/main";
import { Provider } from "react-redux";
import { persistor } from "../../../store/main";
import { PersistGate } from "redux-persist/integration/react";
import React from "react";

function ReduxProvider({children}) {
  return (
    <Provider store={store}>
      <PersistGate loading={"loading..."} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}

export default ReduxProvider;
