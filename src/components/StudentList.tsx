import React from 'react'
import { Student } from '../App'
import { User } from 'lucide-react'

interface StudentListProps {
  students: Student[]
}

const StudentList: React.FC<StudentListProps> = ({ students }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Registered Students</h2>
      {students.length === 0 ? (
        <p className="text-gray-500">No students registered yet.</p>
      ) : (
        <ul className="space-y-4">
          {students.map((student) => (
            <li key={student.id} className="bg-gray-50 rounded-lg p-4 flex items-center">
              <User className="text-blue-500 mr-3" size={24} />
              <div>
                <h3 className="font-medium">{student.name}</h3>
                <p className="text-sm text-gray-600">{student.email}</p>
                <p className="text-sm text-gray-600">Major: {student.major}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default StudentList