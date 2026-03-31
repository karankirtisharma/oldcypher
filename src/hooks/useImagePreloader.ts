import { useState, useEffect } from 'react';

export function useImagePreloader(frameCount: number, path: string) {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let loadedCount = 0;
    const imgArray: HTMLImageElement[] = [];

    // The frames are named ezgif-frame-001.webp to ezgif-frame-288.webp
    for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        const index = i.toString().padStart(3, '0');
        const src = `${path}ezgif-frame-${index}.webp`;
        if (i === 1) console.log(`Preloader: Fetching ${src}`);
        img.src = src;
        
        img.onload = () => {
            loadedCount++;
            if (loadedCount === Math.min(30, frameCount)) setLoaded(true); // Unlock UI early
        };
        img.onerror = () => {
            console.error(`Preloader: Failed to load image at ${src}`);
            loadedCount++; // Still increment to unblock UI if some frames are missing
            if (loadedCount === Math.min(30, frameCount)) setLoaded(true);
        };
        imgArray.push(img);
    }
    setImages(imgArray);
  }, [frameCount, path]);

  return { images, loaded };
}
