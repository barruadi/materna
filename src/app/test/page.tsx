"use client";

import { useState, FormEvent } from "react";

interface DailyTaskFormData {
  pasienId: string;
  title: string;
  description: string;
  date: Date;
}

interface DailyTaskFormProps {
  onSubmit: (formData: DailyTaskFormData) => void;
  isLoading?: boolean;
}

const DailyTaskForm: React.FC<DailyTaskFormProps> = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState<DailyTaskFormData>({
    pasienId: "",
    title: "",
    description: "",
    date: new Date(), // Default to today's date
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("data: ", formData);
    const response = await fetch("/api/pasien/dailytask", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: formData.title,
            description: formData.description,
            date: formData.date,
            pasienId: formData.pasienId,
        }),
    });

    if (!response.ok) {
        console.error("Error creating daily task");
    } else {
        console.log("Daily task created successfully");
        console.log("Response:", response);
    };
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Add Daily Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="pasienId" className="block text-sm font-medium text-gray-700 mb-1">
            Patient ID
          </label>
          <input
            type="text"
            id="pasienId"
            name="pasienId"
            value={formData.pasienId}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFA791]"
            placeholder="Enter patient ID"
          />
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Task Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFA791]"
            placeholder="Enter task title"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFA791]"
            placeholder="Enter task description"
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date.toISOString().split("T")[0]} // Format: yyyy-MM-dd
            onChange={(e) =>
                setFormData((prev) => ({
                    ...prev,
                    date: new Date(e.target.value), // Convert back to Date object
                }))
            }
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFA791]"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#FFA791] hover:bg-[#ff9a7d] text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 disabled:opacity-50"
        >
         Add task
        </button>
      </form>
    </div>
  );
};

export default DailyTaskForm;
