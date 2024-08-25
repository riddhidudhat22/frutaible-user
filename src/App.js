import { Route, Routes } from "react-router-dom";
import UserRoute from "./route/UserRoute";
import AdminRoute from "./route/AdminRoute";
import PrivateRoute from "./route/PrivateRoute";
import { Provider } from "react-redux";
import { congigstate } from "./redux/Store";
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from "./context/Themcontext";
import { ContactProvider } from "./context/Contactcontext";
import { SnackbarProvider } from 'notistack';
import Alert from "./user/component/Alert/Alert";

function App() {
  const { store, persistor } = congigstate();
  return (
    <>
      <SnackbarProvider>
        <ContactProvider>
          <ThemeProvider>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <Alert/>
                <Routes>
                  <Route exact path="/*" element={<UserRoute />} />

                  <Route element={<PrivateRoute />}>
                    <Route exact path="/admin/*" element={<AdminRoute />} />
                  </Route>

                </Routes>
              </PersistGate>
            </Provider>
          </ThemeProvider>
        </ContactProvider>
      </SnackbarProvider>

    </>
  );
}

export default App;
