"use client";

import QRCode from "qrcode";
import { useEffect, useState } from "react";

export default function QRReview({ slug }: { slug: string }) {
  const [url, setUrl] = useState("");
  const [img, setImg] = useState("");

  useEffect(() => {
    const link = `${typeof window !== "undefined" ? window.location.origin : ""}/reviews/${slug}`;
    setUrl(link);

    QRCode.toDataURL(link, { width: 220 }, (err, qr) => {
      if (!err) setImg(qr);
    });
  }, [slug]);

  return (
    <div className="text-center space-y-2 py-4">
      <h3 className="font-serif text-ionian text-sm">QR per Recensioni</h3>
      {img && <img src={img} alt="QR Aus" className="mx-auto w-40 h-40" />}
      <p className="text-[10px] text-ionian/60">{url}</p>
    </div>
  );
}
