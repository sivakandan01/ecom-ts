import type { UserItem } from "@/lib/utils";
import React, { useState } from "react";
import { TextInput } from "../customComponent/InputTags";
import { Card, CardContent } from "../ui/card";
import { Button } from "../customComponent/Button";

type UserFormProp = {
    data: UserItem;
    onSave: (data: UserItem) => void;
    onCancel: () => void;
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
        <Card className="py-4 bg-white/30 backdrop-blur-md shadow-lg">
            <CardContent className="px-6">
                <form onSubmit={HandleSave} className="space-y-4">
                    <h2 className="font-bold flex justify-center">User Form</h2>
                    <div className="space-y-6">
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
                            disabled={true}
                        />
                        {formData.role === "company" && (
                            <TextInput
                                label="Company Name"
                                name="companyName"
                                value={formData.companyName}
                                onchange={HandleInputChange}
                            />
                        )}
                        <div className="flex justify-between">
                            <Button
                                type="button"
                                click={onCancel}
                                text="Cancel"
                                classname="w-[100px] border border-gray-400 hover:bg-gray-200"
                            />
                            <Button
                                type="submit"
                                text="UpdateUser"
                                classname="text-white bg-blue-700 hover:bg-blue-500 w-[100px]"
                            />
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export { UserForm };
