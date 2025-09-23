"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

export default function ImageUpload() {
  const [image, setImage] = useState<string | null>(null);

  return (
    <CldUploadWidget
      uploadPreset="quiosco_next"
      options={{ maxFiles: 1 }}
      onSuccess={(result, { widget }) => {
        if (result.event === "success") {
          widget.close();

          // @ts-ignore
          setImage(result.info.secure_url);
        }
      }}
    >
      {({ open }) => (
        <>
          <label htmlFor="file">Sube una imagen</label>
          <div
            onClick={() => open()}
            className="border-dashed border-2 p-10 text-center cursor-pointer"
          >
            <p>Click to upload an image</p>
          </div>
          {image && (
            <div className="flex flex-col gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt="Imagen del producto"
                className="w-32 h-full object-cover"
              />
              <p className="text-green-500">Imagen subida</p>
            </div>
          )}

          <input type="hidden" name="image" value={image || ""} />
        </>
      )}
    </CldUploadWidget>
  );
}
