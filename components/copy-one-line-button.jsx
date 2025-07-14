"use client";

import { Button } from "@/components/ui/button";

export function CopyOneLineButton({
  passwords,
  currentIndex,
  setCurrentIndex,
  setSelectedIndex,
}) {
  const handleCopy = () => {
    if (passwords.length === 0) return;

    const nextIndex = currentIndex >= passwords.length ? 0 : currentIndex;
    navigator.clipboard.writeText(passwords[nextIndex]);
    setSelectedIndex(nextIndex);
    setCurrentIndex(nextIndex + 1); // Will reset to 0 on next call if at end
  };

  return (
    <Button className="cursor-pointer" onClick={handleCopy}>
      Copy one line
    </Button>
  );
}
