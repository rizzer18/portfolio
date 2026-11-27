import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private Storage",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function UploadFileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
