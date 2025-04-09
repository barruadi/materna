"use client";

import { useState } from "react";

interface TaskProps {
  text: string;
  details: string;
}

const TaskItem: React.FC<TaskProps> = ({ text, details }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="flex items-center justify-start w-full p-2 border rounded-xl gap-x-2">
      <button
        onClick={() => setIsChecked(!isChecked)}
        className={`w-6 h-6 flex items-center justify-center rounded-full border border-black transition-all duration-300 ${
          isChecked ? "bg-[#5A5A5A] border-[#5A5A5A]" : "bg-white"
        }`}
      >
        {isChecked && <span className="text-white text-lg">✓</span>}
      </button>
      <div className={`flex flex-col ${isChecked ? "text-[#5A5A5A] line-through" : ""}`}>
        <span className="text-black text-[13px] font-semibold leading-tight">{text}</span>
        <span className="text-[12px]">{details}</span>
      </div>
    </div>
  );
};

export default TaskItem;