import { useEffect, useState } from 'react'

function Activities({ apiBaseUrl }) {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchActivities() {
      try {
        setLoading(true)
        // Codespaces endpoint example:
        // `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities`
        const response = await fetch(`${apiBaseUrl}/activities`)
        const data = await response.json()
        setActivities(Array.isArray(data.activities) ? data.activities : data.activities?.results || [])
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [apiBaseUrl])

  return (
    <section>
      <h1 className="h3 mb-4">Activities</h1>
      {error && <div className="alert alert-danger">Failed to load activities.</div>}
      {loading ? (
        <div>Loading activities...</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>User</th>
                <th>Type</th>
                <th>Distance</th>
                <th>Duration</th>
                <th>Calories</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id || activity.id || `${activity.user}-${activity.date}`}>
                  <td>{activity.user}</td>
                  <td>{activity.type}</td>
                  <td>{activity.distance}</td>
                  <td>{activity.duration}</td>
                  <td>{activity.calories}</td>
                  <td>{new Date(activity.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Activities
