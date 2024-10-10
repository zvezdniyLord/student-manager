import React, { useState, useEffect } from 'react'
import { Student } from '../App'

interface StudentEditFormProps {
  student: Student
  updateStudent: (student: Student) => void
}

const StudentEditForm: React.FC<StudentEditFormProps> = ({ student, updateStudent }) => {
  const [name, setName] = useState(student.name)
  const [email, setEmail] = useState(student.email)
  const [major, setMajor] = useState(student.major)
  const [specialty, setSpecialty] = useState(student.specialty)

  useEffect(() => {
    setName(student.name)
    setEmail(student.email)
    setMajor(student.major)
    setSpecialty(student.specialty)
  }, [student])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && email && major && specialty) {
      updateStudent({ ...student, name, email, major, specialty })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          value={major}
          onChange={(e) => setMajor(e.target.value)}
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
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Update Student Information
      </button>
    </form>
  )
}

export default StudentEditForm