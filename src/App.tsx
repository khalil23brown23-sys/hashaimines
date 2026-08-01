import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import { Layout } from '@/components/Layout'
import { DashboardShell } from '@/components/DashboardShell'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { Home } from '@/pages/Home'
import { Login } from '@/pages/Login'
import { Signup } from '@/pages/Signup'
import { About } from '@/pages/About'
import { Team } from '@/pages/Team'
import { Legal } from '@/pages/Legal'
import { Dashboard } from '@/pages/Dashboard'
import { Deposit } from '@/pages/Deposit'
import { Withdraw } from '@/pages/Withdraw'
import { StartMining } from '@/pages/StartMining'
import { Mining } from '@/pages/Mining'
import { Account } from '@/pages/Account'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="about-us" element={<Navigate to="/about" replace />} />
            <Route path="team" element={<Team />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="start-mining" element={<StartMining />} />
            <Route path="privacy" element={<Legal />} />
            <Route path="terms" element={<Legal />} />
            <Route path="cookie-policy" element={<Legal />} />
            <Route path="usage-policy" element={<Legal />} />
            <Route path="privacy-policy" element={<Navigate to="/privacy" replace />} />
            <Route path="terms-of-service" element={<Navigate to="/terms" replace />} />

            <Route
              element={
                <ProtectedRoute>
                  <DashboardShell />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="dashboard/mining" element={<Mining />} />
              <Route path="dashboard/account" element={<Account />} />
              <Route path="deposit" element={<Deposit />} />
              <Route path="withdraw" element={<Withdraw />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
