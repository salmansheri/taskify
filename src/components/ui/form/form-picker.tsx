"use client";

import { defaultImages } from "@/lib/constants/images";
import { unsplash } from "@/lib/unsplash";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { useFormStatus } from "react-dom";
import Loader from "../loader";
import { Check } from "lucide-react";
import FormErrors from "./form-errors";

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

export const FormPicker: React.FC<FormPickerProps> = ({ id, errors }) => {
  const [images, setImages] =
    React.useState<Array<Record<string, any>>>(defaultImages);
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
        setImages(defaultImages);
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
            <input
              type="radio"
              id={id}
              name={id}
              className="hidden"
              checked={selectedImageId === image.id}
              disabled={pending}
              placeholder="hello"
              value={`${image.id} | ${image.urls.thum} | ${image.urls.full} | ${image.links.html} | ${image.user.name}`}
            />

            <Image
              alt="unsplash image"
              src={image.urls.thumb}
              className="object-cover rounded-sm"
              fill
            />

            {selectedImageId === image.id && (
              <div className="absolute inset-y-0 h-full w-full bg-black/30 flex items-center justify-center">
                <Check className="text-white h-4 w-4" />
                {image.name}
              </div>
            )}
            <Link
              target="_blank"
              href={image.links.html}
              className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50"
            >
              {image.user.name}
            </Link>
          </div>
        ))}
      </div>
      <FormErrors id="image" errors={errors} />
    </div>
  );
};
