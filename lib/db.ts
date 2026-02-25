// In-memory database mock for development
// For production, use a real database like PostgreSQL

interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  role: string;
}

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  enrollmentDate: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface Course {
  id: string;
  name: string;
  code: string;
  description?: string;
  credits: number;
  created_at: string;
}

interface Enrollment {
  id: string;
  student_id: string;
  course_id: string;
  grade?: string;
  status: string;
  enrollment_date: string;
  created_at: string;
}

// In-memory store
const store = {
  users: [] as User[],
  students: [] as Student[],
  courses: [] as Course[],
  enrollments: [] as Enrollment[],
  initialized: false,
};

export function getDB() {
  // Initialize default data if not already done
  if (!store.initialized) {
    initializeDatabase();
  }
  
  return {
    prepare: (sql: string) => ({
      all: (params?: any) => executeQuery(sql, params, 'all'),
      get: (params?: any) => executeQuery(sql, params, 'get'),
      run: (params?: any) => executeQuery(sql, params, 'run'),
    }),
    pragma: (sql: string) => {},
    exec: (sql: string) => {},
  };
}

function initializeDatabase() {
  // Add sample admin user
  const adminId = generateId();
  store.users.push({
    id: adminId,
    email: 'admin@example.com',
    name: 'Admin User',
    password: '$2a$10$nOUIs5kJ7naTuTFkWK1Be.JjReWZL4S7zD8KK4q8SZHjVmjHpjVRi', // admin123 hashed
    role: 'admin',
  });

  // Add sample courses
  const courses = [
    {
      id: generateId(),
      name: 'Introduction to Computer Science',
      code: 'CS101',
      description: 'Fundamentals of programming',
      credits: 3,
    },
    {
      id: generateId(),
      name: 'Data Structures',
      code: 'CS201',
      description: 'Learn about arrays, lists, trees, etc.',
      credits: 4,
    },
    {
      id: generateId(),
      name: 'Web Development',
      code: 'CS301',
      description: 'HTML, CSS, JavaScript basics',
      credits: 3,
    },
    {
      id: generateId(),
      name: 'Database Management',
      code: 'CS302',
      description: 'SQL and database design',
      credits: 4,
    },
  ];

  courses.forEach(course => {
    store.courses.push({
      ...course,
      created_at: new Date().toISOString(),
    });
  });

  // Add sample students
  const enrollmentDate = new Date().toISOString().split('T')[0];
  const students = [
    {
      id: generateId(),
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
    },
    {
      id: generateId(),
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      phone: '098-765-4321',
    },
    {
      id: generateId(),
      firstName: 'Bob',
      lastName: 'Johnson',
      email: 'bob@example.com',
      phone: '555-1234',
    },
  ];

  students.forEach(student => {
    store.students.push({
      ...student,
      address: undefined,
      dateOfBirth: undefined,
      enrollmentDate,
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  });

  store.initialized = true;
}

function executeQuery(sql: string, params: any, type: string): any {
  // Parse simple SQL for demo purposes
  if (sql.includes('SELECT * FROM users WHERE email')) {
    const email = Array.isArray(params) ? params[0] : params;
    return store.users.find(u => u.email === email);
  }
  
  if (sql.includes('SELECT * FROM students ORDER BY')) {
    return store.students;
  }
  
  if (sql.includes('SELECT * FROM students WHERE id')) {
    const id = Array.isArray(params) ? params[0] : params;
    return store.students.find(s => s.id === String(id));
  }
  
  if (sql.includes('INSERT INTO students')) {
    const id = generateId();
    const student: Student = {
      id,
      firstName: params[0],
      lastName: params[1],
      email: params[2],
      phone: params[3],
      address: params[4],
      dateOfBirth: params[5],
      enrollmentDate: params[6],
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    store.students.push(student);
    return { lastInsertRowid: id };
  }
  
  if (sql.includes('UPDATE students')) {
    const id = Array.isArray(params) ? params[params.length - 1] : params;
    const student = store.students.find(s => s.id === String(id));
    if (student) {
      student.firstName = params[0] || student.firstName;
      student.lastName = params[1] || student.lastName;
      student.email = params[2] || student.email;
      student.phone = params[3];
      student.address = params[4];
      student.dateOfBirth = params[5];
      student.status = params[6] || student.status;
      student.updated_at = new Date().toISOString();
    }
  }
  
  if (sql.includes('DELETE FROM students')) {
    const id = Array.isArray(params) ? params[0] : params;
    const index = store.students.findIndex(s => s.id === String(id));
    if (index > -1) store.students.splice(index, 1);
  }
  
  if (sql.includes('SELECT * FROM courses')) {
    return store.courses;
  }
  
  if (sql.includes('INSERT INTO courses')) {
    const id = generateId();
    store.courses.push({
      id,
      name: params[0],
      code: params[1],
      description: params[2],
      credits: params[3] || 3,
      created_at: new Date().toISOString(),
    });
    return { lastInsertRowid: id };
  }
  
  if (sql.includes('SELECT * FROM enrollments')) {
    return store.enrollments;
  }
  
  return null;
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

export function closeDB() {
  // No-op for in-memory database
}

