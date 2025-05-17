import type { UserItem } from "@/lib/utils";
import React, { useState } from "react";
import { TextInput } from "../customComponent/InputTags";

type UserFormProp = {
  data: UserItem;
  onSave: (data: UserItem) => void;
  onCancel: () => void
}; 

const UserForm = ({ data, onSave, onCancel }: UserFormProp) => {
  const [formData, setFormData] = useState(data);

  const HandleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const HandleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: UserItem) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <form onSubmit={HandleSave} className="space-y-4">
        <h2 className="font-semibold flex justify-center">User Form</h2>
        <div className="space-y-4">
          <TextInput
            label="UserName"
            name="userName"
            value={formData.userName}
            onchange={HandleInputChange}
          />
          <TextInput
            label="Role"
            name="role"
            value={formData.role}
            onchange={HandleInputChange}
          />
          <TextInput
            label="Company Name"
            name="companyName"
            value={formData.companyName}
            onchange={HandleInputChange}
          />
          <div className="flex justify-between">
            <button
              type="button"
              className="border border-gray-400 hover:bg-gray-200 w-[100px] h-[36px] flex justify-center items-center rounded-md"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-500 w-[100px] h-[36px] flex justify-center items-center rounded-md text-white"
            >
              UpdateUser
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export { UserForm };
