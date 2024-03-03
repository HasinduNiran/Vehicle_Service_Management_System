import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import {BrowserRouter, Route, Routes} from 'react-router-dom';

import React from 'react'
import ShowPackage from './assets/pages/SPackage/ShowPackage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route>
            <Route path = '/show-packages' element = {<ShowPackage/>}></Route>
         </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
