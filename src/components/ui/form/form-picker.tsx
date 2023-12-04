"use client";

import { unsplash } from "@/lib/unsplash";
import * as React from "react";
import Loader from "../loader";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface FormPickerProps {
  id: string;
  error?: Record<string, string[] | undefined>;
}

export const FormPicker: React.FC<FormPickerProps> = () => {
  const [images, setImages] = React.useState<Array<Record<string, any>>>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedImageId, setSelectedImageId] = React.useState(null);
  const { pending } = useFormStatus();

  React.useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const result = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 9,
        });

        if (result && result.response) {
          const newImages = result.response as Array<Record<string, any>>;
          setImages(newImages);
        }
      } catch (error) {
        console.error(error);
        setImages([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);
  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {images.map((image) => (
          <div
            className={cn(
              "cursor-pointer relative aspect-video group hover:opacity-75 transtion bg-muted",
              pending && "opacity-50 cursor-auto",
            )}
            key={image.id}
            onClick={() => {
              if (pending) return;
              setSelectedImageId(image.id);
            }}
          >
            <Image
              alt="unsplash image"
              src={image.urls.thumb}
              className="object-cover rounded-sm"
              fill
            />
          </div>
        ))}
      </div>
    </div>
  );
};
