import React from 'react'
import NavBar from '../components/Navbar';
const AppLayout = ({children}) => {
  return (
    <div>
        <NavBar />
        <main>
            {children}
        </main>
    </div>
  )
}

export default AppLayout