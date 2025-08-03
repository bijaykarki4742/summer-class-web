"use client";
import React, { useState } from "react";

type Task = {
    id: string;
    taskName: string;
    subTitle: string;
    date: Date;
};

type TaskItemProps = Task & {
    onClick?: () => void;
};

function TaskItem({ taskName, subTitle, date, onClick }: TaskItemProps) {
    const [completed, setCompleted] = useState(false);

    return (
        <div
            className="flex items-center justify-between p-4 bg-white border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
            onClick={onClick}
        >
            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={e => { e.stopPropagation(); setCompleted(!completed); }}
                    onClick={e => e.stopPropagation()}
                />
                <div>
                    <h3 className="text-gray-900 font-medium">{taskName}</h3>
                    <p className="text-gray-500 text-sm">
                        {subTitle} • {date.toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    );
}

type TaskItemsProps = {
    tasks: Task[];
    onTaskClick?: (task: Task, index: number) => void;
};

export default function TaskItems({ tasks, onTaskClick }: TaskItemsProps) {
    return (
        <div className="w-full space-y-2">
            {tasks.map((task, index) => (
                <TaskItem
                    key={index}
                    id={task.id}
                    taskName={task.taskName}
                    subTitle={task.subTitle}
                    date={new Date(task.date)}
                    onClick={onTaskClick ? () => onTaskClick(task, index) : undefined}
                />
            ))}
        </div>
    );
}
