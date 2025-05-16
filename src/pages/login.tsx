import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Login, Register } from "@/api/userApi";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { setUser } from "@/store/slice/userSlice";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState<string>("Login");
  const navigate = useNavigate()

  const dispatch = useDispatch<AppDispatch>()

  type LoginForm = { email: string; password: string };
  type RegisterForm = {
    userName: string;
    email: string;
    password: string;
    role: string;
    companyName: string;
  };

  const [loginData, setLoginData] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [registerData, setRegisterData] = useState<RegisterForm>({
    userName: "",
    email: "",
    password: "",
    role: "",
    companyName: "",
  });

  const HandleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (activeTab === "Login") {
      setLoginData((prev) => ({ ...prev, [name]: value }));
    } else {
      setRegisterData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const HandleSelect = (name: string, value: string) => {
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const HandleClear = () => {
    if (activeTab === "Login") {
      setLoginData({ email: "", password: "" });
    } else {
      setRegisterData({
        userName: "",
        email: "",
        password: "",
        role: "",
        companyName: "",
      });
    }
  };

  const HandleSubmit = async () => {
    if (activeTab === "Login") {
      const response = await Login(loginData);
      dispatch(setUser(response.data.data))
      navigate('/')
    } else {
      const response = await Register(registerData);
      console.log(response);
      setActiveTab("Login");
    }
    HandleClear();
  };

  return (
    <div className="mt-[5%] ml-[35%]">
      <Tabs defaultValue="login" className="min-w-[400px] w-[40%]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login" onClick={() => setActiveTab("Login")}>
            Login
          </TabsTrigger>
          <TabsTrigger
            value="register"
            onClick={() => setActiveTab("Register")}
          >
            Register
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card className="space-y-6 py-6">
            <CardHeader className="flex justify-center">
              <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 px-5">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  value={loginData.email}
                  name="email"
                  onChange={HandleInput}
                />
              </div>
              <div className="space-y-2">
                <Label>password</Label>
                <Input
                  type="password"
                  value={loginData.password}
                  name="password"
                  onChange={HandleInput}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between px-5">
              <Button className="bg-gray-600" onClick={HandleClear}>Reset</Button>
              <Button className="bg-blue-600" onClick={HandleSubmit}>Login</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="register">
          <Card className="space-y-6 py-4">
            <CardHeader className="flex justify-center">
              <CardTitle>Register</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 px-5">
              <div className="space-y-2">
                <Label>Username</Label>
                <Input
                  value={registerData.userName}
                  name="userName"
                  onChange={HandleInput}
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  value={registerData.email}
                  name="email"
                  onChange={HandleInput}
                />
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input
                  value={registerData.password}
                  name="password"
                  onChange={HandleInput}
                />
              </div>
              <div className="space-y-2 w-full">
                <Label>Role</Label>
                <Select
                  value={registerData.role}
                  name="role"
                  onValueChange={(value) => HandleSelect("role", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a role"></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer">Customer</SelectItem>
                    <SelectItem value="company">Company</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {registerData.role === "company" && (
                <div className="space-y-2">
                  <Label>companyName</Label>
                  <Input
                    value={registerData.companyName}
                    name="companyName"
                    onChange={HandleInput}
                  />
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between px-5">
              <Button className="bg-gray-600" onClick={HandleClear}>Reset</Button>
              <Button className="bg-blue-600" onClick={HandleSubmit}>Register</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoginPage;
