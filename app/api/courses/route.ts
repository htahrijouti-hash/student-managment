import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getDB } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const db = getDB();
    const courses = db.prepare('SELECT * FROM courses ORDER BY name').all();
    
    return NextResponse.json(courses);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, code, description, credits } = body;

    if (!name || !code) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const db = getDB();
    
    const result = db.prepare(`
      INSERT INTO courses (name, code, description, credits)
      VALUES (?, ?, ?, ?)
    `).run(name, code, description || null, credits || 3);

    const course = db.prepare('SELECT * FROM courses WHERE id = ?').get(result.lastInsertRowid);
    
    return NextResponse.json(course, { status: 201 });
  } catch (error: any) {
    if (error.message.includes('UNIQUE constraint failed')) {
      return NextResponse.json({ error: 'Course code already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
