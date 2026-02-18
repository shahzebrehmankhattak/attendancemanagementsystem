import React from 'react'
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-[#39444b] via-[#3b616f] to-[#3e89a4]">
      <div className='page-not-found-card'>
      <h1>404</h1>
      <h2>Oops! Page not found.</h2>
     <p>Page that you're looking for isn't found</p>
      <Button type="primary" onClick={() => navigate("/")} className='btn'>
        Return Home
      </Button>
      </div>
    </div>
  )
}

export default PageNotFound