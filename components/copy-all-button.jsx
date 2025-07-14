"use client";

import { Button } from "@/components/ui/button";

export function CopyAllButton({ passwords }) {
  const handleCopy = () => {
    if (passwords.length > 0) {
      navigator.clipboard.writeText(passwords.join("\n"));
    }
  };

  return (
    <Button className="cursor-pointer" onClick={handleCopy}>
      Copy All
    </Button>
  );
}
