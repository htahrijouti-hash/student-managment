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
    const students = db.prepare('SELECT * FROM students ORDER BY created_at DESC').all();
    
    return NextResponse.json(students);
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
    const { firstName, lastName, email, phone, address, dateOfBirth } = body;

    if (!firstName || !lastName || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const db = getDB();
    const enrollmentDate = new Date().toISOString().split('T')[0];
    
    const result = db.prepare(`
      INSERT INTO students (firstName, lastName, email, phone, address, dateOfBirth, enrollmentDate)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(firstName, lastName, email, phone || null, address || null, dateOfBirth || null, enrollmentDate);

    const student = db.prepare('SELECT * FROM students WHERE id = ?').get(result.lastInsertRowid);
    
    return NextResponse.json(student, { status: 201 });
  } catch (error: any) {
    if (error.message.includes('UNIQUE constraint failed')) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
