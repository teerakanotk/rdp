"use client";

import { Button } from "@/components/ui/button";

export function CopyOneButton({
  password,
  currentIndex,
  setCurrentIndex,
  setSelectedIndex,
  setHighlightAll,
}) {
  const handleCopy = () => {
    if (password.length === 0) return;

    const nextIndex = currentIndex >= password.length ? 0 : currentIndex;
    navigator.clipboard.writeText(password[nextIndex]);
    setSelectedIndex(nextIndex);
    setCurrentIndex(nextIndex + 1); // Will reset to 0 on next call if at end
    setHighlightAll(false);
  };

  return (
    <Button className="cursor-pointer" onClick={handleCopy}>
      Copy one
    </Button>
  );
}
