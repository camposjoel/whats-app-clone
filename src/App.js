import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Chat from './components/Chat';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import { useStateValue } from './StateProvider';

function App() {

  const [{ user }, dispatch] = useStateValue(); 
  const [userSession, setUserSession] = useState(() => {
    return window.sessionStorage.getItem('user');
  })

  return (
    <div className="app">
      {!user && !userSession ? (
        <Login />
      ) : (
          <div className="app__body">
            <Router>
              <Sidebar />
              <Switch>
                <Route path="/rooms/:roomId">
                  <Chat />
                </Route>
                <Route path="/">
                  <Chat />
                </Route>
              </Switch>
            </Router>
          </div>
        )
      }

      <p>Joel Campos 🇲🇽</p>
    </div>
  );
}

export default App;
