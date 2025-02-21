import type { UIMessage } from "ai";

import { ChatMessage } from "./ChatMessage";
import { useEffect, useRef } from "react";

interface ChatBodyProps {
  messages: UIMessage[];
}
export default function ChatBody({ messages }: ChatBodyProps) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
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
                    <div className="text-white-600 text-sm">
                      Loading answers...
                    </div>
                  ) : null}
                </div>
              );
            }
          })}
        </div>
      ))}
      {messagesEndRef && <div id="anchor" ref={messagesEndRef}></div>}
    </div>
  );
}
