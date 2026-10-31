"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface FileEntry {
  name: string;
  size: number;
  uploadedAt: string;
}

function formatSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getFileIcon(name: string): string {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  const icons: Record<string, string> = {
    pdf: "📄",
    doc: "📝", docx: "📝",
    xls: "📊", xlsx: "📊",
    png: "🖼️", jpg: "🖼️", jpeg: "🖼️", gif: "🖼️", webp: "🖼️", svg: "🖼️",
    mp4: "🎬", mov: "🎬", avi: "🎬", mkv: "🎬",
    mp3: "🎵", wav: "🎵", flac: "🎵",
    zip: "🗜️", rar: "🗜️", "7z": "🗜️", tar: "🗜️", gz: "🗜️",
    js: "📦", ts: "📦", jsx: "📦", tsx: "📦",
    html: "🌐", css: "🎨",
    json: "📋", xml: "📋", yaml: "📋", yml: "📋",
    sh: "⚙️", bat: "⚙️", ps1: "⚙️",
    txt: "📃", md: "📃",
  };
  return icons[ext] ?? "📁";
}

export default function FileServerPage() {
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [uploadPercent, setUploadPercent] = useState<number>(0);
  const [search, setSearch] = useState("");
  const [deletingFile, setDeletingFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchFiles = useCallback(async () => {
    try {
      const res = await fetch("/api/files");
      const data = await res.json();
      setFiles(data.files ?? []);
    } catch {
      setFiles([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const uploadFiles = async (fileList: FileList) => {
    setUploading(true);
    const total = fileList.length;

    for (let i = 0; i < total; i++) {
      const file = fileList[i];
      setUploadProgress(`Завантаження ${i + 1}/${total}: ${file.name}`);
      setUploadPercent(0);

      await new Promise<void>((resolve) => {
        const xhr = new XMLHttpRequest();
        const form = new FormData();
        form.append("file", file);

        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            setUploadPercent(Math.round((e.loaded / e.total) * 100));
          }
        };

        xhr.onload = () => resolve();
        xhr.onerror = () => resolve(); // continue even on error
        xhr.open("POST", "/api/files");
        xhr.send(form);
      });
    }

    setUploading(false);
    setUploadProgress(null);
    setUploadPercent(0);
    await fetchFiles();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      await uploadFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await uploadFiles(e.target.files);
      e.target.value = "";
    }
  };

  const handleDelete = async (name: string) => {
    setDeletingFile(name);
    await fetch("/api/files", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    setDeletingFile(null);
    await fetchFiles();
  };

  const filtered = files.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#09090b] text-white p-6 md:p-10">
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amber-400 mb-1">📂 File Server</h1>
          <p className="text-zinc-400 text-sm">
            Завантажуй, зберігай та скачуй файли
          </p>
        </div>

        {/* Drop Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onClick={() => fileInputRef.current?.click()}
          className={`
            border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-200 mb-6 select-none
            ${dragOver
              ? "border-amber-400 bg-amber-400/10 scale-[1.01]"
              : "border-zinc-700 hover:border-zinc-500 bg-zinc-900/50 hover:bg-zinc-900"
            }
            ${uploading ? "pointer-events-none opacity-60" : ""}
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileInput}
          />
          {uploading ? (
            <div className="space-y-3">
              <div className="text-3xl animate-bounce">⏳</div>
              <p className="text-amber-400 font-medium">{uploadProgress}</p>
              {/* Progress bar */}
              <div className="w-full max-w-xs mx-auto bg-zinc-800 rounded-full h-2 overflow-hidden">
                <div
                  className="h-2 bg-amber-400 rounded-full transition-all duration-300"
                  style={{ width: `${uploadPercent}%` }}
                />
              </div>
              <p className="text-zinc-500 text-xs">{uploadPercent}%</p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-4xl">☁️</div>
              <p className="text-zinc-300 font-medium">
                Перетягни файли сюди або{" "}
                <span className="text-amber-400 underline underline-offset-2">
                  натисни для вибору
                </span>
              </p>
              <p className="text-zinc-500 text-xs">Будь-які файли, будь-який розмір</p>
            </div>
          )}
        </div>

        {/* Search + stats */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4 items-start sm:items-center justify-between">
          <input
            type="text"
            placeholder="🔍 Пошук файлів..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-72 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2 text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
          />
          <span className="text-zinc-500 text-sm whitespace-nowrap">
            {filtered.length} файл{filtered.length === 1 ? "" : "ів"} ·{" "}
            {formatSize(filtered.reduce((acc, f) => acc + f.size, 0))} всього
          </span>
        </div>

        {/* File list */}
        <div className="rounded-2xl border border-zinc-800 overflow-hidden bg-zinc-900/40">
          {loading ? (
            <div className="py-16 text-center text-zinc-500">
              <div className="text-3xl mb-2 animate-spin inline-block">⚙️</div>
              <p>Завантаження...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center text-zinc-500">
              <div className="text-4xl mb-3">📭</div>
              <p className="font-medium">
                {search ? "Нічого не знайдено" : "Файлів поки немає"}
              </p>
              {!search && (
                <p className="text-xs mt-1">Завантаж перший файл вище</p>
              )}
            </div>
          ) : (
            <ul className="divide-y divide-zinc-800">
              {/* Table header */}
              <li className="grid grid-cols-[2rem_1fr_6rem_9rem_5.5rem] gap-2 px-4 py-2 text-xs text-zinc-500 font-medium uppercase tracking-wide">
                <span />
                <span>Назва</span>
                <span className="text-right">Розмір</span>
                <span className="text-right hidden sm:block">Дата</span>
                <span />
              </li>

              {filtered.map((file) => (
                <li
                  key={file.name}
                  className="grid grid-cols-[2rem_1fr_6rem_9rem_5.5rem] gap-2 px-4 py-3 items-center hover:bg-zinc-800/60 transition-colors group"
                >
                  {/* Icon */}
                  <span className="text-xl leading-none">{getFileIcon(file.name)}</span>

                  {/* Name */}
                  <span
                    className="text-zinc-200 text-sm font-medium truncate"
                    title={file.name}
                  >
                    {file.name}
                  </span>

                  {/* Size */}
                  <span className="text-zinc-400 text-xs text-right">
                    {formatSize(file.size)}
                  </span>

                  {/* Date */}
                  <span className="text-zinc-500 text-xs text-right hidden sm:block">
                    {formatDate(file.uploadedAt)}
                  </span>

                  {/* Actions */}
                  <div className="flex gap-1 justify-end">
                    {/* Download */}
                    <a
                      href={`/api/files/${encodeURIComponent(file.name)}`}
                      download={file.name}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-amber-400 hover:bg-amber-400/10 transition-all"
                      title="Скачати"
                      onClick={(e) => e.stopPropagation()}
                    >
                      ⬇️
                    </a>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(file.name)}
                      disabled={deletingFile === file.name}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-400/10 transition-all disabled:opacity-40"
                      title="Видалити"
                    >
                      {deletingFile === file.name ? "⏳" : "🗑️"}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
