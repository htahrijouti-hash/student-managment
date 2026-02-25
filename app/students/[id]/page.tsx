'use client';

import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function StudentDetailPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const studentId = params?.id as string;
  const [student, setStudent] = useState<any>(null);
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    status: 'active',
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated' && studentId) {
      fetchStudent();
      fetchCourses();
    }
  }, [status, studentId]);

  const fetchStudent = async () => {
    try {
      const response = await fetch(`/api/students/${studentId}`);
      if (response.ok) {
        const data = await response.json();
        setStudent(data);
        setFormData(data);
      }
    } catch (error) {
      console.error('Failed to fetch student:', error);
    }
  };

  const fetchEnrollments = async () => {
    try {
      const response = await fetch(`/api/students/${studentId}/enrollments`);
      if (response.ok) {
        const data = await response.json();
        setEnrollments(data);
      }
    } catch (error) {
      console.error('Failed to fetch enrollments:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses');
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
        fetchEnrollments();
      }
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    }
  };

  const handleUpdateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/students/${studentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchStudent();
        setEditing(false);
      }
    } catch (error) {
      console.error('Failed to update student:', error);
    }
  };

  const handleEnrollCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse) return;

    try {
      const response = await fetch(`/api/students/${studentId}/enrollments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseId: selectedCourse }),
      });

      if (response.ok) {
        setSelectedCourse('');
        fetchEnrollments();
      }
    } catch (error) {
      console.error('Failed to enroll course:', error);
    }
  };

  if (status === 'loading' || loading || !student) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="text-2xl font-bold text-gray-800">
            Student Management
          </Link>
          <Link href="/students" className="text-blue-500 hover:text-blue-700">
            Back to Students
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Student Info Card */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">
              {student.firstName} {student.lastName}
            </h1>
            <button
              onClick={() => setEditing(!editing)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition"
            >
              {editing ? 'Cancel' : 'Edit'}
            </button>
          </div>

          {editing ? (
            <form onSubmit={handleUpdateStudent} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    value={formData.address || ''}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={formData.dateOfBirth || ''}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 text-sm">Email</p>
                <p className="text-gray-800 font-semibold">{student.email}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Phone</p>
                <p className="text-gray-800 font-semibold">{student.phone || '-'}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Address</p>
                <p className="text-gray-800 font-semibold">{student.address || '-'}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Date of Birth</p>
                <p className="text-gray-800 font-semibold">{student.dateOfBirth || '-'}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Status</p>
                <p className={`font-semibold ${student.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                  {student.status}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Enrollment Date</p>
                <p className="text-gray-800 font-semibold">{student.enrollmentDate}</p>
              </div>
            </div>
          )}
        </div>

        {/* Enrollments Section */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-bold text-gray-800">Course Enrollments</h2>
          </div>

          {/* Enroll Form */}
          <form onSubmit={handleEnrollCourse} className="p-6 border-b flex gap-2">
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a course to enroll</option>
              {courses
                .filter((course: any) => !enrollments.some((e: any) => e.course_id === course.id))
                .map((course: any) => (
                  <option key={course.id} value={course.id}>
                    {course.name} ({course.code})
                  </option>
                ))}
            </select>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition"
            >
              Enroll
            </button>
          </form>

          {/* Enrollments Table */}
          {enrollments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Course</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Code</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Grade</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Enrollment Date</th>
                  </tr>
                </thead>
                <tbody>
                  {enrollments.map((enrollment: any) => (
                    <tr key={enrollment.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4">{enrollment.courseName}</td>
                      <td className="px-6 py-4">{enrollment.code}</td>
                      <td className="px-6 py-4">{enrollment.grade || '-'}</td>
                      <td className="px-6 py-4">{enrollment.enrollment_date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-6 text-center text-gray-600">
              No course enrollments yet. Enroll in a course above!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
