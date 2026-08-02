import { NavLink, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const backendHost = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'
const apiBaseUrl = `${backendHost}/api`

function Home() {
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
            <a className="btn btn-primary btn-lg" href={`${apiBaseUrl}/health`}>
              Check API health
            </a>
            <a className="btn btn-outline-secondary btn-lg" href="https://vite.dev/" target="_blank" rel="noreferrer">
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

function App() {
  return (
    <div className="app-shell">
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            OctoFit Tracker
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="mainNavbar">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/users">
                  Users
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/teams">
                  Teams
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/activities">
                  Activities
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/workouts">
                  Workouts
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/leaderboard">
                  Leaderboard
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users apiBaseUrl={apiBaseUrl} />} />
          <Route path="/teams" element={<Teams apiBaseUrl={apiBaseUrl} />} />
          <Route path="/activities" element={<Activities apiBaseUrl={apiBaseUrl} />} />
          <Route path="/workouts" element={<Workouts apiBaseUrl={apiBaseUrl} />} />
          <Route path="/leaderboard" element={<Leaderboard apiBaseUrl={apiBaseUrl} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
