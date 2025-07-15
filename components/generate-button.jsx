"use client";

import { Button } from "@/components/ui/button";
import { generatePasswords } from "@/lib/password-utils";

export function GenerateButton({
  setPassword,
  getQuantity,
  getPassLength,
  setSelectedIndex,
  setCurrentIndex,
}) {
  const handleGenerate = () => {
    const newPasswords = generatePasswords(getQuantity, getPassLength);
    setPassword(newPasswords);
    setSelectedIndex(null);
    setCurrentIndex(0);
  };

  return (
    <Button className="cursor-pointer" onClick={handleGenerate}>
      Generate
    </Button>
  );
}
