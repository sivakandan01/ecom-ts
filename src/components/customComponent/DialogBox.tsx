import {
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "../ui/dialog";
import { Button } from "./Button";

type DialogProp = {
    title: string;
    body: string;
    onCancel: () => void;
    onSubmit: () => void;
};

const DialogBox = ({ title, body, onCancel, onSubmit }: DialogProp) => {
    return (
        <DialogContent className="w-[350px]">
            <DialogHeader className="space-y-2">
                {title && <DialogTitle>{title}</DialogTitle>}
                {body && <DialogDescription>{body}</DialogDescription>}
            </DialogHeader>
            <DialogFooter className="w-full flex justify-between gap-x-4">
                <Button
                    type="button"
                    click={onCancel}
                    classname="border border-gray-400 py-1 hover:bg-gray-200 w-[80px]"
                    text="Cancel"
                />
                <Button
                    text="Delete"
                    click={onSubmit}
                    type="button"
                    classname="bg-red-600 hover:bg-red-400 text-white w-[80px]"
                />
            </DialogFooter>
        </DialogContent>
    );
};

export { DialogBox };
