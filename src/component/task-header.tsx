"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import Button from "@/component/ui/button";
import AddTaskDialog, { TaskDialogData } from "@/component/ui/AddTaskDialog";
import TaskItems from "@/component/task-ietm";

type Task = {
    id: string;
    taskName: string;
    subTitle: string;
    date: Date;
};

type DialogMode = "add" | "edit";

export default function Header() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMode, setDialogMode] = useState<DialogMode>("add");
    const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch tasks from the backend
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await fetch("/api/task");
                const data = await res.json();
                if (!Array.isArray(data)) throw new Error("Invalid data format");
                const formatted = data.map((t: any) => ({
                    id: t.id,
                    taskName: t.name,
                    subTitle: t.description,
                    date: new Date(t.due_date),
                }));
                setTasks(formatted);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, []);

    function addNewTask() {
        setDialogMode("add");
        setSelectedTaskIndex(null);
        setDialogOpen(true);
    }

    function handleTaskClick(task: Task, index: number) {
        setDialogMode("edit");
        setSelectedTaskIndex(index);
        setDialogOpen(true);
    }

    async function handleAddTaskDialog(data: TaskDialogData) {
        try {
            const res = await fetch("/api/task", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    task_name: data.name,
                    description: data.description,
                    due_date: data.dueDate,
                    tag: data.tag,
                }),
            });
            if (!res.ok) {
                throw new Error("Failed to add task");
            }
            const newTask = await res.json();
            setTasks((prev) => [
                ...prev,
                {
                    id: newTask.id,
                    taskName: newTask.name,
                    subTitle: newTask.description,
                    date: new Date(newTask.due_date),
                },
            ]);
            setDialogOpen(false);
        } catch (error) {
            console.error("Error adding task:", error);
        }
    }

    async function handleUpdateTaskDialog(data: TaskDialogData) {
        if (selectedTaskIndex === null) return;
        const taskToUpdate = tasks[selectedTaskIndex];
        try {
            const res = await fetch("/api/task", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: taskToUpdate.id,
                    task_name: data.name,
                    description: data.description,
                    due_date: data.dueDate,
                }),
            });
            console.log(res.body);
            if (!res.ok) {
                throw new Error("Failed to update task");
            }
            const updatedTask = await res.json();
            setTasks((prev) => {
                const updated = [...prev];
                updated[selectedTaskIndex] = {
                    id: updatedTask.id,
                    taskName: updatedTask.name,
                    subTitle: updatedTask.description,
                    date: new Date(updatedTask.due_date),
                };
                return updated;
            });
            setDialogOpen(false);
        } catch (error) {
            console.error("Error updating task:", error);
        }
    }

    async function handleDeleteTask(id: string) {
        if (selectedTaskIndex === null) return;
        try {
            const res = await fetch("/api/task", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            if (!res.ok) {
                throw new Error("Failed to delete task");
            }
            setTasks((prev) => prev.filter((_, idx) => idx !== selectedTaskIndex));
            setDialogOpen(false);
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    }

    // Prepare dialog props
    const baseDialogProps = {
        open: dialogOpen,
        onCancel: () => setDialogOpen(false),
        tags: ["Personal", "Work", "Urgent"] as string[],
    };
    let dialogProps: any = {
        ...baseDialogProps,
        onSave: handleAddTaskDialog,
    };
    if (dialogMode === "edit" && selectedTaskIndex !== null) {
        const t = tasks[selectedTaskIndex];
        dialogProps = {
            ...baseDialogProps,
            initialData: {
                id: t.id,
                name: t.taskName,
                dueDate: t.date.toISOString().split("T")[0],
                tag: "Personal", // Default, update if you store tags
                description: t.subTitle,
            },
            onSave: handleUpdateTaskDialog,
            onDelete: () => handleDeleteTask(t.id),
        };
    }

    return (
        <div>
            <div className="flex items-center justify-between p-6 bg-gray-50 border-b border-gray-200">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">My Day</h1>
                    <p className="text-gray-600 mt-1">July 2025</p>
                </div>
                <Button label={"New task"} onClick={addNewTask}>
                    <Plus className="w-4 h-4" />
                </Button>
            </div>

            <AddTaskDialog {...dialogProps} />

            {loading ? (
                <p className="p-6 text-gray-600">Loading tasks...</p>
            ) : (
                <TaskItems tasks={tasks} onTaskClick={handleTaskClick} />
            )}
        </div>
    );
}
