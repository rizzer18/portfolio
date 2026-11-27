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
  Lock,
  LogOut,
  EyeOff,
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
  if (kind === "image") return <ImageIcon size={size} className="text-[#f5f4f1]" />;
  if (kind === "video") return <Film size={size} className="text-violet-300" />;
  if (kind === "audio") return <Music size={size} className="text-[#3fbf7f]" />;
  if (kind === "pdf") return <FileText size={size} className="text-[#e8674a]" />;
  if (kind === "text") return <FileCode size={size} className="text-sky-300" />;
  if (ARCHIVE_EXTS.has(ext)) return <Archive size={size} className="text-amber-300" />;
  return <FileGeneric size={size} className="text-[#9b968f]" />;
}

export default function FileServerPage() {
  const [authChecking, setAuthChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authSubmitting, setAuthSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

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
    setLoading(true);
    try {
      const res = await fetch("/api/files");
      if (res.status === 401) {
        setAuthenticated(false);
        setFiles([]);
        return;
      }
      const data = await res.json();
      setAuthenticated(true);
      setFiles(data.files ?? []);
    } catch {
      setFiles([]);
    } finally {
      setLoading(false);
      setAuthChecking(false);
    }
  }, []);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordInput.trim()) return;
    setAuthSubmitting(true);
    setAuthError(null);
    try {
      const res = await fetch("/api/files/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordInput }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setAuthError(data.error || "Невірний пароль.");
        return;
      }
      setPasswordInput("");
      setAuthenticated(true);
      await fetchFiles();
    } catch {
      setAuthError("Не вдалося підключитися до сервера.");
    } finally {
      setAuthSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/files/auth", { method: "DELETE" }).catch(() => {});
    setPreviewIndex(null);
    setFiles([]);
    setAuthenticated(false);
  };

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

  if (authChecking) {
    return (
      <div className="min-h-screen bg-[#070709] text-[#ededf0] flex items-center justify-center px-4">
        <Loader2 size={24} className="animate-spin text-[#8e8e9a]" />
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#070709] text-[#ededf0] flex items-center justify-center px-4">
        <div className="w-full max-w-sm rounded-2xl border border-[#1d1d26] bg-[#0b0b0f] p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="space-y-2 text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#121219] border border-[#242430] flex items-center justify-center text-[#ededf0]">
              <Lock size={19} />
            </div>
            <h1 className="font-serif text-2xl text-[#ededf0]">Приватне сховище</h1>
            <p className="text-[13px] text-[#7c7c88]">
              Введіть пароль для доступу до файлів
            </p>
          </div>

          <form onSubmit={handleUnlock} className="space-y-3.5">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Пароль доступу"
                autoFocus
                required
                className="w-full bg-[#07070a] border border-[#1f1f29] rounded-xl pl-4 pr-10 py-2.5 text-[16px] sm:text-[13.5px] text-[#ededf0] placeholder:text-[#6e6e7a] focus:outline-none focus:border-[#3a3a4b] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7c7c88] hover:text-[#ededf0] cursor-pointer"
                aria-label="Показати або приховати пароль"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            {authError && (
              <p className="text-[12.5px] text-[#e8674a] bg-[#1c0d0a] border border-[#4d2017] rounded-xl px-3.5 py-2 text-center">
                {authError}
              </p>
            )}

            <button
              type="submit"
              disabled={authSubmitting}
              className="w-full h-10 rounded-full bg-[#ededf0] hover:bg-white text-[#070709] text-[13.5px] font-semibold inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 transition-colors"
            >
              {authSubmitting ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <span>Розблокувати</span>
              )}
            </button>
          </form>

          <div className="text-center pt-1">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-[12.5px] text-[#7c7c88] hover:text-[#ededf0] transition-colors"
            >
              <ArrowLeft size={13} />
              <span>На портфоліо</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070709] text-[#ededf0] overflow-x-hidden">
      {/* Sticky Solid Dark Header */}
      <header className="sticky top-0 z-30 h-14 bg-[#070709]/95 border-b border-[#181820] px-3.5 sm:px-8">
        <div className="max-w-5xl mx-auto h-full flex items-center justify-between gap-2.5 sm:gap-4">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-[#3fbf7f] shrink-0" />
            <h1 className="font-serif text-[18px] sm:text-[22px] tracking-[-0.02em] text-[#ededf0] truncate">
              File Server <span className="hidden sm:inline text-[#7c7c88]">· Private</span>
            </h1>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleLogout}
              className="h-8 sm:h-9 px-3 sm:px-3.5 rounded-full bg-[#111117] hover:bg-[#191922] border border-[#23232f] inline-flex items-center gap-1.5 text-[12px] sm:text-[13px] font-medium text-[#8e8e9a] hover:text-[#ededf0] whitespace-nowrap cursor-pointer transition-colors"
              title="Заблокувати сховище"
            >
              <LogOut size={13} />
              <span className="hidden sm:inline">Заблокувати</span>
            </button>

            <Link
              href="/"
              className="h-8 sm:h-9 px-3 sm:px-4 rounded-full bg-[#111117] hover:bg-[#191922] border border-[#23232f] inline-flex items-center gap-1.5 sm:gap-2 text-[12px] sm:text-[13px] font-medium text-[#ededf0] whitespace-nowrap transition-colors"
            >
              <ArrowLeft size={14} />
              <span>На портфоліо</span>
            </Link>
          </div>
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
          className={`relative border border-dashed rounded-2xl p-8 sm:p-10 text-center cursor-pointer transition-colors mb-6 select-none ${
            dragOver
              ? "border-[#3fbf7f] bg-[#0b1a12]"
              : "border-[#22222d] hover:border-[#343445] bg-[#0b0b0f] hover:bg-[#0f0f15]"
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
              <Loader2 size={28} className="mx-auto text-[#f5f4f1] animate-spin" />
              <p className="text-[#f5f4f1] font-medium text-[13.5px]">{uploadProgress}</p>
              <div className="w-full max-w-xs mx-auto bg-white/[0.1] rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-1.5 bg-[#3fbf7f] rounded-full transition-all duration-200"
                  style={{ width: `${uploadPercent}%` }}
                />
              </div>
              <p className="text-[#9b968f] text-xs font-mono">{uploadPercent}%</p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="w-11 h-11 mx-auto rounded-full border border-white/[0.16] bg-white/[0.06] flex items-center justify-center text-[#f5f4f1] mb-3">
                <UploadCloud size={20} />
              </div>
              <p className="font-serif text-xl sm:text-2xl text-[#f5f4f1]">
                Перетягни файли сюди або{" "}
                <span className="underline underline-offset-4 text-[#f5f4f1]">
                  натисни для вибору
                </span>
              </p>
              <p className="text-[#9b968f] text-[13px]">
                Будь-які файли · Клік по файлу відкриває перегляд прямо в браузері
              </p>
            </div>
          )}
        </div>

        {/* Search + View Toggle + Stats */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5 items-stretch sm:items-center justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9b968f] pointer-events-none"
            />
            <input
              type="text"
              placeholder="Пошук файлів..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0b0b0f] border border-[#1e1e28] rounded-full pl-9 pr-4 py-2 text-[16px] sm:text-[13px] text-[#ededf0] placeholder:text-[#7c7c88] focus:outline-none focus:border-[#363648] transition-colors"
            />
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3">
            <span className="font-mono text-[#7c7c88] text-[12px] whitespace-nowrap">
              {filtered.length} файл{filtered.length === 1 ? "" : "ів"} ·{" "}
              {formatSize(totalFilteredSize)}
            </span>

            <div className="flex items-center border border-[#1e1e28] rounded-full p-0.5 bg-[#0b0b0f]">
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                  viewMode === "list"
                    ? "bg-[#1e1e28] text-[#ededf0]"
                    : "text-[#7c7c88] hover:text-[#ededf0]"
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
                    ? "bg-[#1e1e28] text-[#ededf0]"
                    : "text-[#7c7c88] hover:text-[#ededf0]"
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
          <div className="rounded-2xl border border-[#1b1b24] bg-[#0b0b0f] py-20 text-center text-[#7c7c88]">
            <Loader2 size={24} className="mx-auto mb-3 animate-spin text-[#ededf0]" />
            <p className="text-[13px]">Завантаження списку файлів...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-[#1b1b24] bg-[#0b0b0f] py-20 text-center text-[#7c7c88]">
            <FolderOpen size={32} className="mx-auto mb-3 text-[#7c7c88]/60" />
            <p className="font-serif text-xl text-[#ededf0]">
              {search ? "Нічого не знайдено" : "Файлів поки немає"}
            </p>
            {!search && (
              <p className="text-[12.5px] mt-1 text-[#7c7c88]">Завантаж перший файл вище</p>
            )}
          </div>
        ) : viewMode === "list" ? (
          <div className="rounded-2xl border border-[#1b1b24] overflow-hidden bg-[#0b0b0f]">
            <ul className="divide-y divide-white/[0.08]">
              <li className="grid grid-cols-[2rem_minmax(0,1fr)_auto] sm:grid-cols-[2.25rem_minmax(0,1fr)_6rem_9.5rem_8.5rem] gap-2.5 sm:gap-3 px-3.5 sm:px-5 py-3 font-mono text-[11px] text-[#9b968f] uppercase bg-black/25">
                <span />
                <span>Назва</span>
                <span className="text-right hidden sm:block">Розмір</span>
                <span className="text-right hidden sm:block">Дата</span>
                <span className="text-right">Дії</span>
              </li>

              {filtered.map((file, idx) => {
                const isImg = getPreviewKind(file.name) === "image";
                return (
                  <li
                    key={file.name}
                    onClick={() => setPreviewIndex(idx)}
                    className="grid grid-cols-[2rem_minmax(0,1fr)_auto] sm:grid-cols-[2.25rem_minmax(0,1fr)_6rem_9.5rem_8.5rem] gap-2.5 sm:gap-3 px-3.5 sm:px-5 py-3 items-center hover:bg-white/[0.05] transition-colors cursor-pointer group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.1] flex items-center justify-center overflow-hidden shrink-0">
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
                        className="block text-[#f5f4f1] group-hover:opacity-80 text-[13px] sm:text-[13.5px] font-medium truncate transition-opacity"
                        title={file.name}
                      >
                        {file.name}
                      </span>
                      <span className="font-mono text-[10.5px] text-[#9b968f] sm:hidden block truncate">
                        {formatSize(file.size)} · {formatDate(file.uploadedAt)}
                      </span>
                    </div>

                    <span className="text-[#f5f4f1]/70 text-[12px] text-right font-mono hidden sm:block">
                      {formatSize(file.size)}
                    </span>

                    <span className="text-[#9b968f] text-[12px] text-right font-mono hidden sm:block">
                      {formatDate(file.uploadedAt)}
                    </span>

                    <div
                      className="flex items-center gap-0.5 sm:gap-1 justify-end shrink-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        onClick={() => setPreviewIndex(idx)}
                        className="p-1.5 rounded-full text-[#9b968f] hover:text-[#f5f4f1] transition-colors cursor-pointer"
                        title="Переглянути"
                      >
                        <Eye size={14} />
                      </button>

                      <a
                        href={inlineUrl(file.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-full text-[#9b968f] hover:text-[#f5f4f1] transition-colors"
                        title="У новій вкладці"
                      >
                        <ExternalLink size={14} />
                      </a>

                      <a
                        href={downloadUrl(file.name)}
                        download={file.name}
                        className="p-1.5 rounded-full text-[#9b968f] hover:text-[#3fbf7f] transition-colors"
                        title="Скачати"
                      >
                        <Download size={14} />
                      </a>

                      <button
                        type="button"
                        onClick={() => handleDelete(file.name)}
                        disabled={deletingFile === file.name}
                        className="p-1.5 rounded-full text-[#9b968f] hover:text-[#e8674a] transition-colors disabled:opacity-40 cursor-pointer"
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {filtered.map((file, idx) => {
              const isImg = getPreviewKind(file.name) === "image";
              return (
                <div
                  key={file.name}
                  onClick={() => setPreviewIndex(idx)}
                  className="min-w-0 group rounded-xl border border-[#1b1b24] bg-[#0b0b0f] hover:border-[#2e2e3e] overflow-hidden flex flex-col cursor-pointer transition-colors"
                >
                  <div className="aspect-[4/3] bg-black/40 flex items-center justify-center overflow-hidden relative border-b border-white/[0.08]">
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
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-3.5 py-1 rounded-full bg-[#f5f4f1] text-[#100e0b] text-xs font-medium inline-flex items-center gap-1">
                        <Eye size={12} /> Відкрити
                      </span>
                    </div>
                  </div>
                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <p
                      className="text-[12.5px] font-medium text-[#f5f4f1] truncate mb-1"
                      title={file.name}
                    >
                      {file.name}
                    </p>
                    <div
                      className="flex items-center justify-between pt-2 border-t border-white/[0.08]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="text-[11px] text-[#9b968f] font-mono">
                        {formatSize(file.size)}
                      </span>
                      <div className="flex items-center gap-1">
                        <a
                          href={inlineUrl(file.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 text-[#9b968f] hover:text-[#f5f4f1]"
                          title="Відкрити в новій вкладці"
                        >
                          <ExternalLink size={13} />
                        </a>
                        <a
                          href={downloadUrl(file.name)}
                          download={file.name}
                          className="p-1 text-[#9b968f] hover:text-[#3fbf7f]"
                          title="Скачати"
                        >
                          <Download size={13} />
                        </a>
                        <button
                          type="button"
                          onClick={() => handleDelete(file.name)}
                          className="p-1 text-[#9b968f] hover:text-[#e8674a] cursor-pointer"
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
          className="fixed inset-0 z-50 h-[100dvh] bg-black/90 flex flex-col"
          onClick={() => setPreviewIndex(null)}
        >
          <div
            className="flex items-center justify-between gap-2 sm:gap-3 px-3.5 sm:px-6 py-3 sm:py-3.5 border-b border-[#1c1c24] bg-[#0a0a0e]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="shrink-0">{renderFileTypeIcon(activeFile.name, 18)}</span>
              <div className="min-w-0">
                <p className="font-serif text-[15px] sm:text-[17px] text-[#f5f4f1] truncate">
                  {activeFile.name}
                </p>
                <p className="font-mono text-[10.5px] sm:text-[11px] text-[#9b968f] truncate">
                  {formatSize(activeFile.size)} · {formatDate(activeFile.uploadedAt)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {getPreviewKind(activeFile.name) === "image" && (
                <div className="hidden sm:flex items-center gap-1 mr-1 border border-white/[0.14] rounded-full px-2.5 py-1 bg-white/[0.04]">
                  <button
                    type="button"
                    onClick={() => setZoom((z) => Math.max(0.25, +(z - 0.25).toFixed(2)))}
                    className="p-1 text-[#f5f4f1]/75 hover:text-white cursor-pointer"
                    title="Зменшити"
                  >
                    <ZoomOut size={14} />
                  </button>
                  <span className="text-xs font-mono text-[#9b968f] px-1.5">
                    {Math.round(zoom * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={() => setZoom((z) => Math.min(4, +(z + 0.25).toFixed(2)))}
                    className="p-1 text-[#f5f4f1]/75 hover:text-white cursor-pointer"
                    title="Збільшити"
                  >
                    <ZoomIn size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setRotation((r) => (r + 90) % 360)}
                    className="p-1 text-[#f5f4f1]/75 hover:text-white cursor-pointer ml-1"
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
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.16] text-xs text-[#f5f4f1]/85 hover:bg-white/[0.08] cursor-pointer"
                >
                  {copied ? <Check size={13} className="text-[#3fbf7f]" /> : <Copy size={13} />}
                  <span>{copied ? "Скопійовано" : "Копіювати"}</span>
                </button>
              )}

              <a
                href={inlineUrl(activeFile.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/[0.16] text-xs text-[#f5f4f1]/85 hover:bg-white/[0.08] transition-colors"
              >
                <ExternalLink size={13} />
                <span className="hidden sm:inline">У новій вкладці</span>
              </a>

              <a
                href={downloadUrl(activeFile.name)}
                download={activeFile.name}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#f5f4f1] hover:bg-white text-[#100e0b] text-xs font-semibold transition-colors"
              >
                <Download size={13} />
                <span className="hidden sm:inline">Скачати</span>
              </a>

              <button
                type="button"
                onClick={() => setPreviewIndex(null)}
                className="w-8 h-8 rounded-full border border-white/[0.16] flex items-center justify-center text-[#f5f4f1]/70 hover:text-[#f5f4f1] cursor-pointer"
                title="Закрити (Esc)"
              >
                <X size={15} />
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
                  className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#161310]/90 border border-white/[0.18] text-[#f5f4f1] hover:bg-white/[0.15] flex items-center justify-center cursor-pointer transition-all"
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
                  className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#161310]/90 border border-white/[0.18] text-[#f5f4f1] hover:bg-white/[0.15] flex items-center justify-center cursor-pointer transition-all"
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
                  className="max-h-[78vh] max-w-full rounded-xl bg-black border border-white/[0.16]"
                />
              )}

              {getPreviewKind(activeFile.name) === "audio" && (
                <div className="w-full max-w-md bg-[#161310] border border-white/[0.16] rounded-2xl p-8 text-center space-y-5">
                  <div className="w-16 h-16 mx-auto rounded-full border border-[#3fbf7f]/35 flex items-center justify-center text-[#3fbf7f]">
                    <Music size={30} />
                  </div>
                  <p className="font-serif text-lg text-[#f5f4f1] break-all">{activeFile.name}</p>
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
                  className="w-full h-[80vh] rounded-xl border border-white/[0.16] bg-white"
                />
              )}

              {getPreviewKind(activeFile.name) === "text" && (
                <div className="w-full max-h-[78vh] overflow-auto rounded-xl border border-white/[0.16] bg-[#12100d] p-5">
                  {textLoading ? (
                    <div className="py-16 text-center text-[#9b968f]">
                      <Loader2 size={22} className="mx-auto mb-2 animate-spin text-[#f5f4f1]" />
                    </div>
                  ) : (
                    <pre className="text-xs sm:text-[13px] font-mono text-[#f5f4f1]/85 whitespace-pre-wrap break-words leading-relaxed">
                      {textContent}
                    </pre>
                  )}
                </div>
              )}

              {getPreviewKind(activeFile.name) === "other" && (
                <div className="w-full max-w-md bg-[#161310] border border-white/[0.16] rounded-2xl p-8 text-center space-y-5">
                  <div className="w-16 h-16 mx-auto rounded-full border border-white/[0.16] flex items-center justify-center">
                    {renderFileTypeIcon(activeFile.name, 32)}
                  </div>
                  <div>
                    <p className="font-serif text-xl text-[#f5f4f1] break-all mb-1">
                      {activeFile.name}
                    </p>
                    <p className="font-mono text-xs text-[#9b968f]">
                      {formatSize(activeFile.size)} · {formatDate(activeFile.uploadedAt)}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <a
                      href={inlineUrl(activeFile.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.18] hover:bg-white/[0.08] text-[#f5f4f1] text-xs font-medium transition-colors"
                    >
                      <ExternalLink size={13} />
                      <span>Відкрити в браузері</span>
                    </a>
                    <a
                      href={downloadUrl(activeFile.name)}
                      download={activeFile.name}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f5f4f1] text-[#100e0b] text-xs font-semibold transition-colors"
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
