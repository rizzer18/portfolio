"use client";

import React, { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
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

const DATE_FORMATTER = new Intl.DateTimeFormat("uk-UA", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

function formatDate(iso: string): string {
  return DATE_FORMATTER.format(new Date(iso));
}

function renderFileTypeIcon(name: string, size = 18) {
  const kind = getPreviewKind(name);
  const ext = getExt(name);
  if (kind === "image") return <ImageIcon size={size} className="text-[#ffa1f7]" />;
  if (kind === "video") return <Film size={size} className="text-[#ffa1f7]" />;
  if (kind === "audio") return <Music size={size} className="text-[#4dff00]" />;
  if (kind === "pdf") return <FileText size={size} className="text-[#ffa1f7]" />;
  if (kind === "text") return <FileCode size={size} className="text-[#efe6d8]/80" />;
  if (ARCHIVE_EXTS.has(ext)) return <Archive size={size} className="text-[#efe6d8]/70" />;
  return <FileGeneric size={size} className="text-[#efe6d8]/50" />;
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

  const deferredSearch = useDeferredValue(search);

  const filtered = useMemo(() => {
    const q = deferredSearch.trim().toLowerCase();
    if (!q) return files;
    return files.filter((f) => f.name.toLowerCase().includes(q));
  }, [files, deferredSearch]);

  const totalFilteredSize = useMemo(
    () => filtered.reduce((acc, f) => acc + f.size, 0),
    [filtered]
  );

  const activeFile =
    previewIndex !== null && filtered[previewIndex] ? filtered[previewIndex] : null;

  useEffect(() => {
    setZoom(1);
    setRotation(0);
    setCopied(false);
    setTextContent(null);

    if (!activeFile) return;
    const kind = getPreviewKind(activeFile.name);
    if (kind === "text") {
      if (activeFile.size > 2 * 1024 * 1024) {
        setTextContent(
          "Файл занадто великий для вбудованого текстового перегляду (> 2 MB). Відкрийте його у новій вкладці."
        );
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

  useEffect(() => {
    if (previewIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreviewIndex(null);
      if (e.key === "ArrowRight") {
        setPreviewIndex((prev) => (prev === null ? null : (prev + 1) % filtered.length));
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
    <div className="min-h-screen bg-black text-[#efe6d8] overflow-x-hidden">
      {/* Top Hairline Header */}
      <header className="border-b border-[#141414] px-4 sm:px-8 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#4dff00]" />
            <h1 className="font-pixel uppercase text-[22px] sm:text-[26px] tracking-[-0.8px] text-[#efe6d8]">
              FILE SERVER
            </h1>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-[#efe6d8]/[0.72] hover:text-[#ffa1f7] transition-colors"
          >
            <ArrowLeft size={14} />
            <span>На портфоліо</span>
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
        {/* Drop Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border border-dashed rounded-2xl p-8 sm:p-10 text-center cursor-pointer transition-all duration-300 mb-6 select-none ${
            dragOver
              ? "border-[#ffa1f7] bg-[#ffa1f7]/[0.06]"
              : "border-[#1f1f1f] hover:border-[#ffa1f7]/60 bg-[#060606] hover:bg-[#090909]"
          } ${uploading ? "pointer-events-none opacity-75" : ""}`}
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
              <Loader2 size={28} className="mx-auto text-[#ffa1f7] animate-spin" />
              <p className="text-[#ffa1f7] font-medium text-[13px]">{uploadProgress}</p>
              <div className="w-full max-w-xs mx-auto bg-[#161616] rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-1.5 bg-[#ffa1f7] rounded-full transition-all duration-200"
                  style={{ width: `${uploadPercent}%` }}
                />
              </div>
              <p className="text-[#efe6d8]/45 text-xs font-mono">{uploadPercent}%</p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="w-11 h-11 mx-auto rounded-full border border-[#1f1f1f] bg-black flex items-center justify-center text-[#ffa1f7] mb-3">
                <UploadCloud size={20} />
              </div>
              <p className="text-[#efe6d8] font-medium text-[14px]">
                Перетягни файли сюди або{" "}
                <span className="text-[#ffa1f7] underline underline-offset-4">
                  натисни для вибору
                </span>
              </p>
              <p className="text-[#efe6d8]/[0.45] text-[12.5px]">
                Будь-які файли · Клік по файлу відкриває перегляд без скачування
              </p>
            </div>
          )}
        </div>

        {/* Search + View Toggle + Stats */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5 items-stretch sm:items-center justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#efe6d8]/40 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Пошук файлів..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#070707] border border-[#1a1a1a] rounded-full pl-9 pr-4 py-2 text-[13px] text-[#efe6d8] placeholder:text-[#efe6d8]/35 focus:outline-none focus:border-[#ffa1f7] transition-colors"
            />
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3">
            <span className="font-mono text-[#efe6d8]/[0.48] text-[12px] whitespace-nowrap">
              {filtered.length} файл{filtered.length === 1 ? "" : "ів"} ·{" "}
              {formatSize(totalFilteredSize)}
            </span>

            <div className="flex items-center border border-[#1a1a1a] rounded-full p-0.5 bg-[#070707]">
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                  viewMode === "list"
                    ? "bg-[#ffa1f7] text-black"
                    : "text-[#efe6d8]/50 hover:text-[#efe6d8]"
                }`}
                title="Список"
              >
                <List size={14} />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-[#ffa1f7] text-black"
                    : "text-[#efe6d8]/50 hover:text-[#efe6d8]"
                }`}
                title="Плитка"
              >
                <LayoutGrid size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* File Container */}
        {loading ? (
          <div className="rounded-2xl border border-[#161616] py-20 text-center text-[#efe6d8]/45">
            <Loader2 size={24} className="mx-auto mb-3 animate-spin text-[#ffa1f7]" />
            <p className="text-[13px]">Завантаження списку файлів...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-[#161616] py-20 text-center text-[#efe6d8]/45">
            <FolderOpen size={32} className="mx-auto mb-3 text-[#efe6d8]/30" />
            <p className="font-medium text-[14px] text-[#efe6d8]">
              {search ? "Нічого не знайдено" : "Файлів поки немає"}
            </p>
            {!search && (
              <p className="text-[12px] mt-1 text-[#efe6d8]/40">Завантаж перший файл вище</p>
            )}
          </div>
        ) : viewMode === "list" ? (
          <div className="rounded-2xl border border-[#161616] overflow-hidden bg-black">
            <ul className="divide-y divide-[#141414]">
              <li className="grid grid-cols-[2.25rem_1fr_5.5rem_auto] sm:grid-cols-[2.25rem_1fr_6rem_9.5rem_8.5rem] gap-3 px-4 sm:px-5 py-3 font-mono text-[11px] text-[#efe6d8]/40 uppercase bg-[#060606]">
                <span />
                <span>Назва</span>
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
                    className="grid grid-cols-[2.25rem_1fr_5.5rem_auto] sm:grid-cols-[2.25rem_1fr_6rem_9.5rem_8.5rem] gap-3 px-4 sm:px-5 py-3 items-center hover:bg-[#080808] transition-colors cursor-pointer group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#0c0c0c] border border-[#1c1c1c] flex items-center justify-center overflow-hidden shrink-0">
                      {isImg ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={inlineUrl(file.name)}
                          alt={file.name}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        renderFileTypeIcon(file.name, 16)
                      )}
                    </div>

                    <div className="min-w-0">
                      <span
                        className="block text-[#efe6d8] group-hover:text-[#ffa1f7] text-[13px] font-medium truncate transition-colors"
                        title={file.name}
                      >
                        {file.name}
                      </span>
                      <span className="font-mono text-[11px] text-[#efe6d8]/40 sm:hidden">
                        {formatDate(file.uploadedAt)}
                      </span>
                    </div>

                    <span className="text-[#efe6d8]/55 text-[12px] text-right font-mono">
                      {formatSize(file.size)}
                    </span>

                    <span className="text-[#efe6d8]/40 text-[12px] text-right font-mono hidden sm:block">
                      {formatDate(file.uploadedAt)}
                    </span>

                    <div
                      className="flex items-center gap-1 justify-end"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        onClick={() => setPreviewIndex(idx)}
                        className="p-1.5 rounded-full text-[#efe6d8]/50 hover:text-[#ffa1f7] transition-colors cursor-pointer"
                        title="Переглянути"
                      >
                        <Eye size={14} />
                      </button>

                      <a
                        href={inlineUrl(file.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-full text-[#efe6d8]/50 hover:text-[#ffa1f7] transition-colors"
                        title="У новій вкладці"
                      >
                        <ExternalLink size={14} />
                      </a>

                      <a
                        href={downloadUrl(file.name)}
                        download={file.name}
                        className="p-1.5 rounded-full text-[#efe6d8]/50 hover:text-[#4dff00] transition-colors"
                        title="Скачати"
                      >
                        <Download size={14} />
                      </a>

                      <button
                        type="button"
                        onClick={() => handleDelete(file.name)}
                        disabled={deletingFile === file.name}
                        className="p-1.5 rounded-full text-[#efe6d8]/50 hover:text-red-400 transition-colors disabled:opacity-40 cursor-pointer"
                        title="Видалити"
                      >
                        {deletingFile === file.name ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <Trash2 size={14} />
                        )}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filtered.map((file, idx) => {
              const isImg = getPreviewKind(file.name) === "image";
              return (
                <div
                  key={file.name}
                  onClick={() => setPreviewIndex(idx)}
                  className="group rounded-xl border border-[#181818] bg-[#060606] hover:border-[#ffa1f7]/50 overflow-hidden flex flex-col cursor-pointer transition-all"
                >
                  <div className="aspect-[4/3] bg-black flex items-center justify-center overflow-hidden relative border-b border-[#141414]">
                    {isImg ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={inlineUrl(file.name)}
                        alt={file.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      renderFileTypeIcon(file.name, 32)
                    )}
                    <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-3 py-1 rounded-full bg-[#ffa1f7] text-black text-xs font-semibold inline-flex items-center gap-1">
                        <Eye size={12} /> Відкрити
                      </span>
                    </div>
                  </div>
                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <p
                      className="text-[12.5px] font-medium text-[#efe6d8] truncate mb-1"
                      title={file.name}
                    >
                      {file.name}
                    </p>
                    <div
                      className="flex items-center justify-between pt-2 border-t border-[#161616]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="text-[11px] text-[#efe6d8]/45 font-mono">
                        {formatSize(file.size)}
                      </span>
                      <div className="flex items-center gap-1">
                        <a
                          href={inlineUrl(file.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 text-[#efe6d8]/50 hover:text-[#ffa1f7]"
                          title="Відкрити в новій вкладці"
                        >
                          <ExternalLink size={13} />
                        </a>
                        <a
                          href={downloadUrl(file.name)}
                          download={file.name}
                          className="p-1 text-[#efe6d8]/50 hover:text-[#4dff00]"
                          title="Скачати"
                        >
                          <Download size={13} />
                        </a>
                        <button
                          type="button"
                          onClick={() => handleDelete(file.name)}
                          className="p-1 text-[#efe6d8]/50 hover:text-red-400 cursor-pointer"
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
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col"
          onClick={() => setPreviewIndex(null)}
        >
          <div
            className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-[#161616] bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 min-w-0">
              {renderFileTypeIcon(activeFile.name, 18)}
              <div className="min-w-0">
                <p className="text-[13.5px] font-semibold text-[#efe6d8] truncate max-w-[200px] sm:max-w-md">
                  {activeFile.name}
                </p>
                <p className="font-mono text-[11px] text-[#efe6d8]/45">
                  {formatSize(activeFile.size)} · {formatDate(activeFile.uploadedAt)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {getPreviewKind(activeFile.name) === "image" && (
                <div className="hidden sm:flex items-center gap-1 mr-1 border border-[#1f1f1f] rounded-full px-2.5 py-1 bg-[#070707]">
                  <button
                    type="button"
                    onClick={() => setZoom((z) => Math.max(0.25, +(z - 0.25).toFixed(2)))}
                    className="p-1 text-[#efe6d8]/70 hover:text-[#ffa1f7] cursor-pointer"
                    title="Зменшити"
                  >
                    <ZoomOut size={14} />
                  </button>
                  <span className="text-xs font-mono text-[#efe6d8]/50 px-1.5">
                    {Math.round(zoom * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={() => setZoom((z) => Math.min(4, +(z + 0.25).toFixed(2)))}
                    className="p-1 text-[#efe6d8]/70 hover:text-[#ffa1f7] cursor-pointer"
                    title="Збільшити"
                  >
                    <ZoomIn size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setRotation((r) => (r + 90) % 360)}
                    className="p-1 text-[#efe6d8]/70 hover:text-[#ffa1f7] cursor-pointer ml-1"
                    title="Повернути"
                  >
                    <RotateCw size={14} />
                  </button>
                </div>
              )}

              {getPreviewKind(activeFile.name) === "text" && textContent && (
                <button
                  type="button"
                  onClick={copyText}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#1f1f1f] text-xs text-[#efe6d8]/80 hover:border-[#ffa1f7]/50 cursor-pointer"
                >
                  {copied ? <Check size={13} className="text-[#4dff00]" /> : <Copy size={13} />}
                  <span>{copied ? "Скопійовано" : "Копіювати"}</span>
                </button>
              )}

              <a
                href={inlineUrl(activeFile.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#1f1f1f] text-xs text-[#efe6d8]/80 hover:text-[#ffa1f7] hover:border-[#ffa1f7]/40 transition-colors"
              >
                <ExternalLink size={13} />
                <span className="hidden sm:inline">У новій вкладці</span>
              </a>

              <a
                href={downloadUrl(activeFile.name)}
                download={activeFile.name}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#ffa1f7] hover:opacity-90 text-black text-xs font-semibold transition-all"
              >
                <Download size={13} />
                <span className="hidden sm:inline">Скачати</span>
              </a>

              <button
                type="button"
                onClick={() => setPreviewIndex(null)}
                className="p-2 rounded-full border border-[#1f1f1f] text-[#efe6d8]/60 hover:text-[#ffa1f7] cursor-pointer"
                title="Закрити (Esc)"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          <div className="flex-1 relative flex items-center justify-center p-4 sm:p-8 overflow-auto">
            {filtered.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewIndex((prev) =>
                      prev === null ? 0 : (prev - 1 + filtered.length) % filtered.length
                    );
                  }}
                  className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black border border-[#242424] text-[#efe6d8] hover:border-[#ffa1f7] hover:text-[#ffa1f7] flex items-center justify-center cursor-pointer transition-all"
                  title="Попередній файл (←)"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewIndex((prev) =>
                      prev === null ? 0 : (prev + 1) % filtered.length
                    );
                  }}
                  className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black border border-[#242424] text-[#efe6d8] hover:border-[#ffa1f7] hover:text-[#ffa1f7] flex items-center justify-center cursor-pointer transition-all"
                  title="Наступний файл (→)"
                >
                  <ChevronRight size={18} />
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
                    className="max-h-[78vh] max-w-full object-contain rounded-xl select-none"
                  />
                </div>
              )}

              {getPreviewKind(activeFile.name) === "video" && (
                <video
                  key={activeFile.name}
                  src={inlineUrl(activeFile.name)}
                  controls
                  autoPlay
                  className="max-h-[78vh] max-w-full rounded-xl bg-black border border-[#1f1f1f]"
                />
              )}

              {getPreviewKind(activeFile.name) === "audio" && (
                <div className="w-full max-w-md bg-black border border-[#1f1f1f] rounded-2xl p-8 text-center space-y-5">
                  <div className="w-16 h-16 mx-auto rounded-full border border-[#4dff00]/30 flex items-center justify-center text-[#4dff00]">
                    <Music size={30} />
                  </div>
                  <p className="text-[13.5px] font-semibold text-[#efe6d8] break-all">
                    {activeFile.name}
                  </p>
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
                  className="w-full h-[80vh] rounded-xl border border-[#1f1f1f] bg-white"
                />
              )}

              {getPreviewKind(activeFile.name) === "text" && (
                <div className="w-full max-h-[78vh] overflow-auto rounded-xl border border-[#1f1f1f] bg-[#060606] p-5">
                  {textLoading ? (
                    <div className="py-16 text-center text-[#efe6d8]/50">
                      <Loader2 size={22} className="mx-auto mb-2 animate-spin text-[#ffa1f7]" />
                    </div>
                  ) : (
                    <pre className="text-xs sm:text-[13px] font-mono text-[#efe6d8]/85 whitespace-pre-wrap break-words leading-relaxed">
                      {textContent}
                    </pre>
                  )}
                </div>
              )}

              {getPreviewKind(activeFile.name) === "other" && (
                <div className="w-full max-w-md bg-black border border-[#1f1f1f] rounded-2xl p-8 text-center space-y-5">
                  <div className="w-16 h-16 mx-auto rounded-full border border-[#242424] flex items-center justify-center">
                    {renderFileTypeIcon(activeFile.name, 32)}
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-[#efe6d8] break-all mb-1">
                      {activeFile.name}
                    </p>
                    <p className="font-mono text-xs text-[#efe6d8]/45">
                      {formatSize(activeFile.size)} · {formatDate(activeFile.uploadedAt)}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <a
                      href={inlineUrl(activeFile.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#242424] hover:border-[#ffa1f7]/50 text-[#efe6d8] text-xs font-medium transition-colors"
                    >
                      <ExternalLink size={13} />
                      <span>Відкрити в браузері</span>
                    </a>
                    <a
                      href={downloadUrl(activeFile.name)}
                      download={activeFile.name}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ffa1f7] text-black text-xs font-semibold transition-all"
                    >
                      <Download size={13} />
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
