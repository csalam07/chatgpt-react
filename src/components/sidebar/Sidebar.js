import React from 'react';
import './Sidebar.css';

function Sidebar({ clearChat }) {
  return (
    <aside className="sidebar">
      <div
        className="sidebar_button"
        onClick={() => {
          clearChat();
        }}
      >
        <span>+</span>
        new chat
      </div>
    </aside>
  );
}

export default Sidebar;
