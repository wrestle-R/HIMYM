"use client"

import { useCallback, useEffect, useRef } from "react"
import { useReducedMotion } from "motion/react"

interface VideoFadeProps {
  src: string
  poster: string
  className?: string
}

export function VideoFade({ src, poster, className }: VideoFadeProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const animationRef = useRef<number | null>(null)
  const reducedMotion = useReducedMotion()

  const fadeTo = useCallback((target: number, duration = 500) => {
    const video = videoRef.current
    if (!video) return
    if (animationRef.current) cancelAnimationFrame(animationRef.current)

    const startOpacity = Number(video.style.opacity || 0)
    const startedAt = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1)
      video.style.opacity = String(
        startOpacity + (target - startOpacity) * progress
      )
      if (progress < 1) animationRef.current = requestAnimationFrame(tick)
    }

    animationRef.current = requestAnimationFrame(tick)
  }, [])

  useEffect(
    () => () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    },
    []
  )

  if (reducedMotion) {
    return (
      <div
        className={className}
        style={{
          backgroundImage: `url(${poster})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
    )
  }

  return (
    <video
      ref={videoRef}
      className={className}
      src={src}
      poster={poster}
      muted
      autoPlay
      playsInline
      preload="auto"
      style={{ opacity: 0 }}
      onCanPlay={(event) => {
        void event.currentTarget.play()
        fadeTo(1)
      }}
      onTimeUpdate={(event) => {
        const video = event.currentTarget
        if (
          video.duration - video.currentTime <= 0.55 &&
          Number(video.style.opacity) > 0.05
        )
          fadeTo(0)
      }}
      onEnded={(event) => {
        const video = event.currentTarget
        video.style.opacity = "0"
        window.setTimeout(() => {
          video.currentTime = 0
          void video.play()
          fadeTo(1)
        }, 100)
      }}
    />
  )
}
