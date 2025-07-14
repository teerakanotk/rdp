"use client";

import { Button } from "@/components/ui/button";
import { pwdgen } from "@/lib/pwdgen";

export function PasswordGenerateButton({
  setPassword,
  getQuantity,
  getPassLength,
  setSelectedIndex,
  setCurrentIndex,
}) {
  const handleGenerate = () => {
    const password = [];

    for (let i = 0; i < getQuantity; i++) {
      password.push(pwdgen(getPassLength));
    }
    setPassword(password);
    setSelectedIndex(null);
    setCurrentIndex(0);
  };

  return (
    <Button className="cursor-pointer" onClick={handleGenerate}>
      Generate
    </Button>
  );
}
