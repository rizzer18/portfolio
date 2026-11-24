"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  UploadCloud,
  Search,
  Eye,
  ExternalLink,
  Download,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Copy,
  Check,
  FileText,
  Image as ImageIcon,
  Film,
  Music,
  Archive,
  FileCode,
  File as FileGeneric,
  LayoutGrid,
  List,
  ArrowLeft,
  Loader2,
  FolderOpen,
} from "lucide-react";

interface FileEntry {
  name: string;
  size: number;
  uploadedAt: string;
}

type PreviewKind = "image" | "video" | "audio" | "pdf" | "text" | "other";

const IMAGE_EXTS = new Set(["png", "jpg", "jpeg", "gif", "webp", "svg", "bmp", "ico", "avif"]);
const VIDEO_EXTS = new Set(["mp4", "webm", "ogg", "ogv", "mov"]);
const AUDIO_EXTS = new Set(["mp3", "wav", "flac", "m4a", "aac"]);
const PDF_EXTS = new Set(["pdf"]);
const TEXT_EXTS = new Set([
  "txt", "md", "json", "xml", "yaml", "yml", "csv", "log", "ini", "conf",
  "js", "jsx", "ts", "tsx", "html", "css", "scss", "py", "cs", "java",
  "c", "cpp", "h", "go", "rs", "sh", "bat", "ps1", "sql",
]);
const ARCHIVE_EXTS = new Set(["zip", "rar", "7z", "tar", "gz", "bz2", "xz"]);

function getExt(name: string): string {
  const parts = name.split(".");
  return parts.length > 1 ? parts.pop()!.toLowerCase() : "";
}

function getPreviewKind(name: string): PreviewKind {
  const ext = getExt(name);
  if (IMAGE_EXTS.has(ext)) return "image";
  if (VIDEO_EXTS.has(ext)) return "video";
  if (AUDIO_EXTS.has(ext)) return "audio";
  if (PDF_EXTS.has(ext)) return "pdf";
  if (TEXT_EXTS.has(ext)) return "text";
  return "other";
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

function renderFileTypeIcon(name: string, size = 18) {
  const kind = getPreviewKind(name);
  const ext = getExt(name);
  if (kind === "image") return <ImageIcon size={size} className="text-amber-400" />;
  if (kind === "video") return <Film size={size} className="text-violet-400" />;
  if (kind === "audio") return <Music size={size} className="text-emerald-400" />;
  if (kind === "pdf") return <FileText size={size} className="text-rose-400" />;
  if (kind === "text") return <FileCode size={size} className="text-sky-400" />;
  if (ARCHIVE_EXTS.has(ext)) return <Archive size={size} className="text-orange-400" />;
  return <FileGeneric size={size} className="text-zinc-400" />;
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
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  // Preview Modal state
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [textContent, setTextContent] = useState<string | null>(null);
  const [textLoading, setTextLoading] = useState(false);
  const [copied, setCopied] = useState(false);

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

  const filtered = files.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  const activeFile =
    previewIndex !== null && filtered[previewIndex] ? filtered[previewIndex] : null;

  // Reset zoom/rotation & load text content if active file is text
  useEffect(() => {
    setZoom(1);
    setRotation(0);
    setCopied(false);
    setTextContent(null);

    if (!activeFile) return;
    const kind = getPreviewKind(activeFile.name);
    if (kind === "text") {
      if (activeFile.size > 2 * 1024 * 1024) {
        setTextContent("Файл занадто великий для вбудованого текстового перегляду (> 2 MB). Відкрийте його у новій вкладці.");
        return;
      }
      let cancelled = false;
      setTextLoading(true);
      fetch(`/api/files/${encodeURIComponent(activeFile.name)}`)
        .then((r) => r.text())
        .then((txt) => {
          if (!cancelled) setTextContent(txt);
        })
        .catch(() => {
          if (!cancelled) setTextContent("Не вдалося завантажити вміст файлу.");
        })
        .finally(() => {
          if (!cancelled) setTextLoading(false);
        });
      return () => {
        cancelled = true;
      };
    }
  }, [activeFile]);

  // Keyboard shortcuts inside preview modal
  useEffect(() => {
    if (previewIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreviewIndex(null);
      if (e.key === "ArrowRight") {
        setPreviewIndex((prev) =>
          prev === null ? null : (prev + 1) % filtered.length
        );
      }
      if (e.key === "ArrowLeft") {
        setPreviewIndex((prev) =>
          prev === null ? null : (prev - 1 + filtered.length) % filtered.length
        );
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [previewIndex, filtered.length]);

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
        xhr.onerror = () => resolve();
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
    if (activeFile?.name === name) {
      setPreviewIndex(null);
    }
    await fetch("/api/files", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    setDeletingFile(null);
    await fetchFiles();
  };

  const copyText = async () => {
    if (!textContent) return;
    try {
      await navigator.clipboard.writeText(textContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const inlineUrl = (name: string) => `/api/files/${encodeURIComponent(name)}`;
  const downloadUrl = (name: string) => `/api/files/${encodeURIComponent(name)}?download=1`;

  return (
    <div className="min-h-screen bg-[#070709] text-white relative overflow-x-hidden">
      {/* Subtle ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[radial-gradient(circle,rgba(245,158,11,0.09)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shadow-gold-sm">
              <FolderOpen size={24} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
                <span>File</span>
                <span className="text-gold-gradient">Server</span>
              </h1>
              <p className="text-zinc-400 text-xs sm:text-sm">
                Відкривай прямо в браузері, завантажуй та зберігай файли
              </p>
            </div>
          </div>

          <Link
            href="/"
            className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-amber-400 hover:border-amber-400/40 transition-all"
          >
            <ArrowLeft size={14} />
            <span>На портфоліо</span>
          </Link>
        </div>

        {/* Drop Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onClick={() => fileInputRef.current?.click()}
          className={`
            relative border-2 border-dashed rounded-3xl p-8 sm:p-10 text-center cursor-pointer transition-all duration-300 mb-6 select-none backdrop-blur-md
            ${
              dragOver
                ? "border-amber-400 bg-amber-400/10 shadow-gold-sm scale-[1.005]"
                : "border-zinc-800 hover:border-amber-400/50 bg-zinc-900/40 hover:bg-zinc-900/70"
            }
            ${uploading ? "pointer-events-none opacity-75" : ""}
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
              <Loader2 size={32} className="mx-auto text-amber-400 animate-spin" />
              <p className="text-amber-400 font-semibold text-sm">{uploadProgress}</p>
              <div className="w-full max-w-xs mx-auto bg-zinc-800 rounded-full h-2 overflow-hidden">
                <div
                  className="h-2 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-200"
                  style={{ width: `${uploadPercent}%` }}
                />
              </div>
              <p className="text-zinc-500 text-xs font-mono">{uploadPercent}%</p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-zinc-800/80 border border-zinc-700/70 flex items-center justify-center text-amber-400 mb-3">
                <UploadCloud size={24} />
              </div>
              <p className="text-zinc-200 font-medium text-sm sm:text-base">
                Перетягни файли сюди або{" "}
                <span className="text-amber-400 underline underline-offset-4">
                  натисни для вибору
                </span>
              </p>
              <p className="text-zinc-500 text-xs">
                Будь-які файли · Клік по файлу відкриває перегляд без скачування
              </p>
            </div>
          )}
        </div>

        {/* Search + View Toggle + Stats */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4 items-stretch sm:items-center justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Пошук файлів..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3">
            <span className="text-zinc-500 text-xs sm:text-sm whitespace-nowrap">
              {filtered.length} файл{filtered.length === 1 ? "" : "ів"} ·{" "}
              {formatSize(filtered.reduce((acc, f) => acc + f.size, 0))} всього
            </span>

            <div className="flex items-center bg-zinc-900/90 border border-zinc-800 rounded-xl p-1">
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === "list"
                    ? "bg-amber-400 text-black"
                    : "text-zinc-400 hover:text-white"
                }`}
                title="Список"
              >
                <List size={15} />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-amber-400 text-black"
                    : "text-zinc-400 hover:text-white"
                }`}
                title="Плитка"
              >
                <LayoutGrid size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* File Container */}
        {loading ? (
          <div className="rounded-3xl border border-zinc-800/80 bg-zinc-900/40 py-20 text-center text-zinc-500">
            <Loader2 size={28} className="mx-auto mb-3 animate-spin text-amber-400" />
            <p className="text-sm">Завантаження списку файлів...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-3xl border border-zinc-800/80 bg-zinc-900/40 py-20 text-center text-zinc-500">
            <FolderOpen size={36} className="mx-auto mb-3 text-zinc-600" />
            <p className="font-medium text-zinc-300">
              {search ? "Нічого не знайдено" : "Файлів поки немає"}
            </p>
            {!search && (
              <p className="text-xs mt-1 text-zinc-500">Завантаж перший файл вище</p>
            )}
          </div>
        ) : viewMode === "list" ? (
          <div className="rounded-3xl border border-zinc-800/90 overflow-hidden bg-zinc-900/40 backdrop-blur-md">
            <ul className="divide-y divide-zinc-800/80">
              <li className="grid grid-cols-[2.5rem_1fr_5.5rem_auto] sm:grid-cols-[2.5rem_1fr_6rem_9.5rem_8.5rem] gap-3 px-4 sm:px-5 py-3 text-[11px] text-zinc-500 font-semibold uppercase tracking-wider bg-zinc-900/70">
                <span />
                <span>Назва (клік — відкрити)</span>
                <span className="text-right">Розмір</span>
                <span className="text-right hidden sm:block">Дата</span>
                <span className="text-right">Дії</span>
              </li>

              {filtered.map((file, idx) => {
                const isImg = getPreviewKind(file.name) === "image";
                return (
                  <li
                    key={file.name}
                    onClick={() => setPreviewIndex(idx)}
                    className="grid grid-cols-[2.5rem_1fr_5.5rem_auto] sm:grid-cols-[2.5rem_1fr_6rem_9.5rem_8.5rem] gap-3 px-4 sm:px-5 py-3 items-center hover:bg-zinc-800/60 transition-colors cursor-pointer group"
                  >
                    {/* Thumbnail or Icon */}
                    <div className="w-9 h-9 rounded-xl bg-zinc-800/80 border border-zinc-700/50 flex items-center justify-center overflow-hidden shrink-0">
                      {isImg ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={inlineUrl(file.name)}
                          alt={file.name}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        renderFileTypeIcon(file.name, 18)
                      )}
                    </div>

                    {/* Name */}
                    <div className="min-w-0">
                      <span
                        className="block text-zinc-100 group-hover:text-amber-300 text-sm font-medium truncate transition-colors"
                        title={file.name}
                      >
                        {file.name}
                      </span>
                      <span className="text-[11px] text-zinc-500 sm:hidden">
                        {formatDate(file.uploadedAt)}
                      </span>
                    </div>

                    {/* Size */}
                    <span className="text-zinc-400 text-xs text-right font-mono">
                      {formatSize(file.size)}
                    </span>

                    {/* Date */}
                    <span className="text-zinc-500 text-xs text-right hidden sm:block">
                      {formatDate(file.uploadedAt)}
                    </span>

                    {/* Actions */}
                    <div
                      className="flex items-center gap-1 justify-end"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => setPreviewIndex(idx)}
                        className="p-2 rounded-lg text-zinc-400 hover:text-amber-400 hover:bg-amber-400/10 transition-all cursor-pointer"
                        title="Переглянути тут"
                      >
                        <Eye size={15} />
                      </button>

                      <a
                        href={inlineUrl(file.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg text-zinc-400 hover:text-sky-400 hover:bg-sky-400/10 transition-all"
                        title="Відкрити в новій вкладці без скачування"
                      >
                        <ExternalLink size={15} />
                      </a>

                      <a
                        href={downloadUrl(file.name)}
                        download={file.name}
                        className="p-2 rounded-lg text-zinc-400 hover:text-emerald-400 hover:bg-emerald-400/10 transition-all"
                        title="Скачати файл"
                      >
                        <Download size={15} />
                      </a>

                      <button
                        onClick={() => handleDelete(file.name)}
                        disabled={deletingFile === file.name}
                        className="p-2 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-400/10 transition-all disabled:opacity-40 cursor-pointer"
                        title="Видалити"
                      >
                        {deletingFile === file.name ? (
                          <Loader2 size={15} className="animate-spin" />
                        ) : (
                          <Trash2 size={15} />
                        )}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          /* Grid View */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filtered.map((file, idx) => {
              const isImg = getPreviewKind(file.name) === "image";
              return (
                <div
                  key={file.name}
                  onClick={() => setPreviewIndex(idx)}
                  className="group rounded-2xl border border-zinc-800/90 bg-zinc-900/50 hover:border-amber-400/50 overflow-hidden flex flex-col cursor-pointer transition-all hover:-translate-y-0.5"
                >
                  <div className="aspect-[4/3] bg-zinc-950 flex items-center justify-center overflow-hidden relative">
                    {isImg ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={inlineUrl(file.name)}
                        alt={file.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      renderFileTypeIcon(file.name, 36)
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <span className="px-3 py-1.5 rounded-full bg-amber-400 text-black text-xs font-bold inline-flex items-center gap-1">
                        <Eye size={13} /> Відкрити
                      </span>
                    </div>
                  </div>
                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <p
                      className="text-xs font-medium text-zinc-200 truncate mb-1"
                      title={file.name}
                    >
                      {file.name}
                    </p>
                    <div
                      className="flex items-center justify-between pt-2 border-t border-zinc-800/80"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="text-[11px] text-zinc-500 font-mono">
                        {formatSize(file.size)}
                      </span>
                      <div className="flex items-center gap-1">
                        <a
                          href={inlineUrl(file.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 text-zinc-400 hover:text-sky-400"
                          title="Відкрити в новій вкладці"
                        >
                          <ExternalLink size={13} />
                        </a>
                        <a
                          href={downloadUrl(file.name)}
                          download={file.name}
                          className="p-1 text-zinc-400 hover:text-emerald-400"
                          title="Скачати"
                        >
                          <Download size={13} />
                        </a>
                        <button
                          onClick={() => handleDelete(file.name)}
                          className="p-1 text-zinc-400 hover:text-red-400 cursor-pointer"
                          title="Видалити"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* IN-BROWSER PREVIEW MODAL */}
      {activeFile && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex flex-col"
          onClick={() => setPreviewIndex(null)}
        >
          {/* Modal Top Toolbar */}
          <div
            className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-zinc-800/90 bg-zinc-950/90"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 min-w-0">
              {renderFileTypeIcon(activeFile.name, 20)}
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate max-w-[200px] sm:max-w-md">
                  {activeFile.name}
                </p>
                <p className="text-[11px] text-zinc-400">
                  {formatSize(activeFile.size)} · {formatDate(activeFile.uploadedAt)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              {getPreviewKind(activeFile.name) === "image" && (
                <div className="hidden sm:flex items-center gap-1 mr-2 bg-zinc-900 border border-zinc-800 rounded-xl px-2 py-1">
                  <button
                    onClick={() => setZoom((z) => Math.max(0.25, +(z - 0.25).toFixed(2)))}
                    className="p-1 text-zinc-300 hover:text-amber-400 cursor-pointer"
                    title="Зменшити"
                  >
                    <ZoomOut size={15} />
                  </button>
                  <span className="text-xs font-mono text-zinc-400 px-1.5">
                    {Math.round(zoom * 100)}%
                  </span>
                  <button
                    onClick={() => setZoom((z) => Math.min(4, +(z + 0.25).toFixed(2)))}
                    className="p-1 text-zinc-300 hover:text-amber-400 cursor-pointer"
                    title="Збільшити"
                  >
                    <ZoomIn size={15} />
                  </button>
                  <button
                    onClick={() => setRotation((r) => (r + 90) % 360)}
                    className="p-1 text-zinc-300 hover:text-amber-400 cursor-pointer ml-1"
                    title="Повернути"
                  >
                    <RotateCw size={15} />
                  </button>
                </div>
              )}

              {getPreviewKind(activeFile.name) === "text" && textContent && (
                <button
                  onClick={copyText}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 hover:border-amber-400/50 cursor-pointer"
                >
                  {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  <span>{copied ? "Скопійовано" : "Копіювати"}</span>
                </button>
              )}

              <a
                href={inlineUrl(activeFile.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-200 hover:text-amber-400 hover:border-amber-400/40 transition-colors"
                title="Відкрити напряму в новій вкладці браузера"
              >
                <ExternalLink size={14} />
                <span className="hidden sm:inline">У новій вкладці</span>
              </a>

              <a
                href={downloadUrl(activeFile.name)}
                download={activeFile.name}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold transition-colors"
              >
                <Download size={14} />
                <span className="hidden sm:inline">Скачати</span>
              </a>

              <button
                onClick={() => setPreviewIndex(null)}
                className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 cursor-pointer ml-1"
                title="Закрити (Esc)"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="flex-1 relative flex items-center justify-center p-4 sm:p-8 overflow-auto">
            {filtered.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewIndex((prev) =>
                      prev === null ? 0 : (prev - 1 + filtered.length) % filtered.length
                    );
                  }}
                  className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-zinc-900/90 border border-zinc-700 text-white hover:border-amber-400 hover:text-amber-400 flex items-center justify-center shadow-xl cursor-pointer transition-all"
                  title="Попередній файл (←)"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewIndex((prev) =>
                      prev === null ? 0 : (prev + 1) % filtered.length
                    );
                  }}
                  className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-zinc-900/90 border border-zinc-700 text-white hover:border-amber-400 hover:text-amber-400 flex items-center justify-center shadow-xl cursor-pointer transition-all"
                  title="Наступний файл (→)"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            <div
              className="max-w-5xl w-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {getPreviewKind(activeFile.name) === "image" && (
                <div className="overflow-auto max-h-[80vh] flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={inlineUrl(activeFile.name)}
                    alt={activeFile.name}
                    style={{
                      transform: `scale(${zoom}) rotate(${rotation}deg)`,
                      transition: "transform 0.2s ease",
                    }}
                    className="max-h-[78vh] max-w-full object-contain rounded-xl shadow-2xl select-none"
                  />
                </div>
              )}

              {getPreviewKind(activeFile.name) === "video" && (
                <video
                  key={activeFile.name}
                  src={inlineUrl(activeFile.name)}
                  controls
                  autoPlay
                  className="max-h-[78vh] max-w-full rounded-2xl shadow-2xl bg-black border border-zinc-800"
                />
              )}

              {getPreviewKind(activeFile.name) === "audio" && (
                <div className="w-full max-w-md bg-zinc-900/90 border border-zinc-800 rounded-3xl p-8 text-center space-y-5 shadow-2xl">
                  <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Music size={38} />
                  </div>
                  <p className="text-sm font-semibold text-white break-all">{activeFile.name}</p>
                  <audio
                    key={activeFile.name}
                    src={inlineUrl(activeFile.name)}
                    controls
                    autoPlay
                    className="w-full"
                  />
                </div>
              )}

              {getPreviewKind(activeFile.name) === "pdf" && (
                <iframe
                  key={activeFile.name}
                  src={inlineUrl(activeFile.name)}
                  title={activeFile.name}
                  className="w-full h-[80vh] rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl"
                />
              )}

              {getPreviewKind(activeFile.name) === "text" && (
                <div className="w-full max-h-[78vh] overflow-auto rounded-2xl border border-zinc-800 bg-[#0d0d11] p-5 shadow-2xl">
                  {textLoading ? (
                    <div className="py-16 text-center text-zinc-400">
                      <Loader2 size={24} className="mx-auto mb-2 animate-spin text-amber-400" />
                      <span className="text-xs">Читання файлу...</span>
                    </div>
                  ) : (
                    <pre className="text-xs sm:text-[13px] font-mono text-zinc-200 whitespace-pre-wrap break-words leading-relaxed">
                      {textContent}
                    </pre>
                  )}
                </div>
              )}

              {getPreviewKind(activeFile.name) === "other" && (
                <div className="w-full max-w-md bg-zinc-900/90 border border-zinc-800 rounded-3xl p-8 text-center space-y-5 shadow-2xl">
                  <div className="w-20 h-20 mx-auto rounded-3xl bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                    {renderFileTypeIcon(activeFile.name, 38)}
                  </div>
                  <div>
                    <p className="text-base font-bold text-white break-all mb-1">
                      {activeFile.name}
                    </p>
                    <p className="text-xs text-zinc-400">
                      {formatSize(activeFile.size)} · {formatDate(activeFile.uploadedAt)}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <a
                      href={inlineUrl(activeFile.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold transition-colors"
                    >
                      <ExternalLink size={14} />
                      <span>Відкрити в браузері</span>
                    </a>
                    <a
                      href={downloadUrl(activeFile.name)}
                      download={activeFile.name}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold transition-colors"
                    >
                      <Download size={14} />
                      <span>Скачати файл</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
