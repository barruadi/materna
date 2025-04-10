import { NextResponse } from "next/server";
import { db } from "~/server/db";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { 
            title,
            description,
            date,
            pasienId
        } = body;

        // create daily task
        const dailyTask = await db.dailyTasks.create({ 
            data: {
                title: title,
                description: description,
                date: new Date(),
                pasienId: pasienId,
            }
        });

        return NextResponse.json(
            {dailyTask, message: "created success"},
            {status: 201 }
        );
    } catch (error) {
        return NextResponse.json({ error: "Daily Task creation failed" }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const body = await req.json();
        const { pasienId } = JSON.parse(body);

        // get daily task
        const dailyTasks = await db.dailyTasks.findMany({
            where: {
                pasienId: pasienId,
            },
            orderBy: {
                date: 'desc' // Order by date, most recent first
            }
        });

        // Group tasks by date
        const tasksByDate = dailyTasks.reduce((groups: Record<string, any[]>, task) => {
            // Format date to YYYY-MM-DD to use as grouping key
            const dateKey = task.date.toISOString().split('T')[0] || task.date.toString();
            
            if (!groups[dateKey]) {
                groups[dateKey] = [];
            }
            
            groups[dateKey].push({
                title: task.title,
                description: task.description,
                isChecked: task.status || false, // Changed from status to isChecked
            });
            
            return groups;
        }, {});
        
        // Convert grouped object to array format with the specific parameter structure
        const formattedResponse: {
            tanggal: Date;
            dailyTask: {
                id: string;
                title: string;
                description: string;
                isChecked: boolean;
            }[];
        }[] = Object.entries(tasksByDate).map(([dateStr, tasks]) => ({
            tanggal: new Date(dateStr),
            dailyTask: tasks
        }));

        return NextResponse.json(formattedResponse, { status: 200 });
    } catch (error) {
        console.error("Error fetching daily tasks:", error);
        return NextResponse.json({ error: "Daily Task get failed" }, { status: 500 });
    }
}

export async function UPDATE(req: Request) {
    try {
        const body = await req.json();
        const { taskId } = JSON.parse(body);

        // update daily task
        const dailyTask = await db.dailyTasks.update({ 
            where: {
                id: taskId,
            },
            data: {
                status: true,
            }
        });

        return NextResponse.json(
            {dailyTask, message: "updated success"},
            {status: 201 }
        );
    } catch (error) {
        return NextResponse.json({ error: "Daily Task update failed" }, { status: 500 });
    }
}