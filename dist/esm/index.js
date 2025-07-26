import React, { useState, useRef, useEffect } from 'react';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "@import url(\"https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;1,700&display=swap\");\r\n\r\n/* Import Material Symbols Outlined font */\r\n@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');\r\n\r\n/* Import Material Symbols Rounded font */\r\n@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,1,0');\r\n\r\n* {\r\n    margin: 0;\r\n    padding: 0;\r\n    box-sizing: border-box;\r\n    font-family: \"Poppins\", sans-serif;\r\n}\r\n\r\n@keyframes color {\r\n    0% {\r\n        background-position: 0 50%;\r\n    }\r\n\r\n    50% {\r\n        background-position: 100% 50%;\r\n    }\r\n\r\n    100% {\r\n        background-position: 0 50%;\r\n    }\r\n}\r\n\r\n.chatbot-toggler {\r\n    position: fixed;\r\n    bottom: 40px;\r\n    right: 40px;\r\n    outline: none;\r\n    border: none;\r\n    height: 40px;\r\n    width: 40px;\r\n    display: flex;\r\n    cursor: pointer;\r\n    align-items: center;\r\n    justify-content: center;\r\n    border-radius: 50%;\r\n    background: #4aa017;\r\n    transition: all 0.2s ease;\r\n    box-shadow: 0 0 128px 0 rgba(0, 0, 0, 0.1),\r\n        0 32px 64px -48px rgba(0, 0, 0, 0.5);\r\n\r\n    &:hover {\r\n        background: #4aa017;\r\n    }\r\n\r\n    svg path {\r\n        fill: #fff;\r\n    }\r\n\r\n    @media (max-width: 991px) {\r\n        bottom: 20px;\r\n        right: 20px;\r\n    }\r\n\r\n    @media (max-width: 767px) {\r\n        bottom: 20px;\r\n        right: 20px;\r\n    }\r\n\r\n    @media (max-width: 575px) {\r\n        bottom: 20px;\r\n        right: 20px;\r\n    }\r\n\r\n    @media (max-width: 375px) {\r\n        bottom: 20px;\r\n        right: 20px;\r\n    }\r\n\r\n    @media (max-width: 320px) {\r\n        bottom: 20px;\r\n        right: 20px;\r\n    }\r\n}\r\n\r\nbody.show-chatbot .chatbot-toggler {\r\n    transform: rotate(90deg);\r\n    background: #4aa017;\r\n}\r\n\r\n.chatbot-toggler span {\r\n    color: #fff;\r\n    position: absolute;\r\n    font-size: 1.2rem;\r\n    font-weight: 600;\r\n    transition: all 0.2s ease;\r\n}\r\n\r\n.chatbot-toggler span:last-child,\r\nbody.show-chatbot .chatbot-toggler span:first-child {\r\n    opacity: 0;\r\n}\r\n\r\nbody.show-chatbot .chatbot-toggler span:last-child {\r\n    opacity: 1;\r\n}\r\n\r\n.chatbot {\r\n    position: fixed;\r\n    display: flex;\r\n    flex-direction: column;\r\n    right: 70px;\r\n    bottom: 80px;\r\n    overflow: hidden;\r\n    width: 340px;\r\n    height: 520px;\r\n    transform: scale(0.5);\r\n    opacity: 0;\r\n    pointer-events: none;\r\n    background: #fff;\r\n    transform-origin: bottom right;\r\n    border-radius: 15px;\r\n    box-shadow: rgba(0, 18, 46, 0.16) 0px 8px 18px 0px;\r\n    transition: all 0.1s ease;\r\n}\r\n\r\nbody.show-chatbot .chatbot {\r\n    opacity: 1;\r\n    pointer-events: auto;\r\n    transform: scale(1);\r\n}\r\n\r\n/* ChatBot */\r\n.chatbot header {\r\n    background: #4aa017;\r\n    position: relative;\r\n    color: #fff;\r\n    padding: 15px 0;\r\n    text-align: center;\r\n    border-radius: 15px 15px 0 0;\r\n    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\r\n}\r\n\r\n.chatbot header span {\r\n    position: absolute;\r\n    right: 15px;\r\n    top: 50%;\r\n    display: none;\r\n    cursor: pointer;\r\n    transform: translateY(-50%);\r\n}\r\n\r\n@media screen and (max-width: 992px) {\r\n    .chatbot header span {\r\n        display: block;\r\n    }\r\n}\r\n\r\n.chatbot header span svg {\r\n    height: 20px;\r\n    width: 20px;\r\n    fill: #fff;\r\n}\r\n\r\n.chatbot header span:hover {\r\n    opacity: 0.8;\r\n}\r\n\r\n.chatbot header span:first-child {\r\n    right: 55px;\r\n}\r\n\r\n.chatbot header span:last-child {\r\n    right: 15px;\r\n}\r\n\r\n.chatbot header h2 {\r\n    color: #fff;\r\n    font-size: 1.4rem;\r\n    font-weight: 600;\r\n    letter-spacing: 0.5px;\r\n    margin: 0;\r\n}\r\n\r\n.chatbot .chatbox {\r\n    flex-grow: 1;\r\n    overflow-y: auto;\r\n    padding: 16px 20px;\r\n    background: #fff;\r\n}\r\n\r\n.chatbox .chat {\r\n    display: flex;\r\n    list-style: none;\r\n    margin: -1px 0 0;\r\n}\r\n\r\n.chatbot :where(.chatbox, textarea)::-webkit-scrollbar {\r\n    width: 6px;\r\n}\r\n\r\n.chatbot :where(.chatbox, textarea)::-webkit-scrollbar-track {\r\n    background: #fff;\r\n    border-radius: 25px;\r\n}\r\n\r\n.chatbot :where(.chatbox, textarea)::-webkit-scrollbar-thumb {\r\n    background: #ccc;\r\n    border-radius: 25px;\r\n}\r\n\r\n.chatbot :where(.chatbox, textarea)::-webkit-scrollbar-thumb:hover {\r\n    background: #b3b3b3;\r\n}\r\n\r\n.chatbox .incoming span {\r\n    height: 30px;\r\n    width: 30px;\r\n    color: #fff;\r\n    align-self: flex-end;\r\n    background: #4aa017;\r\n    text-align: center;\r\n    line-height: 32px;\r\n    border-radius: 5px;\r\n    margin: 0 8px 2px 0;\r\n}\r\n\r\n.chatbox .outgoing {\r\n    margin: 20px 0;\r\n    justify-content: flex-end;\r\n    font-size: 0.8rem;\r\n}\r\n\r\n.chatbox .chat p {\r\n    color: #fff;\r\n    font-size: 0.9rem;\r\n    max-width: 75%;\r\n    padding: 5px 10px;\r\n    border-radius: 10px 10px 0 10px;\r\n    background: #4aa017;\r\n    line-height: 1.3;\r\n    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);\r\n}\r\n\r\n.chatbox .incoming p {\r\n    color: black;\r\n    font-size: 0.9rem;\r\n    background: #f2f2f2;\r\n    border-radius: 10px 10px 10px 0;\r\n    text-align: left;\r\n    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);\r\n}\r\n\r\n.chatbox .chat p.error {\r\n    color: #721c24;\r\n    background: #f8d7da;\r\n}\r\n\r\n.chatbox .chat p.error::before {\r\n    content: \"!\";\r\n    color: #721c24;\r\n    font-weight: 600;\r\n    margin-right: 5px;\r\n}\r\n\r\n.chatbox .chat p.error::after {\r\n    content: \"!\";\r\n    color: #721c24;\r\n    font-weight: 600;\r\n    margin-left: 5px;\r\n}\r\n\r\n.chatbox .chat p.error {\r\n    color: #721c24;\r\n    background: #f8d7da;\r\n}\r\n\r\n@media (max-width: 375px) and (-webkit-min-device-pixel-ratio: 2),\r\n(max-width: 375px) and (min-device-pixel-ratio: 2) {\r\n    .chatbox .chat p.error {\r\n        background: #f8d7da;\r\n        color: #721c24;\r\n    }\r\n}\r\n\r\n.chatbot .chat-input {\r\n    width: 100%;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 12px;\r\n    background: #fff;\r\n    padding: 10px 20px 16px;\r\n    border-top: 1px solid #ccc;\r\n}\r\n\r\n.chat-input textarea {\r\n    height: 55px;\r\n    max-height: 150px;\r\n    /* Prevents excessive growth */\r\n    width: 100%;\r\n    border: none;\r\n    outline: none;\r\n    font-size: 0.95rem;\r\n    resize: none;\r\n    border-radius: 5px;\r\n    overflow-y: auto;\r\n    /* Enables scrolling when needed */\r\n}\r\n\r\n.chat-input span {\r\n    color: rgb(201, 203, 216);\r\n    font-size: 20px;\r\n    cursor: pointer;\r\n    transition: 0.3s ease;\r\n}\r\n\r\n.chat-input textarea:valid~span {\r\n    color: #4aa017;\r\n}\r\n\r\n@media (max-width: 767px) {\r\n    .chatbot {\r\n        width: 100%;\r\n        height: 100%;\r\n        border-radius: 0;\r\n        bottom: 0;\r\n        right: 0;\r\n    }\r\n\r\n    .chatbot header span.close-btn {\r\n        display: block !important;\r\n        /* Ensure the close button is visible */\r\n        right: 15px;\r\n        top: 50%;\r\n        transform: translateY(-50%);\r\n        cursor: pointer;\r\n    }\r\n\r\n    .chatbot header {\r\n        border-radius: 0;\r\n    }\r\n\r\n    .chatbot .chat-input {\r\n        position: relative;\r\n    }\r\n\r\n    .chatbot .chat-input textarea {\r\n        padding: 16px 15px 16px 0;\r\n    }\r\n\r\n    .chatbot .chat-input span {\r\n        height: 55px;\r\n        line-height: 55px;\r\n        font-size: 1.35rem;\r\n    }\r\n}\r\n\r\n@media (max-width: 575px) {\r\n    .chatbot {\r\n        width: 100%;\r\n        height: 100%;\r\n        border-radius: 0;\r\n        bottom: 0;\r\n        right: 0;\r\n    }\r\n\r\n    .chatbot header {\r\n        border-radius: 0;\r\n    }\r\n\r\n    .chatbot .chat-input {\r\n        position: relative;\r\n    }\r\n\r\n    .chatbot .chat-input textarea {\r\n        padding: 16px 15px 16px 0;\r\n    }\r\n\r\n    .chatbot .chat-input span {\r\n        height: 55px;\r\n        line-height: 55px;\r\n        font-size: 1.35rem;\r\n    }\r\n}";
styleInject(css_248z);

const ChatBotWidget = ({ callApi, chatbotName = "Chatbot", isTypingMessage = "Typing...", IncommingErrMsg = "Oops! Something went wrong. Please try again.", primaryColor = "#eb4034", inputMsgPlaceholder = "Send a Message", chatIcon = React.createElement(ChatIcon, null), botIcon = React.createElement(BotIcon, null), botFontStyle = {}, typingFontStyle = {}, userFontStyle = {}, chatInputStyle = {}, handleNewMessage, onBotResponse, messages = [], useInnerHTML = false, }) => {
    const [userMessage, setUserMessage] = useState("");
    const [typing, setTyping] = useState(false);
    const chatInputRef = useRef(null);
    const chatboxRef = useRef(null);
    const handleChat = () => __awaiter(void 0, void 0, void 0, function* () {
        const trimmedMessage = userMessage.trim();
        if (!trimmedMessage)
            return;
        setUserMessage("");
        // Display outgoing message
        const outgoingMessage = { role: "user", content: trimmedMessage };
        handleNewMessage === null || handleNewMessage === void 0 ? void 0 : handleNewMessage(outgoingMessage);
        try {
            setTyping(true);
            // Use the custom API call function
            const botResponse = yield callApi(trimmedMessage);
            // Call the callback function with the bot's response
            onBotResponse === null || onBotResponse === void 0 ? void 0 : onBotResponse(botResponse);
        }
        catch (error) {
            // Display error message if API call fails
            const errorMessage = { role: "error", content: IncommingErrMsg };
            handleNewMessage === null || handleNewMessage === void 0 ? void 0 : handleNewMessage(errorMessage);
        }
        finally {
            setTyping(false);
        }
    });
    const handleInputChange = (event) => {
        setUserMessage(event.target.value);
        // Reset height to auto before calculating new height
        chatInputRef.current.style.height = "auto";
        // Adjust the height dynamically based on content
        chatInputRef.current.style.height = `${Math.min(chatInputRef.current.scrollHeight, 80)}px`;
    };
    const handleKeyPress = (event) => {
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
        }
        else {
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
    return (React.createElement("div", { className: "chatbot-container", style: {
            background: primaryColor,
            backgroundColor: primaryColor,
        } },
        React.createElement("button", { className: "chatbot-toggler", onClick: toggleChatbot, style: { background: primaryColor } },
            React.createElement("span", { className: "material-symbols-rounded" }, chatIcon),
            React.createElement("span", { className: "material-symbols-outlined" }, "Close")),
        React.createElement("div", { className: "chatbot" },
            React.createElement("header", { style: { background: primaryColor } },
                React.createElement("h2", null, chatbotName),
                React.createElement("span", { className: "close-btn material-symbols-outlined", onClick: toggleChatbot }, "close")),
            React.createElement("ul", { className: "chatbox", ref: chatboxRef },
                messages.map((msg, index) => (React.createElement("li", { key: index, className: `chat ${msg.role === "user" ? "outgoing" : "incoming"}` },
                    msg.role !== "user" && (React.createElement("span", { className: "material-symbols-outlined" }, botIcon)),
                    React.createElement("p", Object.assign({ style: msg.role === "assistant"
                            ? botFontStyle
                            : msg.role === "error"
                                ? botFontStyle
                                : msg.role === "user"
                                    ? userFontStyle
                                    : { background: primaryColor } }, (useInnerHTML
                        ? { dangerouslySetInnerHTML: { __html: msg.content } }
                        : { children: msg.content })))))),
                typing && (React.createElement("li", { key: Date.now(), className: "chat incoming" },
                    React.createElement("span", { className: "material-symbols-outlined" }, botIcon),
                    React.createElement("p", { style: typingFontStyle }, isTypingMessage)))),
            React.createElement("div", { className: "chat-input" },
                React.createElement("textarea", { ref: chatInputRef, placeholder: inputMsgPlaceholder, spellCheck: "false", required: true, value: userMessage, onChange: handleInputChange, onKeyDown: handleKeyPress, maxLength: 500, style: chatInputStyle }),
                React.createElement("span", { id: "send-btn", className: "material-symbols-outlined", onClick: handleChat }, "send"))),
        React.createElement("style", null, `
          .chat-input textarea:valid~span {
              color: ${primaryColor};
          }
        `)));
};
const ChatIcon = () => {
    return (React.createElement(React.Fragment, null,
        React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", xmlSpace: "preserve", width: 18, height: 18, fill: "#fff", stroke: "#fff", viewBox: "0 0 58 58" },
            React.createElement("path", { d: "M53 3.293H5c-2.722 0-5 2.278-5 5v33c0 2.722 2.278 5 5 5h27.681l-4.439-5.161a1 1 0 1 1 1.517-1.304l4.998 5.811L43 54.707v-8.414h10c2.722 0 5-2.278 5-5v-33c0-2.722-2.278-5-5-5z", style: {
                    fill: "#fff",
                } }),
            React.createElement("circle", { cx: 15, cy: 24.799, r: 3, style: {
                    fill: "#fff",
                } }),
            React.createElement("circle", { cx: 29, cy: 24.799, r: 3, style: {
                    fill: "#fff",
                } }),
            React.createElement("circle", { cx: 43, cy: 24.799, r: 3, style: {
                    fill: "#fff",
                } }))));
};
const BotIcon = () => {
    return (React.createElement(React.Fragment, null,
        React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", xmlSpace: "preserve", width: 18, height: 18, fill: "#fff", stroke: "#fff", viewBox: "0 0 58 58" },
            React.createElement("path", { d: "M53 3.293H5c-2.722 0-5 2.278-5 5v33c0 2.722 2.278 5 5 5h27.681l-4.439-5.161a1 1 0 1 1 1.517-1.304l4.998 5.811L43 54.707v-8.414h10c2.722 0 5-2.278 5-5v-33c0-2.722-2.278-5-5-5z", style: {
                    fill: "#fff",
                } }),
            React.createElement("circle", { cx: 15, cy: 24.799, r: 3, style: {
                    fill: "#fff",
                } }),
            React.createElement("circle", { cx: 29, cy: 24.799, r: 3, style: {
                    fill: "#fff",
                } }),
            React.createElement("circle", { cx: 43, cy: 24.799, r: 3, style: {
                    fill: "#fff",
                } }))));
};

export { ChatBotWidget };
