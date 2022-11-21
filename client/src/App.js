import React, { useEffect, useState } from 'react';
import { Auth } from "./pages/Auth";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import AuthService from './services/auth-service';
import Navbar from './components/navigationBar/Navbar';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Tickets from './pages/Tickets';
import Administration from './pages/Administration';
import { Flex } from '@chakra-ui/react';
import AddProject from './components/projects/AddProject';
import ViewProjects from './components/projects/ViewProjects';

export const App = () => {
  const [isAuthorized, setIsAuthorized] = useState(AuthService.isAuthorized());

  useEffect(() => {
    setIsAuthorized(AuthService.isAuthorized());
  }, []);

  return (
    <div>
      <BrowserRouter>
        {
          isAuthorized ? (
            <Flex w="100vw">
              <Navbar />
              <Routes>
                <Route extact path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/projects" element={<Projects />}>
                  <Route path='add' element={<AddProject />} />
                  <Route path='' element={<ViewProjects />} />
                </Route>
                <Route path="/tickets" element={<Tickets />} />
                <Route path="/administration" element={<Administration />} />
              </Routes>
            </Flex>
          ) : (
            <Routes>
              <Route
                path="*"
                element={<Auth to="/" replace />}
              />
            </Routes>
          )
        }

      </BrowserRouter>


    </div>


  );
};

