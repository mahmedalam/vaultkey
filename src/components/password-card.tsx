"use client";

import env from "@/env";
import { timeAgo } from "@/lib/utils";
import {
  Calendar,
  Copy,
  Edit,
  Eye,
  EyeOff,
  Globe,
  Key,
  ScrollText,
  ShieldAlert,
  ShieldCheck,
  ShieldX,
  Trash,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";
import CustomButton from "./custom-button";
import { Badge } from "./ui/badge";

export default function PasswordCard({
  id,
  title,
  url,
  username,
  password,
  note,
  category,
  securityLevel,
  createdAt,
  updatedAt,
  onDelete,
}: TPassword & { onDelete: (id: number) => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEdit = () => {
    router.push(`/edit-password/${id}`);
  };

  const handleDelete = async (id: number) => {
    const response = await fetch(`${env.baseUrl}/api/passwords?id=${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      toast.error("Failed to delete password");
      return;
    }

    toast.success("Password deleted successfully");
    onDelete(id);
  };

  return (
    <div className="card">
      {/* Service Name, Category, Security Level, Edit & Delete */}
      <div className="flex flex-col-reverse sm:flex-row flex-wrap-reverse items-end sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h2>{title}</h2>
          <Badge variant="secondary">{category}</Badge>
        </div>
        <div className="flex items-center gap-2">
          {securityLevel === "Low" ? (
            <ShieldX className="stroke-red-500 ml-auto" />
          ) : securityLevel === "Medium" ? (
            <ShieldAlert className="stroke-yellow-500 ml-auto" />
          ) : (
            <ShieldCheck className="stroke-green-500 ml-auto" />
          )}
          <CustomButton
            variant="ghost"
            icon={<Edit />}
            tooltip="Edit"
            onClick={handleEdit}
          />
          <CustomButton
            variant="ghost"
            icon={<Trash />}
            tooltip="Delete"
            onClick={() => handleDelete(id)}
          />
        </div>
      </div>

      {/* Username/Email */}
      <div className="flex items-center gap-2">
        <User className="size-4" />
        <p>{username}</p>
        <CopyToClipboard
          text={username}
          onCopy={() => toast.success("Username copied")}
        >
          <CustomButton
            variant="ghost"
            size="icon"
            icon={<Copy />}
            tooltip="Copy Username"
          />
        </CopyToClipboard>
      </div>

      {/* Password */}
      <div className="flex items-center gap-2">
        <Key className="size-4" />
        <p className="flex">
          {showPassword
            ? password
            : Array.from({ length: password.length }).map((_, index) => (
                <span key={index} className="mx-0.5">
                  •
                </span>
              ))}
        </p>
        <CustomButton
          variant="ghost"
          size="icon"
          icon={showPassword ? <EyeOff /> : <Eye />}
          tooltip={showPassword ? "Hide Password" : "Show Password"}
          onClick={togglePasswordVisibility}
        />
        <CopyToClipboard
          text={password}
          onCopy={() => toast.success("Password copied")}
        >
          <CustomButton
            variant="ghost"
            size="icon"
            icon={<Copy />}
            tooltip="Copy Password"
          />
        </CopyToClipboard>
      </div>

      {/* URL */}
      <div className="flex items-center gap-2">
        <Globe className="size-4" />
        <Link href={url} target="_blank">
          <p className="text-blue-500 underline">{url}</p>
        </Link>
        <CopyToClipboard text={url} onCopy={() => toast.success("URL copied")}>
          <CustomButton
            variant="ghost"
            size="icon"
            icon={<Copy />}
            tooltip="Copy URL"
          />
        </CopyToClipboard>
      </div>

      {/* Notes */}
      {note && (
        <div className="flex gap-2">
          <ScrollText className="size-4" />
          <p className="max-w-lg">{note}</p>
          <CopyToClipboard
            text={note}
            onCopy={() => toast.success("Notes copied")}
          >
            <CustomButton
              variant="ghost"
              size="icon"
              icon={<Copy />}
              tooltip="Copy Notes"
            />
          </CopyToClipboard>
        </div>
      )}

      <hr className="bg-border my-4" />

      {/* Date */}
      <div className="space-x-6">
        <span className="inline-flex items-center gap-2">
          <Calendar className="size-4" />
          <p>Created: {timeAgo(new Date(createdAt))}</p>
        </span>
        <span className="inline-flex items-center gap-2">
          <Calendar className="size-4" />
          <p>Updated: {timeAgo(new Date(updatedAt))}</p>
        </span>
      </div>
    </div>
  );
}
