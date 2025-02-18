"use client";
import { useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { textParser } from "../../scripts/processText";
import UploadIcon from "./UploadIcon";

const FileUpload = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [currentFile, setCurrentFile] = useState<File>();
  const [uploadStatus, setUploadStatus] = useState<string>("");

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const selectedFile = files[0];
    setCurrentFile(selectedFile);
  };
  const handleFileSubmit = async () => {
    if (!currentFile || !fileInputRef.current) return;

    setUploadStatus("Uploading...");

    try {
      const response = await textParser(currentFile);
      setUploadStatus(response);
    } catch (error) {
      console.log(error);
      setUploadStatus("Upload failed. Please try again.");
    }

    setCurrentFile(undefined);

    // Clear upload status after 500ms
    setTimeout(() => setUploadStatus(""), 2000);
  };

  return (
    <div className="flex items-center gap-2">
      {!uploadStatus && (
        <>
          <Input
            type="file"
            accept=".docx, .doc, .pdf"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFile}
          />
          <svg
            width="25"
            height="25"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleClick}
            className="cursor-pointer hover:opacity-80 transition"
          >
            <path
              d="M3.5 2C3.22386 2 3 2.22386 3 2.5V12.5C3 12.7761 3.22386 13 3.5 13H11.5C11.7761 13 12 12.7761 12 12.5V6H8.5C8.22386 6 8 5.77614 8 5.5V2H3.5ZM9 2.70711L11.2929 5H9V2.70711ZM2 2.5C2 1.67157 2.67157 1 3.5 1H8.5C8.63261 1 8.75979 1.05268 8.85355 1.14645L12.8536 5.14645C12.9473 5.24021 13 5.36739 13 5.5V12.5C13 13.3284 12.3284 14 11.5 14H3.5C2.67157 14 2 13.3284 2 12.5V2.5Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
        </>
      )}
      {uploadStatus ? (
        <p className="text-[#4EC9B0]">{uploadStatus}</p>
      ) : (
        currentFile && (
          <div className="flex items-center">
            <p>
              <small>{currentFile?.name}</small>
            </p>
            <Button
              onClick={handleFileSubmit}
              className="m-0 p-2 bg-transparent text-white hover:bg-transparent"
            >
              <UploadIcon />
            </Button>
          </div>
        )
      )}
    </div>
  );
};

export default FileUpload;
