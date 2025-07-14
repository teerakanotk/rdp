"use client";

import { Button } from "@/components/ui/button";

export function CopyAllButton({ password }) {
  const handleCopy = () => {
    if (password.length > 0) {
      navigator.clipboard.writeText(password.join("\n"));
    }
  };

  return (
    <Button className="cursor-pointer" onClick={handleCopy}>
      Copy All
    </Button>
  );
}
