"use client";
import { X } from "lucide-react";
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
