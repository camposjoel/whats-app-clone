import { Button } from '@material-ui/core';
import { auth, provider} from '../firebase';
import React from 'react';
import './styles/Login.css';
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';

function Login() {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    auth.signInWithPopup(provider)
      .then(result => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
        window.sessionStorage.setItem('user', result.user.displayName);
        window.sessionStorage.setItem('userImg', result.user.photoURL);
      })
      .catch(error => alert(error.message));
  }

  return(
    <div className="login">
      <div className="login__container">
        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/800px-WhatsApp.svg.png' alt=''/>
        <div className="login__text">
          <h1>Whatsapp Clone</h1>
        </div>

        <Button type="submit" onClick={signIn}>
          Iniciar con cuenta de Google
        </Button>
      </div>
    </div>
  )
}

export default Login;