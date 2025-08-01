import React, { useState, useRef, useEffect } from "react";
import "./style.css";

interface Message {
  role: string;
  content: string;
}

interface ChatWidgetIOProps {
  callApi: (message: string) => Promise<string>;
  chatbotName?: string;
  isTypingMessage?: string;
  IncommingErrMsg?: string;
  primaryColor?: string;
  inputMsgPlaceholder?: string;
  chatIcon?: React.ReactNode;
  botIcon?: React.ReactNode;
  botFontStyle?: React.CSSProperties;
  typingFontStyle?: React.CSSProperties;
  userFontStyle?: React.CSSProperties;
  chatInputStyle?: React.CSSProperties;
  handleNewMessage?: (message: Message) => void;
  onBotResponse?: (response: string) => void;
  messages?: Message[];
  useInnerHTML?: boolean;
}

const ChatBotWidget = ({
  callApi,
  chatbotName = "Chatbot",
  isTypingMessage = "Typing...",
  IncommingErrMsg = "Oops! Something went wrong. Please try again.",
  primaryColor = "#eb4034",
  inputMsgPlaceholder = "Send a Message",
  chatIcon = <ChatIcon />,
  botIcon = <BotIcon />,
  botFontStyle = {},
  typingFontStyle = {},
  userFontStyle = {},
  chatInputStyle = {},
  handleNewMessage,
  onBotResponse,
  messages = [],
  useInnerHTML = false,
}: ChatWidgetIOProps) => {
  const [userMessage, setUserMessage] = useState<string>("");
  const [typing, setTyping] = useState<boolean>(false);
  const chatInputRef = useRef<any>(null);
  const chatboxRef = useRef<any>(null);

  const handleChat = async () => {
    const trimmedMessage = userMessage.trim();
    if (!trimmedMessage) return;

    setUserMessage("");

    // Display outgoing message
    const outgoingMessage = { role: "user", content: trimmedMessage };
    handleNewMessage?.(outgoingMessage);

    try {
      setTyping(true);

      // Use the custom API call function
      const botResponse = await callApi(trimmedMessage);

      // Call the callback function with the bot's response
      onBotResponse?.(botResponse);
    } catch (error) {
      // Display error message if API call fails
      const errorMessage = { role: "error", content: IncommingErrMsg };
      handleNewMessage?.(errorMessage);
    } finally {
      setTyping(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserMessage(event.target.value);

    // Reset height to auto before calculating new height
    chatInputRef.current.style.height = "auto";

    // Adjust the height dynamically based on content
    chatInputRef.current.style.height = `${Math.min(
      chatInputRef.current.scrollHeight,
      80
    )}px`;
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey && window.innerWidth > 800) {
      event.preventDefault();
      handleChat();
    }
  };

  const toggleChatbot = () => {
    const body = document.body;

    if (body.classList.contains("show-chatbot")) {
      body.classList.remove("show-chatbot");
      body.classList.add("hide-chatbot");
    } else {
      body.classList.remove("hide-chatbot");
      body.classList.add("show-chatbot");
    }
  };

  useEffect(() => {
    const closeBtn = document.querySelector(".close-btn");
    if (closeBtn) {
      const handleClose = () => toggleChatbot();

      // Add event listeners for both click and touch events
      closeBtn.addEventListener("click", handleClose);
      closeBtn.addEventListener("touchend", handleClose);

      // Cleanup function to remove the event listeners
      return () => {
        closeBtn.removeEventListener("click", handleClose);
        closeBtn.removeEventListener("touchend", handleClose);
      };
    }
  }, []);

  useEffect(() => {
    // Scroll to bottom of chatbox when messages change
    chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
  }, [messages]);

  return (
    <div
      className="chatbot-container"
      style={{
        background: primaryColor,
        backgroundColor: primaryColor,
      }}
    >
      <button
        className="chatbot-toggler"
        onClick={toggleChatbot}
        style={{ background: primaryColor }}
      >
        <span className="material-symbols-rounded">{chatIcon}</span>
        <span className="material-symbols-outlined">Close</span>
      </button>
      <div className="chatbot">
        <header style={{ background: primaryColor }}>
          <h2>{chatbotName}</h2>
          <span
            className="close-btn material-symbols-outlined"
            onClick={toggleChatbot}
          >
            close
          </span>
        </header>
        <ul className="chatbox" ref={chatboxRef}>
          {messages.map((msg, index) => (
            <li
              key={index}
              className={`chat ${
                msg.role === "user" ? "outgoing" : "incoming"
              }`}
            >
              {msg.role !== "user" && (
                <span className="material-symbols-outlined">{botIcon}</span>
              )}
              <p
                style={
                  msg.role === "assistant"
                    ? botFontStyle
                    : msg.role === "error"
                    ? botFontStyle
                    : msg.role === "user"
                    ? userFontStyle
                    : { background: primaryColor }
                }
                {...(useInnerHTML
                  ? { dangerouslySetInnerHTML: { __html: msg.content } }
                  : { children: msg.content })}
              />
            </li>
          ))}
          {typing && (
            <li key={Date.now()} className="chat incoming">
              <span className="material-symbols-outlined">{botIcon}</span>
              <p style={typingFontStyle}>{isTypingMessage}</p>
            </li>
          )}
        </ul>
        <div className="chat-input">
          <textarea
            ref={chatInputRef}
            placeholder={inputMsgPlaceholder}
            spellCheck="false"
            required
            value={userMessage}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            maxLength={500}
            style={chatInputStyle}
          />
          <span
            id="send-btn"
            className="material-symbols-outlined"
            onClick={handleChat}
          >
            send
          </span>
        </div>
      </div>
      <style>
        {`
          .chat-input textarea:valid~span {
              color: ${primaryColor};
          }
        `}
      </style>
    </div>
  );
};

const ChatIcon = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        width={18}
        height={18}
        fill="#fff"
        stroke="#fff"
        viewBox="0 0 58 58"
      >
        <path
          d="M53 3.293H5c-2.722 0-5 2.278-5 5v33c0 2.722 2.278 5 5 5h27.681l-4.439-5.161a1 1 0 1 1 1.517-1.304l4.998 5.811L43 54.707v-8.414h10c2.722 0 5-2.278 5-5v-33c0-2.722-2.278-5-5-5z"
          style={{
            fill: "#fff",
          }}
        />
        <circle
          cx={15}
          cy={24.799}
          r={3}
          style={{
            fill: "#fff",
          }}
        />
        <circle
          cx={29}
          cy={24.799}
          r={3}
          style={{
            fill: "#fff",
          }}
        />
        <circle
          cx={43}
          cy={24.799}
          r={3}
          style={{
            fill: "#fff",
          }}
        />
      </svg>
    </>
  );
};

const BotIcon = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        width={18}
        height={18}
        fill="#fff"
        stroke="#fff"
        viewBox="0 0 58 58"
      >
        <path
          d="M53 3.293H5c-2.722 0-5 2.278-5 5v33c0 2.722 2.278 5 5 5h27.681l-4.439-5.161a1 1 0 1 1 1.517-1.304l4.998 5.811L43 54.707v-8.414h10c2.722 0 5-2.278 5-5v-33c0-2.722-2.278-5-5-5z"
          style={{
            fill: "#fff",
          }}
        />
        <circle
          cx={15}
          cy={24.799}
          r={3}
          style={{
            fill: "#fff",
          }}
        />
        <circle
          cx={29}
          cy={24.799}
          r={3}
          style={{
            fill: "#fff",
          }}
        />
        <circle
          cx={43}
          cy={24.799}
          r={3}
          style={{
            fill: "#fff",
          }}
        />
      </svg>
    </>
  );
};

export default ChatBotWidget;
