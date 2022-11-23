import React, { useEffect, useState } from 'react';
import { Auth } from "./pages/Auth";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import AuthService from './services/auth-service';
import Navbar from './components/navigationBar/Navbar';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Tickets from './pages/Tickets';
import Administration from './pages/Administration';
import { Flex } from '@chakra-ui/react';
import AddProject from './components/projects/AddProject';
import ViewAllProjects from './components/projects/ViewAllProjects';
import ViewProject from './components/projects/ViewProject';
import PageNotFound from './components/others/PageNotFound';

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
                  <Route path=':projectID'>
                    <Route path='edit' element={<AddProject />} />
                    <Route path='' element={<ViewProject />} />
                  </Route>
                  <Route path='' element={<ViewAllProjects />} />
                </Route>

                <Route path="/tickets" element={<Tickets />} />

                <Route path="/administration" element={<Administration />} />
                <Route path='*' element={<PageNotFound />} />
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

