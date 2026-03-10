import './App.css';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <div className="app-shell">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <div className="navbar-brand d-flex align-items-center gap-2 mb-0">
            <img
              src={`${process.env.PUBLIC_URL}/octofitapp-small.png`}
              alt="OctoFit logo"
              className="app-logo"
            />
            <span className="fw-bold">OctoFit Tracker</span>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
            aria-controls="mainNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mainNav">
            <div className="navbar-nav ms-auto gap-lg-2">
              <NavLink
                to="/users"
                className={({ isActive }) => `nav-link nav-pill-link ${isActive ? 'active' : ''}`}
              >
                Users
              </NavLink>
              <NavLink
                to="/activities"
                className={({ isActive }) => `nav-link nav-pill-link ${isActive ? 'active' : ''}`}
              >
                Activities
              </NavLink>
              <NavLink
                to="/teams"
                className={({ isActive }) => `nav-link nav-pill-link ${isActive ? 'active' : ''}`}
              >
                Teams
              </NavLink>
              <NavLink
                to="/leaderboard"
                className={({ isActive }) => `nav-link nav-pill-link ${isActive ? 'active' : ''}`}
              >
                Leaderboard
              </NavLink>
              <NavLink
                to="/workouts"
                className={({ isActive }) => `nav-link nav-pill-link ${isActive ? 'active' : ''}`}
              >
                Workouts
              </NavLink>
            </div>
          </div>
        </div>
      </nav>

      <main className="container py-4 py-lg-5">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-2 mb-4">
          <div>
            <h1 className="display-6 fw-bold mb-1">Fitness Dashboard</h1>
            <p className="text-secondary mb-0">Track users, workouts, teams, and activity rankings.</p>
          </div>
          <a
            className="btn btn-outline-primary"
            href="https://getbootstrap.com/docs/5.3/getting-started/introduction/"
            target="_blank"
            rel="noreferrer"
          >
            Bootstrap Docs
          </a>
        </div>

        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
