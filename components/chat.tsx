'use client';

import { useState } from 'react';
import { MultimodalInput } from './multimodal-input';
import { Messages } from './messages';
import { useBlockSelector } from '@/hooks/use-block';
import { streamGenerator } from "@/utils/streaming";

export function Chat() {
  const [messages, setMessages] = useState<any>([]);
  const [input, setInput] = useState<string>("");
  const isBlockVisible = useBlockSelector((state) => state.isVisible);
  const [isLoading, setIsLoading] = useState(false);
  let accumulatedMessage = '';

  async function handleApiCall(message: string) {
    try {
      const response = await fetch("http://127.0.0.1:8000/agent", { // Note the /stream endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: message }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if (!response.body) {
        throw new Error("Response body is null");
      }

      const reader = response.body.getReader();

      // Process the stream
      for await (const chunk of streamGenerator(reader)) {
        accumulatedMessage += chunk;
      }

    } catch (error) {
      console.error('Error:', error);
      setMessages((prevMessages: any) => [
        { role: 'assistant', content: 'Sorry, there was an error processing your request.' },
        ...prevMessages
      ]);
    } finally {
      // Update the most recent assistant message with accumulated content
      setMessages((prevMessages: any) => [
        ...prevMessages,
        { role: 'assistant', content: accumulatedMessage },
      ])
      setIsLoading(false);
    }
  }


  const handleSubmit = async (message: string) => {
    setIsLoading(true);
    setMessages((prevMessages: any) => [
      ...prevMessages,
      { role: 'user', content: message }
    ]);
    setInput("");
    handleApiCall(message)
  };


  return (
    <>
      <div className="flex flex-col min-w-0 h-dvh bg-background">
        <Messages
          isLoading={isLoading}
          messages={messages}
          isBlockVisible={isBlockVisible}
        />

        <form className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
          <MultimodalInput
            input={input}
            setInput={setInput}
            isLoading={false}
            messages={messages}
            setMessages={setMessages}
            onSubmit={handleSubmit}
          />
        </form>
      </div>

    </>
  );
}
