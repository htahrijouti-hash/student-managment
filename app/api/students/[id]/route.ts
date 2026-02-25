import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getDB } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const db = getDB();
    const student = db.prepare('SELECT * FROM students WHERE id = ?').get(params.id);
    
    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    return NextResponse.json(student);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { firstName, lastName, email, phone, address, dateOfBirth, status } = body;

    const db = getDB();
    const student = db.prepare('SELECT * FROM students WHERE id = ?').get(params.id);
    
    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    const updatedAt = new Date().toISOString();

    db.prepare(`
      UPDATE students 
      SET firstName = ?, lastName = ?, email = ?, phone = ?, address = ?, dateOfBirth = ?, status = ?, updated_at = ?
      WHERE id = ?
    `).run(
      firstName || (student as any).firstName,
      lastName || (student as any).lastName,
      email || (student as any).email,
      phone !== undefined ? phone : (student as any).phone,
      address !== undefined ? address : (student as any).address,
      dateOfBirth !== undefined ? dateOfBirth : (student as any).dateOfBirth,
      status || (student as any).status,
      updatedAt,
      params.id
    );

    const updated = db.prepare('SELECT * FROM students WHERE id = ?').get(params.id);
    return NextResponse.json(updated);
  } catch (error: any) {
    if (error.message.includes('UNIQUE constraint failed')) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const db = getDB();
    const student = db.prepare('SELECT * FROM students WHERE id = ?').get(params.id);
    
    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    // Delete enrollments first
    db.prepare('DELETE FROM enrollments WHERE student_id = ?').run(params.id);
    
    // Delete student
    db.prepare('DELETE FROM students WHERE id = ?').run(params.id);

    return NextResponse.json({ message: 'Student deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
