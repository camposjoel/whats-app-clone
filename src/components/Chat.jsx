import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import db from '../firebase';
import './styles/Chat.css';
import firebase from 'firebase';
import { useStateValue } from '../StateProvider';
import moment from 'moment';



function Chat() {

  moment.locale('es-us');
  const [seed, setSeed] = useState('');
  const [msg, setMsg] = useState('');
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState('');
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const [userSession, setUserSession] = useState(() => {
    return window.sessionStorage.getItem('user');
  })

  const username = user?.displayName || userSession;

  useEffect(() => {
    if (roomId) {
      db.collection('rooms').doc(roomId)
        .onSnapshot(snapshot => setRoomName(snapshot.data().name));

      db.collection('rooms').doc(roomId)
        .collection('messages').orderBy('timestamp', 'asc')
        .onSnapshot(snapshot => {
          setMessages(snapshot.docs.map(doc => doc.data()))
        })
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId])

  const sendMessage = (e) => {
    e.preventDefault();
    //console.log("You typed >>>", msg);
    db.collection('rooms').doc(roomId).collection('messages')
      .add({
        message: msg,
        user: user.displayName || userSession,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
    setMsg('');
  }

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/male/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            {messages.length > 0 ? (moment(new Date(
              messages[messages.length-1]?.timestamp?.toDate()
            )).calendar()) : 'No messages'}
          </p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map(message => (
          <p key={message.timestamp} className={`chat__message ${
            message.user === username && 
            'chat__reciever'}`}>
            <span className="chat__name">{message.user}</span>
            {message.message}
            <span className="chat__timestamp">
              {moment(new Date(message.timestamp?.toDate())).calendar()}
            </span>
          </p>
        ))}

      </div>

      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            onChange={e => setMsg(e.target.value)}
            value={msg}
            placeholder="Try a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">Send Message</button>
        </form>
        <Mic />
      </div>
    </div>
  )
}

export default Chat;