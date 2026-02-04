'use client';

import { useRef, useEffect } from 'react';

export default function UmbrellaAnimation() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    video.playbackRate = 0.6; // Slow down
    video.play().catch(() => {});

    const processFrame = () => {
      // Stop at 6 seconds
      if (video.currentTime >= 6) {
        video.pause();
        return;
      }

      if (video.paused || video.ended) {
        requestAnimationFrame(processFrame);
        return;
      }

      const videoWidth = video.videoWidth || 600;
      const videoHeight = video.videoHeight || 600;

      // Crop right half - only show left 85% to remove watermark
      const cropWidth = videoWidth * 0.85;

      canvas.width = cropWidth;
      canvas.height = videoHeight;

      // Draw only the left portion of the video
      ctx.drawImage(
        video,
        0, 0, cropWidth, videoHeight,  // Source: left portion
        0, 0, cropWidth, videoHeight   // Destination: full canvas
      );

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const brightness = (r + g + b) / 3;

        if (brightness < 30) {
          data[i + 3] = 0;
        } else if (brightness < 60) {
          data[i + 3] = Math.floor((brightness - 30) * (255 / 30));
        }
      }

      ctx.putImageData(imageData, 0, 0);
      requestAnimationFrame(processFrame);
    };

    video.addEventListener('loadeddata', () => {
      processFrame();
    });

    if (video.readyState >= 2) {
      processFrame();
    }

    return () => {};
  }, []);

  return (
    <div className="absolute bottom-[12%] left-[57%] transform -translate-x-1/2 pointer-events-none">
      <video
        ref={videoRef}
        src="/juno.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="hidden"
      />
      <div className="overflow-hidden" style={{ width: '250px' }}>
        <canvas
          ref={canvasRef}
          className="w-[250px] h-auto"
        />
      </div>
    </div>
  );
}
