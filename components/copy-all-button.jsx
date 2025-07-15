"use client";

import { Button } from "@/components/ui/button";

export function CopyAllButton({ password, onHighlightAll }) {
  const handleCopy = () => {
    if (password.length > 0) {
      navigator.clipboard.writeText(password.join("\n"));
      onHighlightAll(); // trigger parent state
    }
  };

  return (
    <Button className="cursor-pointer" onClick={handleCopy}>
      Copy All
    </Button>
  );
}
