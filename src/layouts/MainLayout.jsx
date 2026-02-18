import Sidebar from '../components/sidebar/Sidebar'
import Header from '../layouts/header/Header'

const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen ">
    {/* Sidebar */}
    <Sidebar />
  
    {/* Main content */}
    <div className="flex-1 flex flex-col md:ml-64 bg-gray-100 overflow-auto">
      {/* Header (fixed height) */}
      <Header />
  
      {/* Page content */}
      <main className="flex-1 p-4 ">
        {children}
      </main>
    </div>
  </div>
  )
}

export default MainLayout

