import React, { useState, useEffect, useRef } from 'react';
import './App.css'
import { Outlet } from 'react-router'



function App() {

  return (


    <>

      <div className="w-[100vw] h-auto p-4 ">
        <div className="container  max-w-full max-h-full">

          <Outlet />


        </div>
      </div>




    </>

  )
}

export default App

