"use client";
import React, { useState } from "react";
import { Button } from "flowbite-react";
import axios from "axios";

function ChatBot() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      const response = await axios.post("http://localhost:5001/chatbot", {
        query: message,
      });

      const chatbotResponse = response.data.response;

      // Append the new message and response to the chat history
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { question: message, answer: chatbotResponse },
      ]);

      setMessage(""); // Clear input after sending
    } catch (error) {
      console.error("Error communicating with the chatbot:", error);
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { question: message, answer: "Sorry, there was an error." },
      ]);
    }
  };

  return (
    <main className="flex-1 p-16 flex flex-col items-center justify-between">
      <h1 className="items-center my-2 text-2xl font-space">
        ⭐Mental Health AI ChatBot⭐
      </h1>

      {/* Chat History */}
      <div className="flex-grow w-full h-[60vh] border-2 border-gray-300 rounded-md bg-white p-4 overflow-y-scroll">
        {chatHistory.map((entry, index) => (
          <div key={index} className="my-2">
            <p className="font-bold font-space text-black text-lg">
              User: {entry.question}
            </p>
            <div className="text-gray-600 font-space text-md">
              <p className="font-bold">Chatbot:</p>
              <ul className="list-disc pl-5">
                {entry.answer
                  .split("\n")
                  .map((point, i) =>
                    point.trim() ? <li key={i}>{point}</li> : null
                  )}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input and Send Button */}
      <div className="flex w-full bg-white h-16 mt-5 rounded-md items-center border border-gray-300 px-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
          className="flex-1 h-full bg-transparent focus:outline-none"
        />
        <Button
          onClick={handleSendMessage}
          className="flex items-center justify-center w-12 h-12 ml-2 bg-black font-redhat hover:bg-white hover:text-black"
        >
          Send
        </Button>
      </div>
    </main>
  );
}

export default ChatBot;
