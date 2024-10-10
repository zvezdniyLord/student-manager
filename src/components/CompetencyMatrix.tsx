import React from 'react'
import { Student } from '../App'
import { Star } from 'lucide-react'

interface CompetencyMatrixProps {
  student: Student
  isAdmin: boolean
}

const CompetencyMatrix: React.FC<CompetencyMatrixProps> = ({ student, isAdmin }) => {
  const competencies = Object.entries(student.competencies).sort((a, b) => b[1] - a[1])

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Competency Matrix</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">Competency</th>
              <th className="py-2 px-4 border-b text-left">Proficiency Level</th>
            </tr>
          </thead>
          <tbody>
            {competencies.map(([competency, level], index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="py-2 px-4 border-b">{competency}</td>
                <td className="py-2 px-4 border-b">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < level ? 'text-yellow-400' : 'text-gray-300'}
                        fill={i < level ? 'currentColor' : 'none'}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">({level}/5)</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!isAdmin && (
        <p className="mt-4 text-sm text-gray-600">
          Note: Only administrators can edit the competency matrix.
        </p>
      )}
    </div>
  )
}

export default CompetencyMatrix