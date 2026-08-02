import { useEffect, useState } from 'react'

function Leaderboard({ apiBaseUrl }) {
  const [board, setBoard] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        setLoading(true)
        const response = await fetch(`${apiBaseUrl}/leaderboard`)
        const data = await response.json()
        setBoard(Array.isArray(data.leaderboard) ? data.leaderboard : data.leaderboard?.results || [])
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [apiBaseUrl])

  return (
    <section>
      <h1 className="h3 mb-4">Leaderboard</h1>
      {error && <div className="alert alert-danger">Failed to load leaderboard.</div>}
      {loading ? (
        <div>Loading leaderboard...</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Team</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {board.map((entry) => (
                <tr key={entry._id || `${entry.user}-${entry.rank}`}>
                  <td>{entry.rank}</td>
                  <td>{entry.user}</td>
                  <td>{entry.team}</td>
                  <td>{entry.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Leaderboard
