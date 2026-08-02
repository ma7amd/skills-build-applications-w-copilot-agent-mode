import './App.css'

function App() {
  return (
    <main className="container py-5">
      <div className="row align-items-center g-4">
        <div className="col-lg-7">
          <span className="badge text-bg-primary mb-3">OctoFit Tracker</span>
          <h1 className="display-5 fw-bold">Track workouts, teams, and progress in one place.</h1>
          <p className="lead text-muted">
            A modern multi-tier fitness experience for sharing activities, competing on leaderboards,
            and staying motivated.
          </p>
          <div className="d-flex gap-3 mt-4">
            <a className="btn btn-primary btn-lg" href="http://localhost:8000/api/health">
              Check API health
            </a>
            <a className="btn btn-outline-secondary btn-lg" href="https://vite.dev/" target="_blank">
              Vite docs
            </a>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h2 className="h4 mb-3">What’s included</h2>
              <ul className="list-group list-group-flush">
                <li className="list-group-item px-0">User profiles and authentication</li>
                <li className="list-group-item px-0">Activity logging and challenge tracking</li>
                <li className="list-group-item px-0">Team management and leaderboards</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
