import { Avatar, Button} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import SidebarChat from './SidebarChat';
import './styles/Sidebar.css';
import db from '../firebase';
import { useStateValue } from '../StateProvider';

function Sidebar() {

  const [rooms, setRooms] = useState([]);
  const [{ user }, ] = useStateValue();
  const [userSession, ] = useState(() => {
    return window.sessionStorage.getItem('user');
  });
  const [userImg, ] = useState(() => {
    return window.sessionStorage.getItem('userImg');
  })

  useEffect(() => {
    const unsubscribe = db.collection('rooms').onSnapshot(snapshot => {
      setRooms(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data(),
      })
      ))
    });

    return () => {
      unsubscribe();
    }
  }, [])

  const handleLogout = () => {
    window.sessionStorage.removeItem('user');
    window.sessionStorage.removeItem('userImg');
    window.location.href = '/';
  }

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={userImg || user.photoURL} />
        <h2>{userSession || user.displayName}</h2>
        <div className="sidebar__headerRight">
          <Button onClick={handleLogout}>Salir</Button>
        </div>
      </div>

      <div className="sidebar__search">
        <h2>Chats</h2>
      </div>

      <div className="sidebar__chats">
        {rooms.map(room => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} imgUrl={room.data.imgUrl}/>
        ))}
      </div>
    </div>
  )
}

export default Sidebar;