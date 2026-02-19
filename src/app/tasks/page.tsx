"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Plus, MoreHorizontal, X } from "lucide-react";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

type Task = {
  id: string;
  title: string;
  description?: string;
  assignee: "human" | "agent";
  priority: "low" | "medium" | "high";
  createdAt: string;
};

type ColumnId = "backlog" | "in-progress" | "done";

const initialTasks: Record<ColumnId, Task[]> = {
  "backlog": [
    { id: "1", title: "Set up Convex backend", assignee: "agent", priority: "high", createdAt: "2h ago" },
    { id: "2", title: "Design mobile responsive layout", assignee: "agent", priority: "medium", createdAt: "1d ago" },
    { id: "3", title: "Add authentication", assignee: "human", priority: "low", createdAt: "2d ago" },
  ],
  "in-progress": [
    { id: "4", title: "Build Mission Control dashboard", assignee: "agent", priority: "high", createdAt: "30m ago" },
    { id: "5", title: "Connect Clawdbot API", assignee: "agent", priority: "high", createdAt: "1h ago" },
  ],
  "done": [
    { id: "6", title: "Memory flush configuration", assignee: "agent", priority: "medium", createdAt: "3h ago" },
    { id: "7", title: "Hybrid search setup", assignee: "agent", priority: "high", createdAt: "5h ago" },
    { id: "8", title: "Notion sync integration", assignee: "agent", priority: "high", createdAt: "2h ago" },
  ],
};

const columns: { id: ColumnId; title: string; color: string }[] = [
  { id: "backlog", title: "Backlog", color: "zinc" },
  { id: "in-progress", title: "In Progress", color: "violet" },
  { id: "done", title: "Done", color: "emerald" },
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
  const [tasks, setTasks] = useState<Record<ColumnId, Task[]>>(initialTasks);
  const [isAdding, setIsAdding] = useState<ColumnId | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const sourceCol = source.droppableId as ColumnId;
    const destCol = destination.droppableId as ColumnId;

    const sourceTasks = [...tasks[sourceCol]];
    const destTasks = sourceCol === destCol ? sourceTasks : [...tasks[destCol]];

    const [movedTask] = sourceTasks.splice(source.index, 1);
    destTasks.splice(destination.index, 0, movedTask);

    setTasks({
      ...tasks,
      [sourceCol]: sourceTasks,
      [destCol]: destTasks,
    });
  };

  const addTask = (columnId: ColumnId) => {
    if (!newTaskTitle.trim()) return;
    
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      assignee: "agent",
      priority: "medium",
      createdAt: "Just now",
    };

    setTasks({
      ...tasks,
      [columnId]: [...tasks[columnId], newTask],
    });
    setNewTaskTitle("");
    setIsAdding(null);
  };

  return (
    <div className="p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Tasks Board</h1>
          <p className="text-zinc-500 mt-1">Drag tasks between columns to update status</p>
        </div>
        <Button 
          onClick={() => setIsAdding("backlog")}
          className="bg-violet-600 hover:bg-violet-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      {/* Kanban Board */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex-1 overflow-x-auto">
          <div className="flex gap-4 h-full min-w-max pb-4">
            {columns.map((column) => (
              <div key={column.id} className="w-80 flex flex-col">
                {/* Column Header */}
                <div className={`flex items-center justify-between p-3 rounded-t-lg bg-zinc-900 border-t-2 ${columnColors[column.color as keyof typeof columnColors]}`}>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-zinc-100">{column.title}</span>
                    <Badge variant="secondary" className="bg-zinc-800 text-zinc-400 text-xs">
                      {tasks[column.id].length}
                    </Badge>
                  </div>
                  <button className="text-zinc-500 hover:text-zinc-300 transition-colors">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>

                {/* Droppable Area */}
                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`flex-1 p-2 space-y-2 bg-zinc-900/30 rounded-b-lg overflow-y-auto min-h-[200px] transition-colors ${
                        snapshot.isDraggingOver ? "bg-zinc-800/50" : ""
                      }`}
                    >
                      {tasks[column.id].map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Card 
                                className={`bg-zinc-900 border-zinc-800 cursor-grab active:cursor-grabbing transition-all ${
                                  snapshot.isDragging 
                                    ? "shadow-lg shadow-violet-500/20 border-violet-500/50 rotate-2" 
                                    : "hover:border-zinc-700 hover:translate-y-[-2px]"
                                }`}
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
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}

                      {/* Add Task Form */}
                      {isAdding === column.id ? (
                        <div className="p-2 rounded-lg bg-zinc-800 border border-zinc-700">
                          <Input
                            autoFocus
                            placeholder="Task title..."
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") addTask(column.id);
                              if (e.key === "Escape") setIsAdding(null);
                            }}
                            className="bg-zinc-900 border-zinc-700 text-zinc-100 text-sm mb-2"
                          />
                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => addTask(column.id)} className="bg-violet-600 hover:bg-violet-700">
                              Add
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => setIsAdding(null)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <button 
                          onClick={() => setIsAdding(column.id)}
                          className="w-full p-3 rounded-lg border border-dashed border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-400 transition-colors text-sm flex items-center justify-center gap-2"
                        >
                          <Plus className="h-4 w-4" />
                          Add task
                        </button>
                      )}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}
