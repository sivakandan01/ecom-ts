import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import LoginPage from "../pages/login";
import Main from "../pages/main";
import { SidebarProvider } from "../components/ui/sidebar";
import type { RootState } from "../store/store";
import { MainLayout } from "../layout/mainLayout";
import { CompanyModule } from "../pages/company";
import { AdminModule } from "../pages/admin";
import { Cart } from "../pages/cart";
import { Profile } from "../pages/profile";

const App = () => {
  const navigate = useNavigate();
  const { userData } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!userData || Object.keys(userData).length === 0) {
      navigate("/login");
    }
  }, [userData, navigate]);

  return (
    <SidebarProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            <MainLayout>
              <Routes>
                <Route path="/main" element={<Main />} />
                <Route path="/" element={<Main />} />
                <Route path="/company" element={<CompanyModule />} />
                <Route path="/admin" element={<AdminModule />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </MainLayout>
          }
        />
      </Routes>
    </SidebarProvider>
  );
};

export default App;