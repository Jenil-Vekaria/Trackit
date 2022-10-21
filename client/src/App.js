import React, { useEffect, useState } from 'react';
import { Auth } from "./pages/auth/Auth";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import AuthService from './services/auth-service';
import Navbar from './pages/home/navbar/Navbar';
import Dashboard from './pages/home/dashboard/Dashboard';
import Projects from './pages/home/projects/Projects';
import Tickets from './pages/home/tickets/Tickets';
import Administration from './pages/home/adminstration/Administration';
import { useSelector, useDispatch } from 'react-redux';
import { login, selectUser } from './features/authSlice';

export const App = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  let isAuthorized = user ? true : false;

  useEffect(() => {
    const authorize = () => {
      const userData = AuthService.getCurrentUser();

      if (userData) {
        dispatch(login(userData));
      }
    };

    authorize();
  }, []);


  return (
    <div>
      <BrowserRouter>
        {
          isAuthorized ? (
            <Navbar>
              <Routes>
                <Route extact path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/tickets" element={<Tickets />} />
                <Route path="/administration" element={<Administration />} />
              </Routes>
            </Navbar>
          ) : (
            <Routes>
              <Route
                path="*"
                element={<Auth replace to="/auth" />}
              />
            </Routes>
          )
        }

      </BrowserRouter>


    </div>


  );
};

