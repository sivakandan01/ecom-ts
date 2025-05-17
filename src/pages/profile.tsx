import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { HeaderItem, UserItem } from "@/lib/utils";
import type { RootState, AppDispatch } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import shadcnImg from "../assets/shdcn.jpg";
import { UpdateUser } from "@/services/userApi";
import { useState } from "react";
import { UserForm } from "@/components/form/userForm";
import { setUser } from "@/store/slice/userSlice";

const Profile = () => {
  const { userData } = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState<UserItem>(userData);
  const [formOpen, setFormOpen] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const Header: HeaderItem[] = [
    { key: "userName", value: "Name" },
    { key: "email", value: "Email" },
    { key: "role", value: "Role" },
    { key: "companyName", value: "Company Name" },
  ];

  const HandleUpdate = () => {
    setFormOpen(true);
    setFormData(userData);
  };

  const HandleSubmit = async (data: UserItem) => {
    try {
      const response = await UpdateUser(data.id, data);
      if (response) {
        dispatch(setUser(response.data.data));
      }
    } catch (err) {
      console.log(err);
    }
    setFormOpen(false);
  };

  const HandleCancel = () => {
    setFormOpen(false);
  };

  return (
    <div className="flex justify-center mt-[20px]">
      {!formOpen && (
        <Card className="w-[40%]">
          <CardContent>
            <CardHeader className="flex justify-end py-4">
              <button onClick={HandleUpdate}>
                <p className="mr-3">✏️</p>
              </button>
            </CardHeader>
            <CardDescription>
              <div className="space-y-4">
                <div className="flex justify-center">
                  <Avatar>
                    <AvatarImage
                      src={shadcnImg}
                      alt="@shadcn"
                      className="w-full h-full"
                    />
                  </Avatar>
                </div>
                {Header.map((head) => (
                  <div className="flex justify-between space-y-4 px-[10%]">
                    <p className="font-medium">{head.value}:</p>
                    <p>{userData[head.key]}</p>
                  </div>
                ))}
              </div>
            </CardDescription>
            <CardFooter></CardFooter>
          </CardContent>
        </Card>
      )}
      {formOpen && (
        <UserForm
          data={formData}
          onSave={HandleSubmit}
          onCancel={HandleCancel}
        />
      )}
    </div>
  );
};

export { Profile };
