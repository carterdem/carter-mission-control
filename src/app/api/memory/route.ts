import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const MEMORY_DIR = process.env.MEMORY_DIR || '/home/clawdbot/clawd/memory';

interface MemoryFile {
  name: string;
  path: string;
  size: number;
  modified: string;
  type: 'daily' | 'core' | 'synced';
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filePath = searchParams.get('file');
  const search = searchParams.get('search');

  try {
    // If file path is provided, return the content
    if (filePath) {
      const fullPath = path.join(MEMORY_DIR, filePath);
      const content = await fs.readFile(fullPath, 'utf-8');
      return NextResponse.json({ content });
    }

    // List all memory files
    const files = await listMemoryFiles(MEMORY_DIR);
    
    // Filter by search if provided
    let filteredFiles = files;
    if (search) {
      const searchLower = search.toLowerCase();
      filteredFiles = files.filter(f => 
        f.name.toLowerCase().includes(searchLower)
      );
    }

    return NextResponse.json({ files: filteredFiles });
  } catch (error) {
    console.error('Failed to read memory files:', error);
    // Return mock data if file system is not available
    return NextResponse.json({
      files: [
        { name: '2026-02-19.md', path: '2026-02-19.md', size: 3162, modified: new Date().toISOString(), type: 'daily' },
        { name: '2026-02-18.md', path: '2026-02-18.md', size: 12100, modified: new Date(Date.now() - 86400000).toISOString(), type: 'daily' },
        { name: 'MEMORY.md', path: 'MEMORY.md', size: 15200, modified: new Date().toISOString(), type: 'core' },
      ]
    });
  }
}

async function listMemoryFiles(dir: string, prefix = ''): Promise<MemoryFile[]> {
  const files: MemoryFile[] = [];
  
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name;
      
      if (entry.isDirectory() && !entry.name.startsWith('.')) {
        // Recursively list subdirectories (like notion/)
        const subFiles = await listMemoryFiles(path.join(dir, entry.name), relativePath);
        files.push(...subFiles);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        const filePath = path.join(dir, entry.name);
        const stats = await fs.stat(filePath);
        
        let type: MemoryFile['type'] = 'daily';
        if (entry.name === 'MEMORY.md') type = 'core';
        else if (prefix.includes('notion')) type = 'synced';
        
        files.push({
          name: entry.name,
          path: relativePath,
          size: stats.size,
          modified: stats.mtime.toISOString(),
          type,
        });
      }
    }
  } catch {
    // Directory doesn't exist or can't be read
  }
  
  return files.sort((a, b) => new Date(b.modified).getTime() - new Date(a.modified).getTime());
}
