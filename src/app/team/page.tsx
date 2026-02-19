"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Activity, Code, Pencil, Search, Bot } from "lucide-react";

const agents = [
  {
    name: "Ron",
    role: "Main Agent",
    description: "Primary AI assistant handling all core operations, communication, and coordination.",
    status: "active",
    currentTask: "Building Mission Control",
    avatar: "R",
    color: "violet",
    icon: Bot,
    stats: { tasksToday: 12, sessions: 3, uptime: "99.9%" }
  },
  {
    name: "Dev Agent",
    role: "Developer",
    description: "Specialized in coding, debugging, and technical implementation tasks.",
    status: "idle",
    currentTask: null,
    avatar: "D",
    color: "sky",
    icon: Code,
    stats: { tasksToday: 5, sessions: 0, uptime: "100%" }
  },
  {
    name: "Writer Agent",
    role: "Content Writer",
    description: "Creates blog posts, documentation, and marketing copy.",
    status: "active",
    currentTask: "Drafting blog article",
    avatar: "W",
    color: "emerald",
    icon: Pencil,
    stats: { tasksToday: 3, sessions: 1, uptime: "100%" }
  },
  {
    name: "Research Agent",
    role: "Researcher",
    description: "Conducts market research, competitive analysis, and data gathering.",
    status: "idle",
    currentTask: null,
    avatar: "R",
    color: "amber",
    icon: Search,
    stats: { tasksToday: 2, sessions: 0, uptime: "100%" }
  },
];

const colorVariants = {
  violet: {
    bg: "bg-violet-500/10",
    border: "border-violet-500/30",
    text: "text-violet-400",
    avatar: "bg-violet-500/20 text-violet-400",
  },
  sky: {
    bg: "bg-sky-500/10",
    border: "border-sky-500/30",
    text: "text-sky-400",
    avatar: "bg-sky-500/20 text-sky-400",
  },
  emerald: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
    avatar: "bg-emerald-500/20 text-emerald-400",
  },
  amber: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    text: "text-amber-400",
    avatar: "bg-amber-500/20 text-amber-400",
  },
};

export default function TeamPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">Team</h1>
        <p className="text-zinc-500 mt-1">Manage your agents and their roles</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardContent className="p-4">
            <p className="text-sm text-zinc-500">Total Agents</p>
            <p className="text-2xl font-bold text-zinc-100 mt-1">{agents.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardContent className="p-4">
            <p className="text-sm text-zinc-500">Active Now</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1">
              {agents.filter(a => a.status === "active").length}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardContent className="p-4">
            <p className="text-sm text-zinc-500">Tasks Today</p>
            <p className="text-2xl font-bold text-zinc-100 mt-1">
              {agents.reduce((sum, a) => sum + a.stats.tasksToday, 0)}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardContent className="p-4">
            <p className="text-sm text-zinc-500">Active Sessions</p>
            <p className="text-2xl font-bold text-zinc-100 mt-1">
              {agents.reduce((sum, a) => sum + a.stats.sessions, 0)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Agent Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {agents.map((agent) => {
          const colors = colorVariants[agent.color as keyof typeof colorVariants];
          return (
            <Card 
              key={agent.name}
              className={`bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <Avatar className={`h-14 w-14 border ${colors.border}`}>
                    <AvatarFallback className={`text-lg font-bold ${colors.avatar}`}>
                      {agent.avatar}
                    </AvatarFallback>
                  </Avatar>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-zinc-100">{agent.name}</h3>
                      <Badge 
                        variant="outline" 
                        className={`${
                          agent.status === "active"
                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                            : "border-zinc-700 text-zinc-500"
                        }`}
                      >
                        <div className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                          agent.status === "active" ? "bg-emerald-500 animate-pulse" : "bg-zinc-500"
                        }`} />
                        {agent.status}
                      </Badge>
                    </div>
                    <p className={`text-sm ${colors.text} mb-2`}>{agent.role}</p>
                    <p className="text-sm text-zinc-500 line-clamp-2">{agent.description}</p>

                    {/* Current Task */}
                    {agent.currentTask && (
                      <div className="mt-3 p-2 rounded bg-zinc-800/50 flex items-center gap-2">
                        <Activity className="h-3 w-3 text-zinc-400" />
                        <span className="text-xs text-zinc-400">{agent.currentTask}</span>
                      </div>
                    )}

                    {/* Stats */}
                    <div className="flex gap-4 mt-4 pt-4 border-t border-zinc-800">
                      <div>
                        <p className="text-xs text-zinc-500">Tasks today</p>
                        <p className="text-sm font-medium text-zinc-200">{agent.stats.tasksToday}</p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500">Sessions</p>
                        <p className="text-sm font-medium text-zinc-200">{agent.stats.sessions}</p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500">Uptime</p>
                        <p className="text-sm font-medium text-zinc-200">{agent.stats.uptime}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
