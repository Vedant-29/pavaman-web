import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './hooks/auth'
import HomePage from './pages/HomePage/HomePage'
import RootLayout from './components/RootLayout'
import SignUpPage from './pages/SignupLogin/Main/SignUpPage'
import SignInPage from './pages/SignupLogin/Main/SignInPage'
import EmailVerifyPage from './pages/SignupLogin/EmailVerify/EmailVerifyPage'
import EmailVerifyCompletePage from './pages/SignupLogin/EmailVerify/EmailVerifyCompletePage'
import PasswordResetPage from './pages/SignupLogin/PasswordRecover/PasswordResetPage'
import PasswordRecoverPage from './pages/SignupLogin/PasswordRecover/PasswordRecoverPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import EmployeePage from './pages/EmployeePage/EmployeePage'
import EmployeeProfile from './pages/EmployeePage/EmployeeProfile'
import Test from './pages/EmployeePage/Test'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={
            <RootLayout isNavbarFixed={false}>
              <HomePage />
            </RootLayout>
          } />
          <Route exact path="/employee-list" element={
            <RootLayout isNavbarFixed={false}>
              <EmployeePage />
            </RootLayout>
          } />
          <Route exact path="/employee-profile" element={
            <RootLayout isNavbarFixed={false}>
              <EmployeeProfile />
            </RootLayout>
          } />
          <Route exact path="/test" element={
            <RootLayout isNavbarFixed={false}>
              <Test />
            </RootLayout>
          } />
          <Route
            exact
            path="/signup"
            element={
              <RootLayout isNavbarFixed={false}>
                <SignUpPage />
              </RootLayout>
            }
          />
          <Route
            exact
            path="/signin"
            element={
              <RootLayout isNavbarFixed={false}>
                <SignInPage />
              </RootLayout>
            }
          />
          <Route
            exact
            path="/email-verify"
            element={
              <RootLayout isNavbarFixed={false}>
                <EmailVerifyPage />
              </RootLayout>
            }
          />
          <Route
            exact
            path="/verification-complete"
            element={
              <RootLayout isNavbarFixed={false}>
                <EmailVerifyCompletePage />
              </RootLayout>
            }
          />
          <Route
            exact
            path="/password-reset"
            element={
              <RootLayout isNavbarFixed={false}>
                <PasswordResetPage />
              </RootLayout>
            }
          />
          <Route
            exact
            path="/password-recover"
            element={
              <RootLayout isNavbarFixed={false}>
                <PasswordRecoverPage />
              </RootLayout>
            }
          />
           <Route
            exact
            path="/profile"
            element={
              <RootLayout isNavbarFixed={false}>
                <ProfilePage />
              </RootLayout>
            }
          />
        </Routes> 
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App