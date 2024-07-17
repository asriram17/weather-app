import Navbar from "../components/NavBar/Navbar"

const AppLayout = ({ children }) => {
  return (
    <div className="App">
        <Navbar />
        <main className="content">
            {children}
        </main>
    </div>
  )
}

export default AppLayout;