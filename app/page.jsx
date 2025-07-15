"use client";

import { useEffect, useState } from "react";
import { generatePasswords } from "@/lib/password-utils";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { GenerateButton } from "@/components/generate-button";
import { CopyOneButton } from "@/components/copy-one-button";
import { CopyAllButton } from "@/components/copy-all-button";

export default function HomePage() {
  const [quantity, setQuantity] = useState(1);
  const [passLength, setPassLength] = useState(8);
  const [password, setPassword] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);

  // load settings on page load
  useEffect(() => {
    const savedLength = localStorage.getItem("passwordLength");
    const savedQuantity = localStorage.getItem("passwordQuantity");

    if (savedLength) setPassLength(parseInt(savedLength));
    if (savedQuantity) setQuantity(parseInt(savedQuantity));
  }, []);

  // save passwordLength setting to localstorage
  useEffect(() => {
    localStorage.setItem("passwordLength", passLength.toString());
  }, [passLength]);

  // save passwordQuantity setting to localstorage
  useEffect(() => {
    localStorage.setItem("passwordQuantity", quantity.toString());
  }, [quantity]);

  // auto-generate password when page is load
  useEffect(() => {
    const initialPasswords = generatePasswords(quantity, passLength);
    setPassword(initialPasswords);
    setSelectedIndex(null);
    setCurrentIndex(0);
  }, [quantity, passLength]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-accent-foreground/5">
      <Card className="w-[350px] md:w-[650px] shadow-lg">
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
            <GenerateButton
              getPassLength={passLength}
              getQuantity={quantity}
              setPassword={setPassword}
              setSelectedIndex={setSelectedIndex}
              setCurrentIndex={setCurrentIndex}
            />

            <CopyOneButton
              password={password}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              setSelectedIndex={setSelectedIndex}
            />

            <CopyAllButton password={password} />
          </div>

          <ScrollArea className="min-h-14 max-h-66 w-full p-2 border rounded-md overflow-auto">
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

            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardFooter>
      </Card>
    </div>
  );
}
