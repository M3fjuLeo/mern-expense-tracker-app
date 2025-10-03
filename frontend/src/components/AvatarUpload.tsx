import { ChangeEvent, useRef, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { LuUpload } from "react-icons/lu";

type AvatarUploadProps = {
  onFileSelect: (file: File) => void;
};

const AvatarUpload = ({ onFileSelect }: AvatarUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileClick = (): void => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      onFileSelect(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mt-8 text-center">
      <div
        className="cursor-pointer relative inline-block"
        onClick={handleFileClick}
      >
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Avatar preview"
            className="size-18 rounded-full object-cover "
          />
        ) : (
          <FaRegUser className="bg-purple-200 rounded-full size-18 p-2 items-center flex text-purple-600" />
        )}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <LuUpload className="absolute -right-2 -bottom-1 size-8 rounded-full bg-purple-500 text-white p-1" />
      </div>
    </div>
  );
};

export default AvatarUpload;
