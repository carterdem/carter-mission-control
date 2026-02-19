"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, FileText, Calendar, Brain, FolderOpen } from "lucide-react";
import { useState } from "react";

const memoryFiles = [
  { name: "2026-02-19.md", type: "daily", size: "4.2 KB", date: "Today", preview: "Mission Control build started..." },
  { name: "2026-02-18.md", type: "daily", size: "12.1 KB", date: "Yesterday", preview: "Memory enhancements from Kevin's guide..." },
  { name: "2026-02-17.md", type: "daily", size: "8.3 KB", date: "2 days ago", preview: "Trove signal engine progress..." },
  { name: "MEMORY.md", type: "core", size: "15.2 KB", date: "Updated today", preview: "Core long-term memories and context..." },
  { name: "notion/Appealio.md", type: "synced", size: "11.2 KB", date: "Synced 2h ago", preview: "Appealio master brief and strategy..." },
  { name: "notion/Trove.md", type: "synced", size: "3.8 KB", date: "Synced 2h ago", preview: "Trove project documentation..." },
];

const folders = [
  { name: "Daily Notes", count: 45, icon: Calendar },
  { name: "Projects", count: 12, icon: FolderOpen },
  { name: "Notion Sync", count: 184, icon: Brain },
];

const typeColors = {
  daily: "border-sky-500/30 bg-sky-500/10 text-sky-400",
  core: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  synced: "border-violet-500/30 bg-violet-500/10 text-violet-400",
};

export default function MemoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  return (
    <div className="p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Memory Browser</h1>
          <p className="text-zinc-500 mt-1">Search and browse all agent memories</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
        <Input
          placeholder="Search memories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-zinc-900 border-zinc-800 focus:border-violet-500 text-zinc-100 placeholder:text-zinc-500"
        />
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
        {/* Folders */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
              Folders
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {folders.map((folder) => (
              <button
                key={folder.name}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-800 transition-colors text-left"
              >
                <folder.icon className="h-4 w-4 text-zinc-400" />
                <span className="flex-1 text-sm text-zinc-200">{folder.name}</span>
                <Badge variant="secondary" className="bg-zinc-800 text-zinc-500 text-xs">
                  {folder.count}
                </Badge>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Files List */}
        <Card className="lg:col-span-2 bg-zinc-900/50 border-zinc-800 flex flex-col min-h-0">
          <CardHeader className="pb-3 flex-shrink-0">
            <CardTitle className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
              Files
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 min-h-0">
            <ScrollArea className="h-full">
              <div className="space-y-2 pr-4">
                {memoryFiles.map((file) => (
                  <button
                    key={file.name}
                    onClick={() => setSelectedFile(file.name)}
                    className={`w-full p-4 rounded-lg text-left transition-colors ${
                      selectedFile === file.name
                        ? "bg-violet-500/10 border border-violet-500/30"
                        : "bg-zinc-800/50 hover:bg-zinc-800 border border-transparent"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-zinc-400" />
                        <span className="font-medium text-zinc-100 text-sm">{file.name}</span>
                      </div>
                      <Badge variant="outline" className={typeColors[file.type as keyof typeof typeColors]}>
                        {file.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-zinc-500 line-clamp-1 mb-2">{file.preview}</p>
                    <div className="flex items-center gap-3 text-xs text-zinc-600">
                      <span>{file.size}</span>
                      <span>•</span>
                      <span>{file.date}</span>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card className="bg-zinc-900/50 border-zinc-800 flex flex-col min-h-0">
          <CardHeader className="pb-3 flex-shrink-0">
            <CardTitle className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
              Preview
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 min-h-0">
            {selectedFile ? (
              <ScrollArea className="h-full">
                <div className="prose prose-invert prose-sm max-w-none">
                  <h3 className="text-zinc-100">{selectedFile}</h3>
                  <p className="text-zinc-400">
                    Memory content would be rendered here with markdown formatting...
                  </p>
                  <p className="text-zinc-500 text-sm mt-4">
                    Click &quot;View Full&quot; to open the complete memory file.
                  </p>
                </div>
              </ScrollArea>
            ) : (
              <div className="h-full flex items-center justify-center text-zinc-500 text-sm">
                Select a file to preview
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
