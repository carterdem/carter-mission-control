"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coffee, Zap } from "lucide-react";

const workstations = [
  {
    agent: "Ron",
    position: { x: 20, y: 20 },
    status: "working",
    task: "Building Mission Control",
    color: "violet",
  },
  {
    agent: "Dev",
    position: { x: 60, y: 20 },
    status: "idle",
    task: null,
    color: "sky",
  },
  {
    agent: "Writer",
    position: { x: 20, y: 60 },
    status: "working",
    task: "Drafting content",
    color: "emerald",
  },
  {
    agent: "Research",
    position: { x: 60, y: 60 },
    status: "break",
    task: null,
    color: "amber",
  },
];

const colorMap = {
  violet: { bg: "bg-violet-500", glow: "shadow-violet-500/50" },
  sky: { bg: "bg-sky-500", glow: "shadow-sky-500/50" },
  emerald: { bg: "bg-emerald-500", glow: "shadow-emerald-500/50" },
  amber: { bg: "bg-amber-500", glow: "shadow-amber-500/50" },
};

export default function OfficePage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">The Office</h1>
          <p className="text-zinc-500 mt-1">Watch your agents work in real-time</p>
        </div>
        <Badge variant="outline" className="border-violet-500/30 bg-violet-500/10 text-violet-400">
          <Zap className="h-3 w-3 mr-1" />
          2 agents working
        </Badge>
      </div>

      {/* Office View */}
      <Card className="bg-zinc-900/50 border-zinc-800 aspect-video overflow-hidden">
        <CardContent className="p-0 h-full relative">
          {/* Office Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800">
            {/* Grid pattern */}
            <div 
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `
                  linear-gradient(to right, #fff 1px, transparent 1px),
                  linear-gradient(to bottom, #fff 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
              }}
            />
          </div>

          {/* Workstations */}
          {workstations.map((ws) => {
            const colors = colorMap[ws.color as keyof typeof colorMap];
            
            return (
              <div
                key={ws.agent}
                className="absolute transition-all duration-500 hover:scale-105"
                style={{
                  left: `${ws.position.x}%`,
                  top: `${ws.position.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {/* Desk */}
                <div className="relative">
                  {/* Monitor */}
                  <div className={`
                    w-24 h-16 rounded-lg bg-zinc-800 border border-zinc-700 
                    flex items-center justify-center
                    ${ws.status === "working" ? `shadow-lg ${colors.glow}` : ""}
                  `}>
                    {ws.status === "working" && (
                      <div className="w-20 h-12 rounded bg-zinc-900 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      </div>
                    )}
                    {ws.status === "idle" && (
                      <div className="w-20 h-12 rounded bg-zinc-900/50" />
                    )}
                    {ws.status === "break" && (
                      <Coffee className="h-6 w-6 text-zinc-600" />
                    )}
                  </div>

                  {/* Monitor Stand */}
                  <div className="mx-auto w-4 h-2 bg-zinc-700 rounded-b" />
                  <div className="mx-auto w-8 h-1 bg-zinc-700 rounded" />

                  {/* Agent Avatar */}
                  <div className={`
                    absolute -bottom-6 left-1/2 -translate-x-1/2
                    w-10 h-10 rounded-full ${colors.bg}
                    flex items-center justify-center text-white font-bold text-sm
                    border-2 border-zinc-900
                    ${ws.status === "working" ? "animate-bounce" : ""}
                  `}
                  style={{ animationDuration: "2s" }}
                  >
                    {ws.agent[0]}
                  </div>

                  {/* Status Badge */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <Badge 
                      variant="outline" 
                      className={`
                        text-xs
                        ${ws.status === "working" 
                          ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400" 
                          : ws.status === "break"
                          ? "border-amber-500/50 bg-amber-500/10 text-amber-400"
                          : "border-zinc-700 bg-zinc-800 text-zinc-500"
                        }
                      `}
                    >
                      {ws.status}
                    </Badge>
                  </div>

                  {/* Name Label */}
                  <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
                    <p className="text-sm font-medium text-zinc-300">{ws.agent}</p>
                    {ws.task && (
                      <p className="text-xs text-zinc-500 mt-0.5 max-w-24 truncate">{ws.task}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Legend */}
          <div className="absolute bottom-4 right-4 flex gap-4 text-xs text-zinc-500">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              Working
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-zinc-500" />
              Idle
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              Break
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Feed */}
      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardContent className="p-4">
          <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">
            Recent Office Activity
          </h3>
          <div className="space-y-2">
            {[
              { agent: "Ron", action: "started working on Mission Control", time: "2m ago" },
              { agent: "Writer", action: "began drafting blog content", time: "15m ago" },
              { agent: "Research", action: "went on break", time: "30m ago" },
              { agent: "Dev", action: "completed coding task", time: "1h ago" },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-zinc-800/50 last:border-0">
                <span className="text-sm text-zinc-300">
                  <span className="font-medium text-zinc-100">{activity.agent}</span>
                  {" "}{activity.action}
                </span>
                <span className="text-xs text-zinc-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
