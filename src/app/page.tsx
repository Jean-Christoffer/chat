"use client";

import { useChat } from "@ai-sdk/react";

import FileUpload from "@/components/FileUpload";
import Form from "@/components/Chat/Form";
import ChatBody from "@/components/Chat/index";
import type { UIMessage } from "ai";

interface WelcomeMessageProps {
  hasMessages: boolean;
}
interface ErrorMessageProps {
  error: Error | undefined;
}
export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, error } = useChat({
    maxSteps: 10,
  });

  const hasMessages = (messages: UIMessage[]) => Boolean(messages.length);

  return (
    <main className="h-full w-full flex justify-center items-center flex-col ">
      <div
        id="chat-container"
        className="flex flex-col max-w-5xl w-full border-none bg-[#0A0A0A] relative h-screen p-4"
      >
        <Header />
        <div className="overflow-y-scroll flex flex-col h-full items-center [scrollbar-width:none]">
          <WelcomeMessage hasMessages={hasMessages(messages)} />
          <ChatBody messages={messages} />
        </div>
        <ErrorMessage error={error} />
        <Form
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </main>
  );
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ hasMessages }) => {
  if (hasMessages) return null;

  return (
    <h2 className="font-bold text-3xl m-auto">What can I help you with?</h2>
  );
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  if (!error) return null;

  return <div className="text-red-500 text-sm mt-2">{error.message}</div>;
};

const Header = () => {
  return (
    <header className="flex items-center justify-between space-y-1.5 pb-6 bg-[#1e1e1e] p-2 rounded mt-2 ">
      <h1 className="font-bold text-2xl  tracking-tight text-[#4EC9B0]">
        The Assistant 🤖
      </h1>
      <FileUpload />
    </header>
  );
};
