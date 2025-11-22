import React from 'react'

const CurrentDay = ({resultOrder}) => {
  return (
    <div>
      {resultOrder && (
        <div className="bg-yellow-100 p-4 rounded-lg shadow-md my-6">
          <h2 className="text-2xl font-bold mb-4 text-center text-red-600">Satta Result Order</h2>
          <ul className="space-y-2">
            {resultOrder
              .filter((game) => game.isVerified)
              .sort((a, b) => a.order - b.order)
              .map((game) => (
                <li key={game.key} className="text-lg">
                  <span className="font-semibold">{game.key.replace(/_/g, ' ')}:</span> {game.displayName}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default CurrentDay
