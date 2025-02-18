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
    <main className="p-6 h-screen flex flex-col justify-center items-center">
      <div
        id="chat-container"
        className="flex flex-col p-5 rounded-xl border  min-h-[50vh]  max-w-7xl w-full shadow-lg shadow-[#007acc] bg-[#0A0A0A]"
      >
        <header className="flex flex-col space-y-1.5 pb-6 bg-[#1e1e1e] p-2 rounded ">
          <h1 className="font-bold text-2xl  tracking-tight text-[#4EC9B0]">
            The Assistant 🤖
          </h1>
        </header>
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
          <div className="text-red  -500 text-sm mt-2">{error?.message}</div>
        )}

        <div className="flex   max-w-xl  mx-auto mt-auto rounded-3xl w-full bg-[#1e1e1e] p-2">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-2 justify-center  w-full"
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
            <div className="flex items-center justify-between w-full p-2">
              <FileUpload />

              <Button onClick={handleSubmit} className=" h-full rounded-full">
                <Arrow />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
