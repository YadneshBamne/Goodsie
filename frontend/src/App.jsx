import { Box } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage.jsx';
import CreatePage from './Pages/CreatePage.jsx';
import Navbar from './Components/Navbar.jsx'; 
import ErrorBoundary from './Components/ErrorBoundary.jsx';
function App(){

  return (
    <>
      <Box minH = {"100vh"}>{/*Navbar*/}
        <Navbar/>
        <Routes>
          <Route path = "/" element = {<ErrorBoundary><HomePage/></ErrorBoundary>}></Route>
          <Route path = "/create" element = {<CreatePage/>}></Route>
        </Routes>
      </Box> {/* Chakra UI - div */}
    </>
  )
}
export default App;