import { useEffect, useState } from 'react'

function Teams({ apiBaseUrl }) {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchTeams() {
      try {
        setLoading(true)
        // Codespaces endpoint example:
        // `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams`
        const response = await fetch(`${apiBaseUrl}/teams`)
        const data = await response.json()
        setTeams(Array.isArray(data.teams) ? data.teams : data.teams?.results || [])
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchTeams()
  }, [apiBaseUrl])

  return (
    <section>
      <h1 className="h3 mb-4">Teams</h1>
      {error && <div className="alert alert-danger">Failed to load teams.</div>}
      {loading ? (
        <div>Loading teams...</div>
      ) : (
        <div className="row g-3">
          {teams.map((team) => (
            <div className="col-12" key={team._id || team.id || team.name}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <p className="card-text">{team.description}</p>
                  <p className="mb-0">
                    <strong>Captain:</strong> {team.captain}
                    <br />
                    <strong>Members:</strong> {team.members?.join(', ') || 'None'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Teams
