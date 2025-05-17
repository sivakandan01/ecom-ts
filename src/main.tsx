import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/App.tsx";
import { store, persistor } from "./store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { SidebarProvider } from "./components/ui/sidebar.tsx";
import { Toaster } from "sonner"

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <StrictMode>
        <SidebarProvider>
          <Toaster
                position="bottom-left"
                duration={4000}
          />
          <App />
        </SidebarProvider>  
        </StrictMode>
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
