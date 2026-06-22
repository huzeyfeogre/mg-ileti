import type { ReactNode } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

type ImageSliderProps = {
  images: string[];
  alt: string;
  className?: string;
  imageClassName?: string;
  fallback?: ReactNode;
};

export const normalizeImageUrls = (values: Array<string | null | undefined>) => {
  const urls = values.flatMap((value) => {
    const trimmed = value?.trim();
    if (!trimmed) return [];
    return trimmed.match(/https?:\/\/(?:(?!https?:\/\/).)+/g) ?? [trimmed];
  });

  return Array.from(new Set(urls.map((url) => url.trim()).filter(Boolean)));
};

export const ImageSlider = ({ images, alt, className, imageClassName, fallback }: ImageSliderProps) => {
  const safeImages = normalizeImageUrls(images);

  if (safeImages.length === 0) {
    return fallback ? <div className={className}>{fallback}</div> : null;
  }

  return (
    <div className={cn("relative overflow-hidden rounded-2xl bg-card border border-border/50", className)}>
      <Carousel opts={{ align: "start", loop: safeImages.length > 1 }} className="w-full">
        <CarouselContent className="ml-0">
          {safeImages.map((src, index) => (
            <CarouselItem key={`${src}-${index}`} className="pl-0">
              <img
                src={src}
                alt={index === 0 ? alt : `${alt} görsel ${index + 1}`}
                className={cn("w-full object-cover", imageClassName)}
                loading={index === 0 ? "eager" : "lazy"}
                draggable={false}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {safeImages.length > 1 && (
          <>
            <CarouselPrevious className="left-3 border-border/60 bg-background/85 hover:bg-background" />
            <CarouselNext className="right-3 border-border/60 bg-background/85 hover:bg-background" />
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-background/70 px-2 py-1 backdrop-blur-sm">
              {safeImages.map((_, index) => (
                <span key={index} className="h-1.5 w-1.5 rounded-full bg-foreground/70" />
              ))}
            </div>
          </>
        )}
      </Carousel>
    </div>
  );
};