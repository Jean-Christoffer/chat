import { Message } from "ai";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

export const Chat = ({
  role,
  message,
}: {
  role: Message["role"];
  message: string;
}) => {
  return (
    <div
      className="flex gap-3 my-4 text-gray-600 text-sm flex-1"
      style={{ overflowAnchor: "none" }}
    >
      <div className="leading-relaxed">
        <span className="block font-bold text-gray-700">{role} </span>
        {role === "user" ? (
          <span>{message}</span>
        ) : (
          <Markdown
            components={{
              code(props) {
                const { children, className, ...rest } = props;
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  <SyntaxHighlighter
                    {...rest}
                    PreTag="div"
                    style={dark}
                    language={match[1]}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {message}
          </Markdown>
        )}
      </div>
    </div>
  );
};
