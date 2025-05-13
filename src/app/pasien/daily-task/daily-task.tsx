import { TaskItemProps } from "~/app/_types/types";

function TaskItem ({ 
  title, 
  description, 
  isChecked, 
  onToggle 
}: TaskItemProps) {
  return (
    <div className="flex items-center justify-start w-full p-3 border rounded-xl mb-2 gap-3">
      <button
        onClick={onToggle}
        className={`w-6 h-6 flex items-center justify-center rounded-full transition-all duration-300 ${
          isChecked ? "bg-[#5A5A5A]" : "bg-white border border-[#5A5A5A]"
        }`}
      >
        {isChecked && 
          <span className="text-white text-lg">✓</span>
        }
      </button>
      <div className="flex flex-col">
        <span className={`text-black text-[13px] ${isChecked ? "opacity-50" : ""}`}>{title}</span>
        <span className={`text-gray-500 text-[10px] ${isChecked ? "opacity-50" : ""}`}>{description}</span>
      </div>
    </div>
  );
};

export default TaskItem;
