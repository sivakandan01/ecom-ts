import {
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "../ui/dialog";

type DialogProp = {
    title: string,
    body: string,
    onCancel: () => void,
    onSubmit: () => void
}

const DialogBox = ({ title, body, onCancel, onSubmit }: DialogProp) => {
    return (
        <DialogContent className="w-[350px]">
            <DialogHeader className="space-y-2">
                {title && <DialogTitle>{title}</DialogTitle>}
                {body && <DialogDescription>{body}</DialogDescription>}
            </DialogHeader>
            <DialogFooter className="w-full flex justify-between gap-x-4">
                <button
                    className="border border-gray-400 py-1 px-2 rounded-md hover:bg-gray-200"
                    onClick={onCancel}
                >
                    Cancel
                </button>
                <button
                    onClick={onSubmit}
                    className="bg-red-500 text-white py-1 px-2 rounded-md"
                >
                    Delete
                </button>
            </DialogFooter>
        </DialogContent>
    );
};

export { DialogBox };
