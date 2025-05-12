import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import { AppSidebar } from "./Sidebar";
import { SidebarInset } from "../ui/sidebar";

type MainProp = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainProp) => {
  const { pathname } = useLocation();
  const isAuthPage = pathname === "/login";

  if (isAuthPage) {
    return <div className="h-screen w-screen">{children}</div>;
  }

  return (
    <div className="flex min-h-screen w-screen">
      <AppSidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-4">
          <SidebarInset>{children}</SidebarInset>
        </main>
      </div>
    </div>
  );
};

export { MainLayout };
