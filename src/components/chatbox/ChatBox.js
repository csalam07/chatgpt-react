import React, { useEffect, useState } from 'react';
import './Chatbox.css';
import { DiReact } from 'react-icons/di';
import { IoMdSend } from 'react-icons/io';
import ThreeDotLoading from '../ThreedotLoading';

const baseUrl = 'https://ask-me-anything-ehws.onrender.com/';

function ChatBox({ clearData }) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatLog, setChatLog] = useState([]);

  const textareaRef = React.createRef();

  useEffect(() => {
    textareaRef.current.focus();
  }, []);

  useEffect(() => {
    if (clearData === true) {
      setChatLog('');
    }
  }, [clearData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt) return;

    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { user: 'me', message: prompt, loading: loading },
    ]);
    setPrompt('');
    setLoading(true);

    try {
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ promtData: prompt }),
      });

      if (response.status === 200) {
        const data = await response.json();
        const parsedData = data?.bot;
        setChatLog((prevChatLog) => [
          ...prevChatLog,
          { user: 'gpt', message: parsedData },
        ]);
      }
      setLoading(false);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  return (
    <section className="chatBox">
      <div className="chatBox__log">
        {chatLog &&
          chatLog?.map((message, i) => (
            <ChatLog message={message} key={i} loading={loading} />
          ))}
      </div>
      <div className="chatbox__inputHolder">
        <form className="chatbox__form" onSubmit={handleSubmit}>
          <textarea
            ref={textareaRef}
            className="chatbox__textArea"
            rows="1"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => (e.key === 'Enter' ? handleSubmit(e) : null)}
          />
          <IoMdSend
            className="chatbox__formIcon"
            type="submit"
            onClick={handleSubmit}
          />
        </form>

        <p className="chatbox__footerText">
          <a href="https://help.openai.com/en/articles/6825453-chatgpt-release-notes">
            ChatGPT Jan 9 Version
          </a>
          . Free Research Preview. Our goal is to make AI systems more natural
          and safe to interact with. Your feedback will help us improve.
        </p>
      </div>
    </section>
  );
}

const ChatLog = ({ message, loading }) => {
  return (
    <div className={`chatBox__message ${message.user === 'gpt' && 'chatgpt'}`}>
      <div className="chatBox__messageCenter">
        {message.user === 'gpt' ? (
          <div className="avatar chatgpt">
            <DiReact className="avatar" />
          </div>
        ) : (
          <img
            src="https://dpwhatsapp.xyz/wp-content/uploads/2021/06/Cute-Anime-Images-For-Profile-Pic.jpg"
            alt="me"
            className="avatar"
          />
        )}
        <div
          dangerouslySetInnerHTML={{ __html: message.message }}
          className="message"
          tyle={{ whiteSpace: 'pre' }}
        />
      </div>
      {loading && (
        <div className="chatBox__messageCenter">
          <div className="avatar chatgpt">
            <DiReact className="avatar" />
          </div>
          <div className="chatBox__loadiner">
            <ThreeDotLoading />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
