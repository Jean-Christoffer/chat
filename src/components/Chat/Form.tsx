"use client";

import { useEffect } from "react";

import type { ChangeEventHandler, FormEventHandler } from "react";

import Arrow from "../ui/Arrow";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface FormProps {
  handleSubmit: FormEventHandler<HTMLFormElement> | undefined;
  input: string;
  handleInputChange: ChangeEventHandler<HTMLTextAreaElement> | undefined;
}
export default function Form({
  handleSubmit,
  input,
  handleInputChange,
}: FormProps) {
  useEffect(() => {
    console.log(input);
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  };
  return (
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
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <Button className="  rounded-full">
          <Arrow />
        </Button>
      </form>
    </div>
  );
}
