"use client";

import { useState } from "react";

interface TaskProps {
  text: string;
}

const TaskItem: React.FC<TaskProps> = ({ text }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="flex items-center justify-between w-full p-3 border rounded-lg">
      <span className={`text-black ${isChecked ? "opacity-50" : ""}`}>{text}</span>
      <button
        onClick={() => setIsChecked(!isChecked)}
        className={`w-6 h-6 flex items-center justify-center rounded-md transition-all duration-300 ${
          isChecked ? "bg-[#FFA791]" : "bg-[#FFFCE1]"
        }`}
      >
        {isChecked && <span className="text-white text-lg">✓</span>}
      </button>
    </div>
  );
};

export default TaskItem;
