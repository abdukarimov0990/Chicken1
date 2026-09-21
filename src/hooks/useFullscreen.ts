import { useCallback, useEffect, useState } from "react";

/** Full-screen state of the page, a toggle for it, and the `F` key as a shortcut. */
export function useFullscreen() {
  const [active, setActive] = useState(() => document.fullscreenElement !== null);

  const toggle = useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void document.documentElement.requestFullscreen?.().catch(() => undefined);
  }, []);

  useEffect(() => {
    const onChange = () => setActive(document.fullscreenElement !== null);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key.toLowerCase() === "f") toggle();
    };
    document.addEventListener("fullscreenchange", onChange);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("fullscreenchange", onChange);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [toggle]);

  return { active, toggle, supported: typeof document.documentElement.requestFullscreen === "function" };
}
