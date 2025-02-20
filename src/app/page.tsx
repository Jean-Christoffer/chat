"use client";

import { useChat } from "@ai-sdk/react";
import { Chat as ChatMessage } from "../components/Chat";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import FileUpload from "@/components/FileUpload";
import { Textarea } from "@/components/ui/textarea";
import Arrow from "@/components/Arrow";
export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, error } = useChat({
    maxSteps: 10,
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <main className="h-full w-full flex justify-center items-center flex-col ">
      <div
        id="chat-container"
        className="flex flex-col max-w-5xl w-full border-none bg-[#0A0A0A] relative h-screen"
      >
        <header className="flex items-center justify-between space-y-1.5 pb-6 bg-[#1e1e1e] p-2 rounded mt-2 ">
          <h1 className="font-bold text-2xl  tracking-tight text-[#4EC9B0]">
            The Assistant 🤖
          </h1>
          <FileUpload />
        </header>
        <div className="overflow-y-scroll flex flex-col h-full items-center [scrollbar-width:none]">
          {!messages.length && (
            <h2 className="font-bold text-3xl m-auto">
              What can i help you with ?
            </h2>
          )}
          <div
            className="w-full text-start overflow-y-auto"
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
          <div className="text-red  -500 text-sm mt-2">{error?.message}</div>
        )}

        <div className="flex max-w-xl  mx-auto mt-auto rounded-3xl w-full bg-[#1e1e1e] p-2 sticky bottom-3">
          <form
            onSubmit={handleSubmit}
            className="flex  items-center gap-2 justify-center  w-full"
          >
            <Textarea
              className="resize-none border-none text-[#4EC9B0] placeholder-[#2F8072] "
              rows={2}
              placeholder="Ask any question"
              value={input}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              onChange={handleInputChange}
            />
            <Button onClick={handleSubmit} className="  rounded-full">
              <Arrow />
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
