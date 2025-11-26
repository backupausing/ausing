"use client";

import QRCode from "qrcode";
import { useEffect, useState } from "react";

export default function QRReview({ slug }: { slug: string }) {
  const [url, setUrl] = useState("");
  const [img, setImg] = useState("");

  useEffect(() => {
    const link = `${process.env.NEXT_PUBLIC_SITE_URL}/reviews/${slug}`;
    setUrl(link);

    QRCode.toDataURL(
      link,
      { width: 220 },
      (_err: any, qr: string) => {
        setImg(qr);
      }
    );
  }, [slug]);

  return (
    <div className="flex flex-col items-center gap-4">
      <img src={img} alt="QR code" className="rounded-lg shadow" />
      <p className="text-sm text-ionian/70">{url}</p>
    </div>
  );
}
