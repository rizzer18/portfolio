"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Phone, Send, CheckCircle2, Sparkles, MessageSquare } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    subject: "",
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || (t.contactTag === "Spojme se" ? "Něco se pokazilo." : "Щось пішло не так."));
      }

      setIsSubmitted(true);
      setFormData({ subject: "", name: "", phone: "", email: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 6000);
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : (t.contactTag === "Spojme se" ? "Neznámá chyba." : "Невідома помилка."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="relative py-28 bg-[#09090b] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute bottom-10 left-1/4 w-[450px] h-[450px] bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Heading with Envelope Icon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-14">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-[1.5px] bg-amber-400 inline-block"></span>
              <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">
                {t.contactTag}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                {t.contactTitle[0]}<span className="text-gold-gradient">{t.contactTitle[1]}</span>{t.contactTitle[2]}
              </h2>
              <div className="w-8 h-8 sm:w-10 sm:h-10 relative">
                <Image
                  src="/images/envelope.png"
                  alt="Envelope"
                  fill
                  sizes="40px"
                  className="object-contain glow-gold"
                />
              </div>
            </div>
          </div>

          <div className="text-xs text-zinc-400 max-w-xs">
            {t.contactSubtitle}
          </div>
        </div>

        {/* Contact Container Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Photo & Details */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            {/* Floating Star (Bottom Right) */}
            <motion.div
              animate={{ y: [-5, 5, -5], rotate: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-5 -right-3 w-10 h-10 z-20 pointer-events-none"
            >
              <Image
                src="/images/star1.png"
                alt="Gold Star"
                width={40}
                height={40}
                className="w-full h-full object-contain glow-gold"
              />
            </motion.div>

            {/* Photo with subtle luxury frame */}
            <div className="p-[1px] rounded-[1.8rem] bg-gradient-to-b from-amber-400/30 via-zinc-800 to-transparent shadow-xl mb-6">
              <div className="relative w-full h-56 sm:h-64 rounded-[1.7rem] overflow-hidden bg-zinc-950">
                <Image
                  src="/images/classroom.png"
                  alt="Roman working with team"
                  fill
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Direct Contact Info */}
            <div className="space-y-2.5 bg-zinc-900/60 border border-zinc-800/80 rounded-[1.6rem] p-5 shadow-card-glow backdrop-blur-xl">
              <a
                href="mailto:romanroskanuk74@gmail.com"
                className="flex items-center gap-3 text-zinc-300 hover:text-amber-400 text-xs sm:text-sm transition-colors group p-2 rounded-xl hover:bg-zinc-800/50"
              >
                <div className="p-2.5 rounded-xl bg-zinc-800/80 border border-zinc-700/60 text-amber-400 group-hover:border-amber-400/40 group-hover:shadow-gold-sm transition-all">
                  <Mail size={16} />
                </div>
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">{t.emailLabel}</div>
                  <span className="font-medium text-white group-hover:text-amber-300">romanroskanuk74@gmail.com</span>
                </div>
              </a>

              <a
                href="tel:+420605447445"
                className="flex items-center gap-3 text-zinc-300 hover:text-amber-400 text-xs sm:text-sm transition-colors group p-2 rounded-xl hover:bg-zinc-800/50"
              >
                <div className="p-2.5 rounded-xl bg-zinc-800/80 border border-zinc-700/60 text-amber-400 group-hover:border-amber-400/40 group-hover:shadow-gold-sm transition-all">
                  <Phone size={16} />
                </div>
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">{t.phoneLabel}</div>
                  <span className="font-medium text-white group-hover:text-amber-300">+420 605 447 445</span>
                </div>
              </a>
            </div>

            {/* Social Icons row */}
            <div className="flex items-center gap-3 mt-5">
              {[
                { name: "Instagram", href: "https://www.instagram.com/roshka_jr/", icon: "instagram" },
                { name: "GitHub", href: "https://github.com/rizzer18", icon: "github" },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-amber-400 hover:border-amber-400/50 hover:shadow-gold-sm transition-all transform hover:scale-110"
                >
                  {item.icon === "instagram" && (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  )}
                  {item.icon === "github" && (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 bg-[#121215]/90 border border-zinc-800/90 rounded-[2rem] p-6 sm:p-9 shadow-card-glow backdrop-blur-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Subject */}
              <div>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={t.formSubject}
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                />
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t.formName}
                    required
                    className="w-full px-4 py-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t.formPhone}
                    className="w-full px-4 py-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t.formEmail}
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                />
              </div>

              {/* Message */}
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t.formMessage}
                  rows={4}
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-amber-400 via-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-sm shadow-gold-sm hover:shadow-gold-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 transform hover:-translate-y-0.5"
                >
                  {isSubmitting ? (
                    <span>{t.formSending}</span>
                  ) : (
                    <>
                      <span>{t.formSend}</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </div>

              {/* Success Alert */}
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2.5 text-xs text-amber-300 bg-amber-400/10 border border-amber-400/30 p-3.5 rounded-xl shadow-gold-sm"
                >
                  <CheckCircle2 size={16} className="text-amber-400" />
                  <span>{t.formSuccess}</span>
                </motion.div>
              )}

              {/* Error Alert */}
              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2.5 text-xs text-red-300 bg-red-500/10 border border-red-500/30 p-3.5 rounded-xl"
                >
                  <span>⚠ {submitError}</span>
                </motion.div>
              )}

            </form>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
