"use client";
import { FileIcon, X } from "lucide-react";
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";
interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  fileType: "messageFile" | "serverImage";
}
const FileUpload = ({ onChange, value, fileType }: FileUploadProps) => {
  const Type = value?.split(".").pop();
  if (value && Type !== "pdf") {
    return (
      <div className=" relative h-20 w-20">
        <Image fill src={value} alt="Upload" className=" rounded-full"></Image>
        <button
          className=" bg-rose-500 text-white rounded-full p-1 absolute top-0 right-0 shadow-sm"
          onClick={() => onChange("")}
        >
          <X className=" h-4 w-4" />
        </button>
      </div>
    );
  }
  if (value && Type === "pdf") {
    return (
      <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
        <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
        >
          {value}
        </a>
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
          type="button"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    );
  }
  return (
    <UploadDropzone
      endpoint={fileType}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(err) => {
        console.log(err);
      }}
    ></UploadDropzone>
  );
};

export default FileUpload;
