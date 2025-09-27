"use client";

import { getImagePath } from "@/utils";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";

export default function ImageUpload({
  currentImage
}: {
  currentImage?: string;
}) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  return (
    <CldUploadWidget
      uploadPreset="quiosco_next"
      options={{ maxFiles: 1 }}
      onSuccess={(result, { widget }) => {
        if (result.event === "success") {
          widget.close();

          // @ts-ignore
          setImageUrl(result.info.secure_url);
        }
      }}
    >
      {({ open }) => (
        <>
          <label htmlFor="file">Sube una imagen</label>
          <div
            onClick={() => open()}
            className="border-dashed border-2 p-5 text-center cursor-pointer hover:border-green-500 flex flex-col justify-center items-center gap-2"
          >
            <p>Click para subir una imagen</p>
            {imageUrl && (
              <div className="flex flex-col gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt="Imagen del producto"
                  className="w-32 h-full object-cover border-2 border-green-500"
                />
              </div>
            )}
          </div>

          {currentImage && !imageUrl ? (
            <div className="flex flex-col gap-2">
              <p>Imagen actual:</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <Image
                src={getImagePath(currentImage)}
                alt="Imagen del producto"
                width={100}
                height={100}
                className="w-auto h-auto object-cover"
              />
            </div>
          ) : null}

          <input
            type="hidden"
            name="image"
            defaultValue={imageUrl ? imageUrl : currentImage}
          />
        </>
      )}
    </CldUploadWidget>
  );
}
