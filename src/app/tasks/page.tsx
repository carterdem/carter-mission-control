"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, MoreHorizontal } from "lucide-react";
import { useState } from "react";

type Task = {
  id: string;
  title: string;
  description?: string;
  assignee: "human" | "agent";
  priority: "low" | "medium" | "high";
  createdAt: string;
};

type Column = {
  id: string;
  title: string;
  tasks: Task[];
  color: string;
};

const initialColumns: Column[] = [
  {
    id: "backlog",
    title: "Backlog",
    color: "zinc",
    tasks: [
      { id: "1", title: "Set up Convex backend", assignee: "agent", priority: "high", createdAt: "2h ago" },
      { id: "2", title: "Design mobile responsive layout", assignee: "agent", priority: "medium", createdAt: "1d ago" },
      { id: "3", title: "Add authentication", assignee: "human", priority: "low", createdAt: "2d ago" },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    color: "violet",
    tasks: [
      { id: "4", title: "Build Mission Control dashboard", assignee: "agent", priority: "high", createdAt: "30m ago" },
      { id: "5", title: "Notion sync integration", assignee: "agent", priority: "high", createdAt: "1h ago" },
    ],
  },
  {
    id: "done",
    title: "Done",
    color: "emerald",
    tasks: [
      { id: "6", title: "Memory flush configuration", assignee: "agent", priority: "medium", createdAt: "3h ago" },
      { id: "7", title: "Hybrid search setup", assignee: "agent", priority: "high", createdAt: "5h ago" },
    ],
  },
];

const priorityColors = {
  low: "bg-zinc-500",
  medium: "bg-amber-500",
  high: "bg-rose-500",
};

const columnColors = {
  zinc: "border-zinc-700",
  violet: "border-violet-500/50",
  emerald: "border-emerald-500/50",
};

export default function TasksPage() {
  const [columns] = useState<Column[]>(initialColumns);

  return (
    <div className="p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Tasks Board</h1>
          <p className="text-zinc-500 mt-1">Track what you and your agents are working on</p>
        </div>
        <Button className="bg-violet-600 hover:bg-violet-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto">
        <div className="flex gap-4 h-full min-w-max pb-4">
          {columns.map((column) => (
            <div 
              key={column.id} 
              className="w-80 flex flex-col"
            >
              {/* Column Header */}
              <div className={`flex items-center justify-between p-3 rounded-t-lg bg-zinc-900 border-t-2 ${columnColors[column.color as keyof typeof columnColors]}`}>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-zinc-100">{column.title}</span>
                  <Badge variant="secondary" className="bg-zinc-800 text-zinc-400 text-xs">
                    {column.tasks.length}
                  </Badge>
                </div>
                <button className="text-zinc-500 hover:text-zinc-300 transition-colors">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>

              {/* Tasks */}
              <div className="flex-1 p-2 space-y-2 bg-zinc-900/30 rounded-b-lg overflow-y-auto">
                {column.tasks.map((task) => (
                  <Card 
                    key={task.id} 
                    className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 cursor-pointer transition-all hover:translate-y-[-2px]"
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between mb-2">
                        <span className="font-medium text-zinc-100 text-sm leading-snug">
                          {task.title}
                        </span>
                        <div className={`h-2 w-2 rounded-full ${priorityColors[task.priority]}`} />
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-5 w-5 border border-zinc-700">
                            <AvatarFallback className={`text-[10px] font-semibold ${
                              task.assignee === "agent" 
                                ? "bg-violet-500/20 text-violet-400" 
                                : "bg-emerald-500/20 text-emerald-400"
                            }`}>
                              {task.assignee === "agent" ? "R" : "C"}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-zinc-500">
                            {task.assignee === "agent" ? "Ron" : "Carter"}
                          </span>
                        </div>
                        <span className="text-xs text-zinc-600">{task.createdAt}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Add Task Button */}
                <button className="w-full p-3 rounded-lg border border-dashed border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-400 transition-colors text-sm flex items-center justify-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add task
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
