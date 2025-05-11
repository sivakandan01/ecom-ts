import { FetchProducts } from "@/api/productApi";
import { FetchUsers } from "@/api/userApi";
import { TableData } from "@/components/DataTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import type { HeaderItem, SelectedProp, UserItem } from "@/lib/utils";
import { SelectValue } from "@radix-ui/react-select";
import { useEffect, useState } from "react";

const AdminModule = () => {
  const [activeTab, setActiveTab] = useState<string>("users");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [users, setUsers] = useState<UserItem[]>([]);
  const [products, setProducts] = useState<SelectedProp[]>([]);
  const [companyOptions, setCompanyOptions] = useState<string[]>([]);
  const [productOptions, setProductyOptions] = useState<string[]>([]);
  const [tempCompany, setTempCompany] = useState<string>("All");
  const [tempRole, setTempRole] = useState<string>("All");
  const [tempProductType, setTempProductType] = useState<string>("All");

  const UserHeader: HeaderItem[] = [
    { key: "User Name", value: "userName" },
    { key: "Email", value: "email" },
    { key: "Role", value: "role" },
    { key: "Company Name", value: "companyName" },
  ];

  const ProductHeader: HeaderItem[] = [
    { key: "Product Name", value: "name" },
    { key: "Product Type", value: "productType"},
    { key: "Company", value: "companyName" },
    { key: "Price", value: "price" },
    { key: "Stock", value: "stock" },
  ];

  const FetchAllData = async () => {
    try {
      const productResponse = await FetchProducts();
      const userResponse = await FetchUsers();

      if (userResponse && productResponse) {
        setUsers(userResponse.data.data);
        setProducts(productResponse.data.data);

        const options: string[] = [];
        const productoptions: string[] = []

        for (const user of userResponse.data.data) {
          const name = user.companyName?.trim();
          if (name && !options.includes(name)) {
            options.push(name);
          }
        }

        for(const product of productResponse.data.data){
            if(!productoptions.includes(product.productType)){
                productoptions.push(product.productType)
            }
        }

        setCompanyOptions(options);
        setProductyOptions(productoptions)
      }
    } catch (err) {
      console.log("error fecthing data", err);
    }
  };

  useEffect(() => {
    FetchAllData();
  }, []);

  const FilteredUsers = users.filter((user) => {
    const matchesSearch =
      user.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.userName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCompany =
      tempCompany === "All" ||
      user.companyName?.toLowerCase() === tempCompany.toLowerCase();
    const matchesRole =
      tempRole === "All" || user.role.toLowerCase() === tempRole.toLowerCase();
    return matchesSearch && matchesCompany && matchesRole;
  });

  const Filteredproducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.companyName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCompany =
      tempCompany === "All" ||
      product.companyName?.toLowerCase() === tempCompany.toLowerCase();
    const matchesProductType =
      tempProductType === "All" ||
      product.productType.toLowerCase() === tempProductType.toLowerCase();
    return matchesSearch && matchesCompany && matchesProductType;
  });

  return (
    <div className="p-4">
      <div>
        <h3 className="font-medium text-[16px]">Admin Module</h3>
      </div>
      <div className="mt-2">
        <button
          onClick={() => setActiveTab("users")}
          className={`
                    py-1 px-2
                    ${activeTab === "users" ? "border-b-2 border-blue-600" : ""}
            `}
        >
          Users
        </button>
        <button
          onClick={() => setActiveTab("products")}
          className={`
                    py-1 px-2 ml-4
                    ${
                      activeTab === "products"
                        ? "border-b-2 border-blue-600"
                        : ""
                    }
            `}
        >
          Products
        </button>
      </div>
      <div className="mt-2.5 flex justify-between">
        <input
          type="text"
          name="searchterm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-2 h-[36px] w-[280px] border border-gray-400 rounded-md"
        />
        <div className="flex">
          {activeTab === "users" && (
            <div className="mr-4">
              <Select
                value={tempRole}
                onValueChange={(val) => setTempRole(val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an Role"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">Select an Role</SelectItem>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="company">Company</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          {activeTab === "products" && (
            <div className="mr-4">
              <Select
                value={tempProductType}
                onValueChange={(val) => setTempProductType(val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an Type"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">Select an Type</SelectItem>
                  {productOptions.map((product) => 
                    <SelectItem key={product} value={product}>{product}</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          )}
          <div>
            <Select
              value={tempCompany}
              onValueChange={(val) => setTempCompany(val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an company"></SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">Select an company</SelectItem>
                {companyOptions.map((company) => (
                  <SelectItem key={company} value={company}>
                    {company}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="w-full border border-gray-300 mt-4 rounded-md">
        {activeTab === "users" ? (
          <TableData<UserItem> header={UserHeader} data={FilteredUsers} />
        ) : (
          <TableData<SelectedProp>
            header={ProductHeader}
            data={Filteredproducts}
          />
        )}
      </div>
    </div>
  );
};

export { AdminModule };
