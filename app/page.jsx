"use client";

import { useState, useEffect } from "react";
import { pwdgen } from "@/lib/pwdgen";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { PasswordGenerateButton } from "@/components/password-generate-button";
import { CopyOneLineButton } from "@/components/copy-one-line-button";
import { CopyAllButton } from "@/components/copy-all-button";

export default function HomePage() {
  const [quantity, setQuantity] = useState(1);
  const [passLength, setPassLength] = useState(8);
  const [password, setPassword] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const generateOnLoad = () => {
      const newPassword = [];
      for (let i = 0; i < quantity; i++) {
        newPassword.push(pwdgen(passLength));
      }
      setPassword(newPassword);
      setSelectedIndex(null);
      setCurrentIndex(0);
    };

    generateOnLoad();
  }, []); // Only run once on mount

  return (
    <div className="min-h-screen flex items-center justify-center bg-accent-foreground/5 px-4 py-8">
      <Card className="w-[600px] shadow-lg">
        <CardHeader className="flex justify-center items-center">
          <CardTitle className="text-2xl font-bold text-center">
            Random Password Generator
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-2">
          {/* password length */}
          <div className="w-full flex items-center justify-between">
            <p>Password Length:</p>
            <Select
              value={passLength.toString()}
              onValueChange={(value) => setPassLength(parseInt(value))}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[8, 9, 10, 11, 12, 13, 14, 15, 16, 32, 64, 128].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* quantity */}
          <div className="w-full flex items-center justify-between">
            <p>Quantity:</p>
            <Select
              value={quantity.toString()}
              onValueChange={(value) => setQuantity(parseInt(value))}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[
                  1, 2, 3, 4, 5, 10, 20, 30, 40, 50, 100, 200, 300, 400, 500,
                  1000,
                ].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>

        <CardFooter className={"flex flex-col gap-4"}>
          <div className="flex justify-center gap-1">
            <PasswordGenerateButton
              getPassLength={passLength}
              getQuantity={quantity}
              setPassword={setPassword}
              setSelectedIndex={setSelectedIndex}
              setCurrentIndex={setCurrentIndex}
              pwdgenFunction={pwdgen}
            />

            <CopyOneLineButton
              password={password}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              setSelectedIndex={setSelectedIndex}
            />

            <CopyAllButton password={password} />
          </div>

          <div className="w-full p-2 border rounded-md">
            <ScrollArea className="h-64 overflow-y-auto">
              {password.map((password, index) => (
                <p
                  key={index}
                  className={`p-1.5 break-words ${
                    selectedIndex === index ? "bg-accent-foreground/4" : ""
                  }`}
                >
                  {password}
                </p>
              ))}
            </ScrollArea>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
