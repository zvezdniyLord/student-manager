import React, { useState } from 'react'
import { User, BookOpen, Settings, LogOut } from 'lucide-react'
import StudentEditForm from './components/StudentEditForm'
import CompetencyMatrix from './components/CompetencyMatrix'
import AdminPanel from './components/AdminPanel'
import AdminLogin from './components/AdminLogin'
import StudentLogin from './components/StudentLogin'

export interface Student {
  id: number
  name: string
  email: string
  major: string
  specialty: string
  competencies: { [key: string]: number }
}

export interface User {
  username: string
  role: 'admin' | 'student'
  studentData?: Student
}

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [currentPage, setCurrentPage] = useState<'profile' | 'matrix' | 'admin'>('profile')
  const [students, setStudents] = useState<Student[]>([])
  const [loginType, setLoginType] = useState<'admin' | 'student' | null>(null)

  const adminLogin = (username: string, password: string) => {
    if (username === 'admin' && password === 'admin') {
      setCurrentUser({ username: 'admin', role: 'admin' })
    } else {
      alert('Invalid admin credentials')
    }
  }

  const studentLogin = (email: string) => {
    const student = students.find(s => s.email === email)
    if (student) {
      setCurrentUser({
        username: student.name,
        role: 'student',
        studentData: student
      })
    } else {
      alert('Invalid student email')
    }
  }

  const logout = () => {
    setCurrentUser(null)
    setCurrentPage('profile')
    setLoginType(null)
  }

  const updateStudent = (updatedStudent: Student) => {
    if (currentUser && currentUser.role === 'student') {
      setCurrentUser({
        ...currentUser,
        studentData: updatedStudent
      })
      setStudents(students.map(s => s.id === updatedStudent.id ? updatedStudent : s))
    }
  }

  const addStudent = (newStudent: Student) => {
    setStudents([...students, newStudent])
  }

  const renderPage = () => {
    if (!currentUser) {
      if (!loginType) {
        return (
          <div className="space-y-4">
            <button
              onClick={() => setLoginType('admin')}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Admin Login
            </button>
            <button
              onClick={() => setLoginType('student')}
              className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Student Login
            </button>
          </div>
        )
      }
      return loginType === 'admin' ? (
        <AdminLogin onLogin={adminLogin} />
      ) : (
        <StudentLogin onLogin={studentLogin} />
      )
    }

    switch (currentPage) {
      case 'profile':
        return currentUser.role === 'student' && currentUser.studentData ? (
          <StudentEditForm student={currentUser.studentData} updateStudent={updateStudent} />
        ) : (
          <div>Admin profile not available</div>
        )
      case 'matrix':
        return currentUser.studentData ? (
          <CompetencyMatrix student={currentUser.studentData} isAdmin={currentUser.role === 'admin'} />
        ) : null
      case 'admin':
        return currentUser.role === 'admin' ? (
          <AdminPanel students={students} addStudent={addStudent} />
        ) : (
          <div>Access denied. Admin rights required.</div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8 text-blue-600">Student Competency Manager</h1>
      {currentUser && (
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <User className="text-blue-500 mr-3" size={48} />
              <h2 className="text-2xl font-semibold">{currentUser.username} ({currentUser.role})</h2>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 rounded-md flex items-center bg-red-500 text-white hover:bg-red-600"
            >
              <LogOut className="mr-2" size={20} />
              Logout
            </button>
          </div>
          <div className="flex justify-center space-x-4 mb-6">
            {currentUser.role === 'student' && (
              <button
                onClick={() => setCurrentPage('profile')}
                className={`px-4 py-2 rounded-md flex items-center ${
                  currentPage === 'profile' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                <User className="mr-2" size={20} />
                Edit Profile
              </button>
            )}
            <button
              onClick={() => setCurrentPage('matrix')}
              className={`px-4 py-2 rounded-md flex items-center ${
                currentPage === 'matrix' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              <BookOpen className="mr-2" size={20} />
              Competency Matrix
            </button>
            {currentUser.role === 'admin' && (
              <button
                onClick={() => setCurrentPage('admin')}
                className={`px-4 py-2 rounded-md flex items-center ${
                  currentPage === 'admin' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                <Settings className="mr-2" size={20} />
                Admin Panel
              </button>
            )}
          </div>
          {renderPage()}
        </div>
      )}
      {!currentUser && (
        <div className="w-full max-w-md">
          {renderPage()}
        </div>
      )}
    </div>
  )
}

export default App