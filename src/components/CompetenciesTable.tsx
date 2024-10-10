import React from 'react'
import { Student } from '../App'
import { Star } from 'lucide-react'

interface CompetenciesTableProps {
  student: Student
}

const CompetenciesTable: React.FC<CompetenciesTableProps> = ({ student }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Competencies</h3>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b text-left">Skill</th>
            <th className="py-2 px-4 border-b text-left">Proficiency Level</th>
          </tr>
        </thead>
        <tbody>
          {student.competencies.map((competency, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="py-2 px-4 border-b">{competency.name}</td>
              <td className="py-2 px-4 border-b">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < competency.level ? 'text-yellow-400' : 'text-gray-300'}
                      fill={i < competency.level ? 'currentColor' : 'none'}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">({competency.level}/5)</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CompetenciesTable