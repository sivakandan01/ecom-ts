import { Card, CardFooter, CardContent } from "@/components/ui/card";
import { FetchProducts } from "@/services/productApi";
import { AddToCart } from "@/services/cartApi";
import { useEffect, useState } from "react";
import type { AddCartProp, SelectedProp } from "@/lib/utils";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Toast } from "@/hooks/custom-toast/toast";

const Main = () => {
  const [products, setProducts] = useState<SelectedProp[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { userData } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const FetchData = async () => {
    try {
      const response = await FetchProducts();
      setProducts(response.data.data);
    } catch (err) {
      console.log("error fetching products", err);
    }
  };

  const AddCart = async (row: SelectedProp) => {
    try {
      const data: AddCartProp = {
        productId: row.id,
        productName: row.name,
        userId: userData.id,
        price: row.price,
        quantity: 1,
      };
      const response = await AddToCart(data);
      console.log(response);
      toast(
        <Toast
          body="Added To Cart Successfully."
          action1text="View Cart"
          action1={() => navigate("/cart")}
           color="bg-green-200"
        />,
        { unstyled: true }
      );
    } catch (err) {
      console.log("Error adding to Cart", err);
    }
  };

  useEffect(() => {
    FetchData();
  }, []);

  const filteredProduct = products.filter((prod) =>
    prod.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-6 py-4 overflow-auto">
      <div className="flex justify-center mb-5">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-[40%] border border-gray-300 h-10 rounded-md px-4"
          placeholder="Search Here ..."
        />
      </div>
      <div className={`grid md:w-[700px] md:grid-cols-4 grid-cols-7 gap-8`}>
        {filteredProduct.map((product) => (
          <Card className="w-full" key={product.id}>
            <CardContent className="">
              <div>
                <img
                  src="/src/assets/shdcn.jpg"
                  className="w-full rounded-t-md"
                />
                <div className="flex justify-between px-3 mt-2">
                  <p>{product.name}</p>
                  <p>₹{product.price}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex justify-between py-2 px-2 w-full">
                <button
                  className="bg-blue-400 hover:bg-gray-300 hover:text-black w-full py-1 text-white rounded-md"
                  onClick={() => AddCart(product)}
                >
                  Add To Cart
                </button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Main;
