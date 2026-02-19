import { NextResponse } from 'next/server';

const CLAWDBOT_URL = process.env.CLAWDBOT_URL || 'http://localhost:18789';
const CLAWDBOT_TOKEN = process.env.CLAWDBOT_TOKEN || '';

export async function GET() {
  try {
    const response = await fetch(`${CLAWDBOT_URL}/api/sessions/list`, {
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
    console.error('Failed to fetch sessions:', error);
    // Return mock data if Clawdbot is not available
    return NextResponse.json({
      sessions: [
        { 
          sessionKey: 'agent:main:main', 
          agentId: 'main', 
          status: 'active',
          model: 'claude-opus-4-5',
          lastActivity: Date.now() - 120000,
          messageCount: 45
        },
      ]
    });
  }
}
