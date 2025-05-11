import { ShoppingCart } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "../ui/separator";
import { useNavigate } from "react-router-dom";

const Header = () => {

    const navigate = useNavigate()

    return (
      <div className="w-full border-b border-gray-200 bg-gray-50">
        <header className="flex h-16 w-full shrink-0 items-center transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex justify-between w-full">
            <div className="flex">
              <SidebarTrigger className="h-6 w-6 text-gray-500" />
              <Separator orientation="vertical" className="mr-2 h-4" />
            </div>
            <button 
              className="border flex items-center hover:bg-gray-300 border-gray-300 rounded-md py-1 px-2 mr-8"
              onClick={() => navigate("/cart")}
            >
              <ShoppingCart className="h-4 w-4 text-gray-500"/>
              <span className="text-gray-500 ml-2">Cart</span>
            </button>
          </div>
        </header>
      </div>
    );
  };

export { Header };
