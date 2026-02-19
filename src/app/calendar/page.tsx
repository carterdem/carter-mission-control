"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Clock, Repeat, Bell, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface CronJob {
  id: string;
  name: string;
  schedule: { expr: string; tz?: string };
  enabled: boolean;
  state?: { nextRunAtMs?: number; lastRunAtMs?: number };
}

function formatNextRun(timestamp?: number): string {
  if (!timestamp) return "Unknown";
  const diff = timestamp - Date.now();
  if (diff < 0) return "Overdue";
  if (diff < 3600000) return `In ${Math.round(diff / 60000)}m`;
  if (diff < 86400000) return `In ${Math.round(diff / 3600000)}h`;
  return new Date(timestamp).toLocaleDateString();
}

function parseSchedule(expr: string): string {
  // Simple cron expression parser
  const parts = expr.split(" ");
  if (parts.length < 5) return expr;
  
  const [min, hour, , , ] = parts;
  
  if (expr.includes("*/")) {
    const interval = expr.match(/\*\/(\d+)/)?.[1];
    return `Every ${interval}h`;
  }
  
  if (hour !== "*" && min !== "*") {
    const h = parseInt(hour);
    const m = parseInt(min);
    const period = h >= 12 ? "PM" : "AM";
    const displayHour = h > 12 ? h - 12 : h === 0 ? 12 : h;
    return `${displayHour}:${m.toString().padStart(2, "0")} ${period}`;
  }
  
  return expr;
}

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [cronJobs, setCronJobs] = useState<CronJob[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCronJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/cron");
      const data = await res.json();
      setCronJobs(data.jobs || []);
    } catch (error) {
      console.error("Failed to fetch cron jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCronJobs();
    // Refresh every minute
    const interval = setInterval(fetchCronJobs, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Calendar</h1>
          <p className="text-zinc-500 mt-1">View scheduled tasks and cron jobs</p>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={fetchCronJobs}
          className="border-zinc-700 text-zinc-300"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
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
              <Badge variant="secondary" className="ml-2 bg-zinc-800 text-zinc-400">
                {cronJobs.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading && cronJobs.length === 0 ? (
              <div className="flex items-center justify-center py-8 text-zinc-500">
                <RefreshCw className="h-5 w-5 animate-spin mr-2" />
                Loading jobs...
              </div>
            ) : (
              <div className="space-y-2">
                {cronJobs.map((job) => (
                  <div 
                    key={job.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${job.enabled ? "bg-zinc-900" : "bg-zinc-900/50"}`}>
                        <Clock className={`h-4 w-4 ${job.enabled ? "text-zinc-400" : "text-zinc-600"}`} />
                      </div>
                      <div>
                        <p className={`font-medium ${job.enabled ? "text-zinc-100" : "text-zinc-500"}`}>
                          {job.name}
                        </p>
                        <p className="text-sm text-zinc-500">{parseSchedule(job.schedule.expr)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-xs text-zinc-500">Next run</p>
                        <p className="text-sm text-zinc-300">{formatNextRun(job.state?.nextRunAtMs)}</p>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={job.enabled 
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                          : "border-zinc-700 text-zinc-500"
                        }
                      >
                        {job.enabled ? "active" : "disabled"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-zinc-100 flex items-center gap-2">
            <Bell className="h-4 w-4 text-amber-400" />
            Next 24 Hours
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cronJobs
              .filter(job => job.enabled && job.state?.nextRunAtMs && job.state.nextRunAtMs < Date.now() + 86400000)
              .sort((a, b) => (a.state?.nextRunAtMs || 0) - (b.state?.nextRunAtMs || 0))
              .slice(0, 6)
              .map((job) => (
                <div
                  key={job.id}
                  className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-800"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-zinc-100">{job.name}</p>
                      <p className="text-sm text-zinc-500 mt-1">{parseSchedule(job.schedule.expr)}</p>
                    </div>
                    <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                      {formatNextRun(job.state?.nextRunAtMs)}
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
