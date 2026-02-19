"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Clock, Repeat, Bell } from "lucide-react";
import { useState } from "react";

const cronJobs = [
  { 
    name: "Daily AM Plan", 
    schedule: "7:30 AM", 
    type: "daily",
    status: "active",
    nextRun: "Tomorrow 7:30 AM"
  },
  { 
    name: "Newsletter Intelligence", 
    schedule: "6:00 AM", 
    type: "daily",
    status: "active",
    nextRun: "Tomorrow 6:00 AM"
  },
  { 
    name: "Notion Sync", 
    schedule: "Every 4h", 
    type: "recurring",
    status: "active",
    nextRun: "In 2h 45m"
  },
  { 
    name: "Pain Point Radar", 
    schedule: "10:00 PM", 
    type: "daily",
    status: "active",
    nextRun: "Tonight 10:00 PM"
  },
  { 
    name: "Nightly Blog Content", 
    schedule: "11:30 PM", 
    type: "daily",
    status: "active",
    nextRun: "Tonight 11:30 PM"
  },
  { 
    name: "PolicyBot Session Check", 
    schedule: "9:00 AM", 
    type: "daily",
    status: "active",
    nextRun: "Tomorrow 9:00 AM"
  },
];

const upcomingEvents = [
  { title: "AM Plan Generation", time: "7:30 AM", date: "Tomorrow" },
  { title: "Weekly Review", time: "7:00 PM", date: "Sunday" },
];

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">Calendar</h1>
        <p className="text-zinc-500 mt-1">View scheduled tasks and cron jobs</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Widget */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardContent className="p-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md"
            />
          </CardContent>
        </Card>

        {/* Cron Jobs */}
        <Card className="lg:col-span-2 bg-zinc-900/50 border-zinc-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-zinc-100 flex items-center gap-2">
              <Repeat className="h-4 w-4 text-violet-400" />
              Scheduled Jobs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {cronJobs.map((job, i) => (
                <div 
                  key={i}
                  className="flex items-center justify-between p-4 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-zinc-900">
                      <Clock className="h-4 w-4 text-zinc-400" />
                    </div>
                    <div>
                      <p className="font-medium text-zinc-100">{job.name}</p>
                      <p className="text-sm text-zinc-500">{job.schedule}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-xs text-zinc-500">Next run</p>
                      <p className="text-sm text-zinc-300">{job.nextRun}</p>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`${
                        job.type === "recurring"
                          ? "border-violet-500/30 bg-violet-500/10 text-violet-400"
                          : "border-sky-500/30 bg-sky-500/10 text-sky-400"
                      }`}
                    >
                      {job.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-zinc-100 flex items-center gap-2">
            <Bell className="h-4 w-4 text-amber-400" />
            Upcoming Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingEvents.map((event, i) => (
              <div
                key={i}
                className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-800"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-zinc-100">{event.title}</p>
                    <p className="text-sm text-zinc-500 mt-1">{event.time}</p>
                  </div>
                  <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                    {event.date}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
