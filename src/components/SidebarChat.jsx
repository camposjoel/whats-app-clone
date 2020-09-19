import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import db from '../firebase';
import './styles/SidebarChat.css';


function SidebarChat({ id, name, imgUrl, addNewChat }) {

  const [messages, setMessages] = useState('');

  useEffect(() => {
    if (id) {
      db.collection('rooms').doc(id).collection('messages')
        .orderBy('timestamp', 'desc').onSnapshot(snapshot => {
          setMessages(snapshot.docs.map(doc => doc.data()));
        })
    }
  }, [id])


  const createChat = () => {
    const roomName = prompt("Please enter name for chat room");

    if (roomName) {
      db.collection('rooms').add({
        name: roomName,
      });
    }
  }

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={imgUrl} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>{messages[0]?.message.substring(0, 15)}...</p>
        </div>
      </div>
    </Link>
  ) : (
      <div onClick={createChat}>
        <h2>Add new chat</h2>
      </div>
    )
}

export default SidebarChat;