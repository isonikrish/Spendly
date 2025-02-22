
"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import EmojiPicker from "emoji-picker-react";
import useApp from "@/stores/useApp";
function AddIncome() {
    const [emojiIcon, setEmojiIcon] = useState("😀");
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [sourceName, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { addIncomeSource } = useApp();
    const handleAddNewIncomeSource = async () => {
        const data = { sourceName, amount: parseInt(amount) || 0, emojiIcon };
        console.log(data)
        setIsLoading(true)
        await addIncomeSource(data);
        setIsLoading(false)
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="border w-[300px] h-[150px] rounded-lg flex flex-col justify-center items-center cursor-pointer gap-3">
                    <Plus />
                    Create a New Income Source
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogTitle>Create New Income Source</DialogTitle>
                <div className="space-y-4">
                    <div className="relative">
                        <Button
                            variant="outline"
                            className="text-lg"
                            onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                        >
                            {emojiIcon}
                        </Button>
                        {openEmojiPicker && (
                            <div className="absolute z-20 bg-white shadow-lg rounded-md p-2">
                                <EmojiPicker
                                    onEmojiClick={(e) => {
                                        setEmojiIcon(e.emoji);
                                        setOpenEmojiPicker(false);
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    <div>
                        <Label>Source Name</Label>
                        <Input
                            placeholder="e.g. Youtube"
                            value={sourceName}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <Label>Monthly Amount</Label>
                        <Input
                            type="number"
                            placeholder="e.g. 5000$"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>

                    <Button disabled={!(sourceName && amount)} onClick={handleAddNewIncomeSource}>Create Income Source</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default AddIncome