import { TaskWrapperProps } from "../_types/types";

// Dummy data daily tasks
export const dummyTaskData: TaskWrapperProps = {
    tanggal: new Date(),
    dailyTask: [
        {
            title: "Take prenatal vitamins",
            description: "Take your daily prenatal vitamin",
            isChecked: false,
        },
        {
            title: "Drink 8 glasses of water",
            description: "Stay hydrated throughout the day",
            isChecked: false,
        },
        {
            title: "15-minute gentle stretching",
            description: "Do some light stretching exercises",
            isChecked: false,
        },
        {
            title: "Log any symptoms",
            description: "Record any pregnancy symptoms",
            isChecked: false,
        },
        {
            title: "Eat a balanced meal",
            description: "Include proteins, vegetables",
            isChecked: false,
        },
        {
            title: "Get 8 hours of sleep",
            description: "Ensure you get adequate rest",
            isChecked: false,
        },
    ]
};
