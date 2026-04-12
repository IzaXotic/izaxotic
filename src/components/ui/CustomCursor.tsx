"use client";
import { useEffect } from "react";

export default function CustomCursor() {
  useEffect(() => {
    const cursor = document.getElementById("cursor");
    const trail = document.getElementById("cursor-trail");
    if (!cursor || !trail) return;

    const onMove = (e: MouseEvent) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
      setTimeout(() => {
        trail.style.left = e.clientX + "px";
        trail.style.top = e.clientY + "px";
      }, 80);
    };

    const onEnter = () => {
      cursor.classList.add("hovering");
      trail.classList.add("hovering");
    };
    const onLeave = () => {
      cursor.classList.remove("hovering");
      trail.classList.remove("hovering");
    };

    window.addEventListener("mousemove", onMove);

    const observer = new MutationObserver(() => {
      document
        .querySelectorAll("a, button, [data-cursor-hover]")
        .forEach((el) => {
          el.removeEventListener("mouseenter", onEnter);
          el.removeEventListener("mouseleave", onLeave);
          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mouseleave", onLeave);
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Initial attach
    document
      .querySelectorAll("a, button, [data-cursor-hover]")
      .forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });

    return () => {
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div id="cursor" />
      <div id="cursor-trail" />
    </>
  );
}
