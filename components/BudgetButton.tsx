"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { createBudget } from "@/app/api/budget/route";
import { toast } from "sonner";

export default function BudgetButton() {
  const [emojiIcon, setEmojiIcon] = useState("😀");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const handleCreateBudget = async () => {
    const addBudget = await createBudget(name, Number(amount), emojiIcon);
    if (addBudget.success) {
      toast("New Budget Created 🎉");
      window.location.reload();
    } else {
      console.error("Error creating budget");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <div className="border border-dashed border-white h-52 w-96 rounded-lg p-5 mr-5 hover:cursor-pointer  hover:bg-[#1B37A5]">
            <div className="h-full flex flex-col items-centr justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 w-full text-center"
              >
                <path
                  fillRule="evenodd"
                  d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
              <h3 className="font-medium text-2xl mt-5 w-full text-center">
                Create New Budget
              </h3>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Budget</DialogTitle>
          <DialogDescription>
            <div className="mt-5">
              <Button
                variant="outline"
                className="text-lg"
                onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
              >
                {emojiIcon}
              </Button>
              <div className="absolute z-20">
                <EmojiPicker
                  open={openEmojiPicker}
                  onEmojiClick={(e) => {
                    setEmojiIcon(e.emoji);
                    setOpenEmojiPicker(false);
                  }}
                />
              </div>
              <div className="mt-2">
                <h2 className="text-white text-lg font-medium fnt mx-2 my-3">
                  Budget Name
                </h2>
                <Input
                  className="text-white"
                  placeholder="e.g. Home Decor"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mt-2">
                <h2 className="text-white text-lg font-medium mx-2 my-3">
                  Budget Amount
                </h2>
                <Input
                  className="text-white"
                  type="number"
                  placeholder="e.g. 5000$"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              disabled={!(name && amount)}
              onClick={handleCreateBudget}
              className="mt-5 w-full rounded-full"
            >
              Create Budget
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
