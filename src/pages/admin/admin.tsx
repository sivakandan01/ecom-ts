/* eslint-disable react-hooks/exhaustive-deps */
import { FetchProducts } from "@/services/productApi";
import { FetchUsers } from "@/services/userApi";
import { TableData } from "@/components/DataTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  type UpdateOrderProp,
  type HeaderItem,
  type SelectedProp,
  type UserItem,
} from "@/lib/utils";
import { useEffect, useState } from "react";
import { Button } from "@/components/customComponent/Button";
import { FetchOrders } from "@/services/orderApi";
import { SearchBar } from "@/components/customComponent/searchBar";
import { SelectDropDown } from "@/components/customComponent/SelectDropDown";

const AdminModule = () => {
  const [activeTab, setActiveTab] = useState<string>("users");

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [productSearch, setProductSearch] = useState<string>("");
  const [orderSearch, setOrderSearch] = useState<string>("");

  const [users, setUsers] = useState<UserItem[]>([]);
  const [products, setProducts] = useState<SelectedProp[]>([]);
  const [orderData, setOrderData] = useState<UpdateOrderProp[]>([]);

  const [companyOptions, setCompanyOptions] = useState<string[]>([]);
  const [productOptions, setProductOptions] = useState<string[]>([]);
  const [productNames, setProductNames] = useState<HeaderItem[]>([]);

  const [tempUserCompany, setTempUserCompany] = useState<string>("All");
  const [tempProductCompany, setTempProductCompany] = useState<string>("All");
  const [tempRole, setTempRole] = useState<string>("All");
  const [tempProductType, setTempProductType] = useState<string>("All");
  const [tempProductName, setTempProductName] = useState<string>("");

  console.log("activeTab", activeTab);

  const UserHeader: HeaderItem[] = [
    { key: "User Name", value: "userName" },
    { key: "Email", value: "email" },
    { key: "Role", value: "role" },
    { key: "Company Name", value: "companyName" },
  ];

  const ProductHeader: HeaderItem[] = [
    { key: "Product Name", value: "name" },
    { key: "Product Type", value: "productType" },
    { key: "Company", value: "companyName" },
    { key: "Price", value: "price" },
    { key: "Stock", value: "stock" },
  ];

  const OrderHeaders: HeaderItem[] = [
    { key: "Product Name", value: "productName" },
    { key: "User Name", value: "userName" },
    { key: "Quantity", value: "quantity" },
    { key: "Price", value: "cost" },
  ];

  const FetchUserData = async () => {
    try {
      const userResponse = await FetchUsers({
        role: tempRole,
        company: tempUserCompany,
        search: searchTerm,
      });
      if (userResponse) {
        setUsers(userResponse.data.data);
      }
      return userResponse.data.data;
    } catch (err) {
      console.log(err);
    }
  };

  const FetchProductData = async () => {
    try {
      const productResponse = await FetchProducts({
        company: tempProductCompany,
        type: tempProductType,
        search: productSearch,
      });

      if (productResponse) {
        setProducts(productResponse.data.data);
      }
      return productResponse.data.data;
    } catch (err) {
      console.log("error fetching data", err);
    }
  };

  const FetchUserOrder = async () => {
    try {
      const response = await FetchOrders({
        id: "",
        product: tempProductName,
        search: orderSearch,
      });
      if (response.data.success) {
        setOrderData(response.data.data);
        return response.data.data;
      } else {
        setOrderData([]);
        return [];
      }
    } catch (err) {
      console.log(err);
    }
  };

  const CompanyOptions = (data: UserItem[]) => {
    const options: string[] = [];
    for (const user of data) {
      const name = user.companyName?.trim();
      if (name && !options.includes(name)) {
        options.push(name);
      }
    }
    setCompanyOptions(options);
  };

  const ProductTypeOptions = (data: SelectedProp[]) => {
    const productOptions: string[] = [];

    for (const product of data) {
      if (!productOptions.includes(product.productType)) {
        productOptions.push(product.productType);
      }
    }
    setProductOptions(productOptions);
  };

  const ProductNameOptions = (data: UpdateOrderProp[]) => {
    const ProductOptions = data.map((data: UpdateOrderProp) => {
      return {
        key: data.productName,
        value: data.productId,
      };
    });
    setProductNames(ProductOptions);
  };

  const FetchAllData = async () => {
    try {
      const user = await FetchUserData();
      if (user) {
        CompanyOptions(user);
      }

      const products = await FetchProductData();
      if (products) {
        ProductTypeOptions(products);
      }

      const orders = await FetchUserOrder();
      if (orders) {
        ProductNameOptions(orders);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    FetchAllData();
  }, []);

  useEffect(() => {
    if (activeTab === "users") {
      FetchUserData();
    } else if (activeTab === "products") {
      FetchProductData();
    } else {
      FetchUserOrder();
    }
  }, [
    activeTab,
    tempRole,
    tempProductCompany,
    tempUserCompany,
    tempProductType,
  ]);

  return (
    <div className="p-4">
      <div>
        <h3 className="font-medium text-[16px]">Admin Module</h3>
      </div>
      <div className="mt-2 flex flex-row">
        <Button
          text="Users"
          click={() => setActiveTab("users")}
          classname={`${
            activeTab === "users"
              ? "border-b-2 border-gray-600 rounded-none"
              : ""
          }`}
          type="button"
        />
        <Button
          text="Products"
          click={() => setActiveTab("products")}
          classname={` ml-3 ${
            activeTab === "products"
              ? "border-b-2 border-gray-600 rounded-none"
              : ""
          }`}
          type="button"
        />
        <Button
          text="Orders"
          click={() => setActiveTab("orders")}
          classname={` ml-3 ${
            activeTab === "orders"
              ? "border-b-2 border-gray-600 rounded-none"
              : ""
          }`}
          type="button"
        />
      </div>
      <div className="mt-2.5 flex justify-between">
        <SearchBar
          searchValue={
            activeTab === "users"
              ? searchTerm
              : activeTab === "products"
              ? productSearch
              : orderSearch
          }
          setSearchValue={
            activeTab === "users"
              ? setSearchTerm
              : activeTab === "products"
              ? setProductSearch
              : setOrderSearch
          }
        />
        <div className="flex">
          {activeTab === "users" && (
            <div className="mr-4">
              <Select value={tempRole} onValueChange={setTempRole}>
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
                onValueChange={setTempProductType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an Type"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">Select an Type</SelectItem>
                  {productOptions.map((product) => (
                    <SelectItem key={product} value={product}>
                      {product}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          {activeTab !== "orders" && (
            <div>
              <Select
                value={
                  activeTab === "users" ? tempUserCompany : tempProductCompany
                }
                onValueChange={
                  activeTab === "users"
                    ? setTempUserCompany
                    : setTempProductCompany
                }
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
          )}
          {activeTab === "orders" && (
            <SelectDropDown
              placeHolder="select product Name"
              options={productNames}
              values={tempProductName}
              setValues={setTempProductName}
            />
          )}
        </div>
      </div>
      <div className="w-full mt-4 rounded-md">
        {activeTab === "users" ? (
          <TableData<UserItem> header={UserHeader} data={users} />
        ) : activeTab === "products" ? (
          <TableData<SelectedProp> header={ProductHeader} data={products} />
        ) : (
          <TableData<UpdateOrderProp> header={OrderHeaders} data={orderData} />
        )}
      </div>
      {/* <Pagination /> */}
    </div>
  );
};

export { AdminModule };
