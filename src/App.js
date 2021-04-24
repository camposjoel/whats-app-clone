import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Chat from './components/Chat';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import { useStateValue } from './StateProvider';

function App() {

  const [{ user }] = useStateValue();
  const [userSession] = useState(() => {
    return window.sessionStorage.getItem('user');
  })


  return (
    <div className="app">
      {!user && !userSession ? (
        <Login />
      ) : (
          <div className="app__body">
            {window.screen.width > 600 ? (
              <Router>
                <Sidebar />
                <Switch>
                  <Route exact path="/rooms/:roomId">
                    <Chat />
                  </Route>
                  <Route exact path="/">
                    <Chat />
                  </Route>
                </Switch>
              </Router>
            ) : (
                <Router>
                  <Switch>
                    <Route exact path="/rooms/:roomId">
                      <Chat />
                    </Route>
                    <Route exact path="/">
                      <Sidebar />
                    </Route>
                  </Switch>
                </Router>
              )}

          </div>
        )
      }

      <p>Desarrollado por <a href="https://github.com/camposjoel">Joel Campos 🇲🇽</a></p>
    </div>
  );
}

export default App;
