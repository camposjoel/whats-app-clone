import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Avatar, IconButton, Menu as MenuCore } from '@material-ui/core';
import { InsertEmoticon, Menu, Send } from '@material-ui/icons';
import { formatDistanceToNow, formatRelative } from 'date-fns';
import firebase from 'firebase';
import { Picker } from 'emoji-mart/dist-es/index';
import db from '../firebase';
import { useStateValue } from '../StateProvider';
import 'emoji-mart/css/emoji-mart.css';
import './styles/Chat.css';


function Chat() {
  const [msg, setMsg] = useState('');
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState('');
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const [userSession, setUserSession] = useState(() => {
    return window.sessionStorage.getItem('user');
  })
  const [anchorEl, setAnchorEl] = useState(null);

  const username = user?.displayName || userSession;

  /* Scroll */
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "auto" });
  }

  useEffect(scrollToBottom, [messages]);
  /*End Scroll */

  useEffect(() => {
    if (roomId) {
      db.collection('rooms').doc(roomId)
        .onSnapshot(snapshot => setRoomName(snapshot.data().name));

      db.collection('rooms').doc(roomId)
        .collection('messages').orderBy('timestamp', 'asc')
        .onSnapshot(snapshot => {
          setMessages(snapshot.docs.map(doc => doc.data()))
        })

      scrollToBottom();
    }
  }, [roomId]);


  const sendMessage = (e) => {
    e.preventDefault();
    //console.log("You typed >>>", msg);
    if (msg.length > 0) {
      db.collection('rooms').doc(roomId).collection('messages')
      .add({
        message: msg,
        user: username,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      setMsg('');
    }
  }

  const handleEmoji = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }


  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png" />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            {messages.length > 0 ? (formatDistanceToNow(new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ), { addSuffix: true })) : 'No messages'}
          </p>
        </div>
        <Link to="/">
          <IconButton id="menu" >
            <Menu />
          </IconButton>
        </Link>
      </div>

      <div className="chat__body">
        {messages.map(message => (
          <p key={message.timestamp} className={`chat__message ${message.user === username &&
            'chat__reciever'}`}>
            <span className="chat__name">{message.user}</span>
            {message.message}
            <span className="chat__timestamp">
              {formatRelative(new Date(message.timestamp?.toDate()), Date.now())}
            </span>
          </p>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat__footer">
        <IconButton aria-controls="emoji-menu" aria-haspopup="true" onClick={handleEmoji}>
          <InsertEmoticon/>
        </IconButton>
        <MenuCore
          id="emoji-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <Picker 
            title='Pick your emoji' 
            emoji='point_up'
            onSelect={(emoji) => {
              setMsg(msg.concat(emoji.native))
            }}  
          />
        </MenuCore>
        
        <form>
          <input
            onChange={e => setMsg(e.target.value)}
            value={msg}
            placeholder="Try a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">Send Message</button>
        </form>
        <IconButton onClick={sendMessage}>
          <Send />
        </IconButton>
      </div>
    </div>
  )
}

export default Chat;