import './App.css';
import io from 'socket.io-client';
import { useState, useEffect } from 'react';

const socket = io('http://localhost:4000');

function App() {

  const [message, setMessage] = useState('');
  const  [messages, setMessages ] = useState([]); //

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('message', message);
    const newMessage = {
      body : message,
      from : 'Me'
    }
    setMessages([newMessage, ...messages ])

    setMessage('');
  }

  useEffect(() => {

    const reciveMessage = (message) => {
      setMessages([message, ...messages]);
    };

    socket.on('message', reciveMessage );

    return () => {
      socket.off('message', reciveMessage);
    }
  }, [messages]);

  return (
    <div className="h-screen bg-zinc-800 text-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-10">
        <h1 className="text-2x1 font-bold my-2">Chat React</h1>
        <input type="text" placeholder="Enter your messages" 
          onChange={e => setMessage(e.target.value )} 
          value={message} 
          className="border-2 border-zinc-500 text-black p-2 rounded mb-2 w-full"  
        />
        {/* <button className="bg-blue-500">Send</button> */}
        <ul className="h-80 overflow-y-auto">
          {messages.map((message, index) => (
            <li key={index} className={`my-2 p-2 table text-sm rounded-md ${message.from === 'Me' ? 'bg-sky-700 ml-auto' : 'bg-black'}`}>
              <h3>{message.from} : {message.body}</h3>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default App;
