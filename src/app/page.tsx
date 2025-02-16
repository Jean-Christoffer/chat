"use client";

import { useChat } from "@ai-sdk/react";
import { Chat as ChatMessage } from "./components/Chat";
import { Button } from "./components/Button";
import { useEffect, useRef } from "react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, error } = useChat({
    maxSteps: 10,
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="p-6 h-screen flex flex-col justify-center items-center">
      <div
        id="chat-container"
        className="flex flex-col bg-white p-6 rounded-lg border border-[#e5e7eb] min-h-[50vh]  max-w-7xl w-full"
      >
        <div className="flex flex-col space-y-1.5 pb-6 ">
          <h2 className="font-semibold text-lg tracking-tight text-zinc-800">
            The Assistant
          </h2>
        </div>
        <div className="overflow-y-auto">
          <div
            className="pr-4 overflow-y-auto"
            id="chat-messages"
            style={{ display: "table" }}
            scroll-behavior="smooth"
          >
            {messages.map(({ content, id, role, toolInvocations }) => (
              <div key={id}>
                {content.length > 0 && (
                  <ChatMessage key={id} role={role} message={content} />
                )}
                {toolInvocations?.map((toolInvocation) => {
                  const { toolName, toolCallId, state } = toolInvocation;
                  if (state !== "result") {
                    return (
                      <div key={toolCallId}>
                        {toolName === "getInformation" ? (
                          <div className="text-gray-600 text-sm">
                            Loading answers...
                          </div>
                        ) : null}
                      </div>
                    );
                  }
                })}
              </div>
            ))}
            <div id="anchor" ref={messagesEndRef}></div>
          </div>
        </div>
        {error && (
          <div className="text-red-500 text-sm mt-2">{error?.message}</div>
        )}
        <div className="flex min-w-full pt-5 mt-auto">
          <form
            onSubmit={handleSubmit}
            className="flex w-full justify-center space-x-2"
          >
            <input
              className="flex w-full h-10 rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
              placeholder="Ask any question"
              value={input}
              onChange={handleInputChange}
            />
            <Button label="Send" type="submit" onClick={handleSubmit} />
          </form>
        </div>
      </div>
    </div>
  );
}
