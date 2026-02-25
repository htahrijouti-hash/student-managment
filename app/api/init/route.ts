import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getDB } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const db = getDB();
    
    // Check if admin already exists
    const adminExists = db.prepare("SELECT * FROM users WHERE email = 'admin@example.com'").get();
    if (adminExists) {
      return NextResponse.json({ message: 'Database already initialized' });
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    db.prepare(`
      INSERT INTO users (email, name, password, role)
      VALUES (?, ?, ?, ?)
    `).run('admin@example.com', 'Admin User', hashedPassword, 'admin');

    // Add sample courses
    const courses = [
      { name: 'Introduction to Computer Science', code: 'CS101', description: 'Fundamentals of programming', credits: 3 },
      { name: 'Data Structures', code: 'CS201', description: 'Learn about arrays, lists, trees, etc.', credits: 4 },
      { name: 'Web Development', code: 'CS301', description: 'HTML, CSS, JavaScript basics', credits: 3 },
      { name: 'Database Management', code: 'CS302', description: 'SQL and database design', credits: 4 },
    ];

    courses.forEach(course => {
      db.prepare(`
        INSERT INTO courses (name, code, description, credits)
        VALUES (?, ?, ?, ?)
      `).run(course.name, course.code, course.description, course.credits);
    });

    // Add sample students
    const students = [
      { firstName: 'John', lastName: 'Doe', email: 'john@example.com', phone: '123-456-7890' },
      { firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', phone: '098-765-4321' },
      { firstName: 'Bob', lastName: 'Johnson', email: 'bob@example.com', phone: '555-1234' },
    ];

    const enrollmentDate = new Date().toISOString().split('T')[0];
    
    students.forEach(student => {
      db.prepare(`
        INSERT INTO students (firstName, lastName, email, phone, enrollmentDate)
        VALUES (?, ?, ?, ?, ?)
      `).run(student.firstName, student.lastName, student.email, student.phone, enrollmentDate);
    });

    return NextResponse.json({ 
      message: 'Database initialized successfully',
      admin: { email: 'admin@example.com', password: 'admin123' }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Initialization failed' }, { status: 500 });
  }
}
