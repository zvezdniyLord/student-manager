import React, { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { Student } from '../App'

interface AdminPanelProps {
  students: Student[]
  addStudent: (student: Student) => void
}

const AdminPanel: React.FC<AdminPanelProps> = ({ students, addStudent }) => {
  const [newStudent, setNewStudent] = useState<Omit<Student, 'id' | 'competencies'>>({
    name: '',
    email: '',
    major: '',
    specialty: ''
  })

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault()
    const studentToAdd: Student = {
      ...newStudent,
      id: Date.now(),
      competencies: {}
    }
    addStudent(studentToAdd)
    setNewStudent({ name: '', email: '', major: '', specialty: '' })
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Admin Panel - Manage Students</h3>
      <form onSubmit={handleAddStudent} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={newStudent.name}
            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={newStudent.email}
            onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label htmlFor="major" className="block text-sm font-medium text-gray-700">
            Major
          </label>
          <input
            type="text"
            id="major"
            value={newStudent.major}
            onChange={(e) => setNewStudent({ ...newStudent, major: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label htmlFor="specialty" className="block text-sm font-medium text-gray-700">
            Specialty
          </label>
          <input
            type="text"
            id="specialty"
            value={newStudent.specialty}
            onChange={(e) => setNewStudent({ ...newStudent, specialty: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 flex items-center justify-center"
        >
          <Plus className="mr-2" size={20} />
          Add Student
        </button>
      </form>
      <div>
        <h4 className="text-lg font-medium mb-2">Student List</h4>
        <ul className="space-y-2">
          {students.map((student) => (
            <li key={student.id} className="flex justify-between items-center bg-gray-50 p-2 rounded">
              <span>{student.name} - {student.email}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default AdminPanel