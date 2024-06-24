import { useLocation } from 'react-router-dom';
import Navbar from "./Navbar"

function RootLayout({ children, isNavbarFixed }) {
  const location = useLocation();
  const authRoutes = ["/signin", "/signup","/email-verify" ,"/verification-complete", "/password-recover", "/password-reset"];

  return (
    <>
      {(!authRoutes.includes(location.pathname) || isNavbarFixed) && <Navbar isFixed={isNavbarFixed} />}
      <main>{children}</main>
    </>
  )
}

export default RootLayout