import { useState, useRef, useEffect } from "react";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../constants/const";
import axios from "axios";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);
  const firstName = user?.firstName;
  const lastName = user?.lastName;

  const fetchMessages = async () => {
    try {
      const messagesResponse = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });
      const chatMessage = messagesResponse?.data?.messages.map((msg) => {
        return {
          id: msg?._id,
          text: msg?.text,
          sender: msg?.senderId?.firstName + " " + msg?.senderId?.lastName,
          senderId: msg?.senderId?._id,
        };
      });
      setMessages(chatMessage);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    const socket = createSocketConnection();
    socket.emit("joinChat", { userId, targetUserId, firstName, lastName });

    // Use senderId from incoming message, do not fallback to current userId
    socket.on("messageReceived", ({ text, firstName, lastName, senderId }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Date.now(),
          text,
          sender: `${firstName} ${lastName}`,
          senderId,  // Correct senderId from server
        },
      ]);
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId, firstName, lastName]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    socketRef.current.emit("sendMessage", { userId, targetUserId, text: input, firstName, lastName });
    setInput("");
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col h-[80vh] w-full max-w-md bg-indigo-900 rounded-lg overflow-hidden shadow-lg shadow-indigo-900/50">
        <div className="flex-1 px-4 py-4 overflow-auto">
          <div className="flex flex-col space-y-2">
            {messages.map((msg) => {
              const isSelf = msg.senderId === userId || msg.sender === `${firstName} ${lastName}`;
              return (
                <div key={msg.id} className={`chat ${isSelf ? "chat-end" : "chat-start"}`}>
                  <div className="chat-header text-gray-100">{msg.sender}</div>
                  <div className="chat-bubble bg-indigo-600 text-white shadow-lg shadow-indigo-900/50">
                    {msg.text}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex border-t border-indigo-700 p-3 bg-green-800 rounded-b-lg"
        >
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border border-indigo-700 rounded-full px-4 py-2 bg-green-900 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="ml-3 bg-green-500 text-white font-semibold px-5 py-2 rounded-full hover:bg-indigo-700 transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
