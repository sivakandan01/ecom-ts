import { MdOutlineClose } from "react-icons/md";
import { toast } from "sonner";

type ToastProp = {
  body: string;
  action1text?: string;
  action1?: () => void;
  color?: string
};

const Toast = ({ body, action1text, action1, color }: ToastProp) => {
  return (
    <div
      className={`flex items-center justify-between min-w-[300px] rounded-md shadow-lg max-w-[500px] h-[45px]
            px-4 border border-gray-400 ${color ? color : "bg-gray-100"} `}
    >
      <p className="text-[13px]">{body}</p>
      <div className="flex flex-row space-x-2 ml-4">
        {action1 && (
          <button
            onClick={action1}
            className={`bg-gray-300 flex items-center justify-center 
                h-[25px] px-2 rounded-md ${color ? "bg-gray-600 text-white" : "bg-gray-300"}
            `}
          >
            <span className="text-[13px]">{action1text}</span>
          </button>
        )}
        <button
          onClick={() => toast.dismiss()}
          className={`bg-gray-300 flex items-center justify-center 
            h-[25px] px-2 rounded-md ${color ? "bg-gray-600 text-white" : "bg-gray-300"}`}
        >
          <MdOutlineClose />
        </button>
      </div>
    </div>
  );
};

export { Toast };
