import { NextResponse } from 'next/server';

const CLAWDBOT_URL = process.env.CLAWDBOT_URL || 'http://localhost:18789';
const CLAWDBOT_TOKEN = process.env.CLAWDBOT_TOKEN || '';

export async function GET() {
  try {
    const response = await fetch(`${CLAWDBOT_URL}/api/cron/list`, {
      headers: {
        'Authorization': `Bearer ${CLAWDBOT_TOKEN}`,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Clawdbot API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to fetch cron jobs:', error);
    // Return mock data if Clawdbot is not available
    return NextResponse.json({
      jobs: [
        { id: '1', name: 'Daily AM Plan', schedule: { expr: '30 7 * * *' }, enabled: true, state: { nextRunAtMs: Date.now() + 3600000 } },
        { id: '2', name: 'Notion Sync', schedule: { expr: '0 */4 * * *' }, enabled: true, state: { nextRunAtMs: Date.now() + 7200000 } },
        { id: '3', name: 'Pain Point Radar', schedule: { expr: '0 22 * * *' }, enabled: true, state: { nextRunAtMs: Date.now() + 28800000 } },
        { id: '4', name: 'Newsletter Intelligence', schedule: { expr: '0 6 * * *' }, enabled: true, state: { nextRunAtMs: Date.now() + 43200000 } },
        { id: '5', name: 'Nightly Blog Content', schedule: { expr: '30 23 * * *' }, enabled: true, state: { nextRunAtMs: Date.now() + 36000000 } },
        { id: '6', name: 'PolicyBot Session Check', schedule: { expr: '0 9 * * *' }, enabled: true, state: { nextRunAtMs: Date.now() + 50400000 } },
      ]
    });
  }
}
