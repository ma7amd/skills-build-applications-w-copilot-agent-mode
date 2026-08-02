import { useEffect, useState } from 'react'

function Workouts({ apiBaseUrl }) {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        setLoading(true)
        const response = await fetch(`${apiBaseUrl}/workouts`)
        const data = await response.json()
        setWorkouts(Array.isArray(data.workouts) ? data.workouts : data.workouts?.results || [])
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchWorkouts()
  }, [apiBaseUrl])

  return (
    <section>
      <h1 className="h3 mb-4">Workouts</h1>
      {error && <div className="alert alert-danger">Failed to load workouts.</div>}
      {loading ? (
        <div>Loading workouts...</div>
      ) : (
        <div className="row g-3">
          {workouts.map((workout) => (
            <div className="col-12" key={workout._id || workout.id || workout.title}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{workout.title}</h5>
                  <p className="card-text">{workout.description}</p>
                  <p className="mb-0">
                    <strong>Difficulty:</strong> {workout.difficulty}
                    <br />
                    <strong>Duration:</strong> {workout.durationMinutes} min
                    <br />
                    <strong>Equipment:</strong> {workout.equipment?.join(', ') || 'None'}
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

export default Workouts
