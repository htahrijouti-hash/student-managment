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
    const enrollments = db.prepare(`
      SELECT e.*, c.name as courseName, c.code 
      FROM enrollments e
      JOIN courses c ON e.course_id = c.id
      WHERE e.student_id = ?
    `).all(params.id);
    
    return NextResponse.json(enrollments);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { courseId } = body;

    if (!courseId) {
      return NextResponse.json({ error: 'Missing courseId' }, { status: 400 });
    }

    const db = getDB();
    
    // Check if student exists
    const student = db.prepare('SELECT * FROM students WHERE id = ?').get(params.id);
    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    // Check if course exists
    const course = db.prepare('SELECT * FROM courses WHERE id = ?').get(courseId);
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    const enrollmentDate = new Date().toISOString().split('T')[0];
    
    const result = db.prepare(`
      INSERT INTO enrollments (student_id, course_id, enrollment_date)
      VALUES (?, ?, ?)
    `).run(params.id, courseId, enrollmentDate);

    const enrollment = db.prepare('SELECT * FROM enrollments WHERE id = ?').get(result.lastInsertRowid);
    
    return NextResponse.json(enrollment, { status: 201 });
  } catch (error: any) {
    if (error.message.includes('UNIQUE constraint failed')) {
      return NextResponse.json({ error: 'Student already enrolled in this course' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
