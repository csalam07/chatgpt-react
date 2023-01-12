import React, { useState } from 'react';
import './App.css';
import { Sidebar, ChatBox } from './components';

function App() {
  const [clearData, setclearData] = useState(false);

  const clearChat = () => {
    setclearData(true);
  };

  return (
    <div className="app">
      <Sidebar clearChat={() => clearChat()} />
      <ChatBox clearData={clearData} />
    </div>
  );
}

export default App;
