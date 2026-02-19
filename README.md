# Mission Control 🎮

A sleek, dark-mode command center for managing your AI agent ecosystem. Track tasks, view calendars, browse memories, and manage your agent team — all from your phone or computer.

![Mission Control](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-06B6D4?logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)

## Features

- **📊 Dashboard** — Stats overview, activity feed, quick actions
- **📋 Tasks Board** — Kanban-style task management with drag-and-drop ready cards
- **📅 Calendar** — View scheduled tasks and cron jobs
- **🧠 Memory Browser** — Search and browse all agent memories with preview
- **👥 Team View** — Manage agents with status, roles, and live stats
- **🏢 Office** — Fun visual representation of agents at work

## Tech Stack

- **Next.js 14** — React framework with App Router
- **Tailwind CSS** — Utility-first styling
- **shadcn/ui** — Beautiful, accessible components
- **TypeScript** — Type-safe development

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/carterdem/carter-mission-control.git
cd carter-mission-control

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploy to Vercel

The easiest way to deploy is with [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/carterdem/carter-mission-control)

Or manually:

1. Push your code to GitHub (done ✅)
2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import `carter-mission-control` from GitHub
5. Click "Deploy"

That's it! You'll get a URL like `carter-mission-control.vercel.app`

## Environment Variables

For connecting to your Clawdbot instance (optional):

```env
CLAWDBOT_URL=http://localhost:18789
CLAWDBOT_TOKEN=your-token-here
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Dashboard
│   ├── tasks/page.tsx    # Kanban board
│   ├── calendar/page.tsx # Calendar view
│   ├── memory/page.tsx   # Memory browser
│   ├── team/page.tsx     # Agent management
│   └── office/page.tsx   # Visual workspace
├── components/
│   ├── app-sidebar.tsx   # Navigation sidebar
│   └── ui/               # shadcn components
└── lib/
    └── utils.ts          # Utility functions
```

## Customization

- **Colors**: Edit `tailwind.config.ts` and `globals.css`
- **Agents**: Modify the agents array in `/team/page.tsx`
- **Cron Jobs**: Update `cronJobs` in `/calendar/page.tsx`
- **Tasks**: Edit `initialColumns` in `/tasks/page.tsx`

## License

MIT
