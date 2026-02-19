"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  Clock, 
  Zap, 
  Brain,
  TrendingUp,
  Activity
} from "lucide-react";

const stats = [
  { 
    label: "Tasks Completed", 
    value: "23", 
    change: "+5 today",
    icon: CheckCircle2,
    color: "text-emerald-400"
  },
  { 
    label: "Active Sessions", 
    value: "3", 
    change: "2 subagents",
    icon: Activity,
    color: "text-violet-400"
  },
  { 
    label: "Memory Entries", 
    value: "184", 
    change: "+12 this week",
    icon: Brain,
    color: "text-amber-400"
  },
  { 
    label: "Cron Jobs", 
    value: "6", 
    change: "All healthy",
    icon: Clock,
    color: "text-sky-400"
  },
];

const recentActivity = [
  { action: "Completed Notion sync", time: "2 min ago", type: "success" },
  { action: "Memory flush triggered", time: "15 min ago", type: "info" },
  { action: "Pain Point Radar scan", time: "1 hour ago", type: "success" },
  { action: "Newsletter processed", time: "3 hours ago", type: "info" },
  { action: "Blog article drafted", time: "5 hours ago", type: "success" },
];

const upcomingTasks = [
  { title: "AM Plan Generation", time: "7:30 AM", status: "scheduled" },
  { title: "Notion Sync", time: "Every 4h", status: "recurring" },
  { title: "Pain Point Radar", time: "10:00 PM", status: "scheduled" },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Dashboard</h1>
          <p className="text-zinc-500 mt-1">Welcome back. Here&apos;s what&apos;s happening.</p>
        </div>
        <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
          <div className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          System Online
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-colors">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-zinc-500">{stat.label}</p>
                  <p className="text-3xl font-bold text-zinc-100 mt-1">{stat.value}</p>
                  <p className="text-xs text-zinc-500 mt-1">{stat.change}</p>
                </div>
                <div className={`p-2.5 rounded-lg bg-zinc-800 ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 bg-zinc-900/50 border-zinc-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-zinc-100 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-violet-400" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((item, i) => (
                <div 
                  key={i} 
                  className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-2 w-2 rounded-full ${
                      item.type === "success" ? "bg-emerald-500" : "bg-sky-500"
                    }`} />
                    <span className="text-sm text-zinc-200">{item.action}</span>
                  </div>
                  <span className="text-xs text-zinc-500">{item.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-zinc-100 flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-400" />
              Upcoming
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingTasks.map((task, i) => (
                <div 
                  key={i}
                  className="p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-zinc-200">{task.title}</span>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        task.status === "recurring" 
                          ? "border-violet-500/30 text-violet-400" 
                          : "border-zinc-700 text-zinc-400"
                      }`}
                    >
                      {task.status}
                    </Badge>
                  </div>
                  <span className="text-xs text-zinc-500">{task.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-zinc-100 flex items-center gap-2">
            <Zap className="h-4 w-4 text-violet-400" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {["Run Notion Sync", "Check Sessions", "View Memory", "Trigger AM Plan"].map((action) => (
              <button
                key={action}
                className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-sm text-zinc-200 transition-colors"
              >
                {action}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
