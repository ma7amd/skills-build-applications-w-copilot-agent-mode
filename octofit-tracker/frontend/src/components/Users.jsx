import { useEffect, useState } from 'react'

function Users({ apiBaseUrl }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true)
        const response = await fetch(`${apiBaseUrl}/users`)
        const data = await response.json()
        setUsers(Array.isArray(data.users) ? data.users : data.users?.results || [])
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [apiBaseUrl])

  return (
    <section>
      <h1 className="h3 mb-4">Users</h1>
      {error && <div className="alert alert-danger">Failed to load users.</div>}
      {loading ? (
        <div>Loading users...</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id || user.id || user.email}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.team || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Users
