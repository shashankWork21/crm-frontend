"use client";

import { sendInstagramDirectMessage } from "@/actions/instagram";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { buttonTypeOptionsReviewer } from "@/lib/options/buttonTypeOptions";
import { Plus, Trash2 } from "lucide-react";
import { startTransition, useActionState, useEffect, useState } from "react";

interface DMFormProps {
  recipientId: string;
  accessToken: string;
  onSuccess?: () => void;
}

export default function DMForm({
  recipientId,
  accessToken,
  onSuccess,
}: DMFormProps) {
  const [hasButtons, setHasButtons] = useState(false);
  const [buttonTextList, setButtonTextList] = useState<string[]>([]);
  const [buttonTypesList, setButtonTypesList] = useState<
    ("web_url" | "postback")[]
  >([]);
  const [buttonUrlsList, setButtonUrlsList] = useState<string[]>([]);
  const [buttonPayloadsList, setButtonPayloadsList] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formState, action] = useActionState(
    sendInstagramDirectMessage.bind(null, {
      recipientId,
      accessToken,
      buttons: hasButtons
        ? buttonTextList.map((text, index) => ({
            type: buttonTypesList[index],
            title: text,
            url:
              buttonTypesList[index] === "web_url"
                ? buttonUrlsList[index]
                : undefined,
            payload:
              buttonTypesList[index] === "postback"
                ? buttonPayloadsList[index]
                : undefined,
          }))
        : [],
    }),
    {
      success: false,
      message: "",
      errors: {},
    },
  );

  useEffect(() => {
    if (formState.success && onSuccess) {
      onSuccess();
    }
  }, [formState]);

  function handleAddButton() {
    if (buttonTextList.length >= 3) return;
    setButtonTextList((prev) => [...prev, ""]);
    setButtonTypesList((prev) => [...prev, "web_url"]);
    setButtonUrlsList((prev) => [...prev, ""]);
    setButtonPayloadsList((prev) => [...prev, ""]);
  }

  function handleRemoveButton(index: number) {
    setButtonTextList((prev) => prev.filter((_, i) => i !== index));
    setButtonTypesList((prev) => prev.filter((_, i) => i !== index));
    setButtonUrlsList((prev) => prev.filter((_, i) => i !== index));
    setButtonPayloadsList((prev) => prev.filter((_, i) => i !== index));
  }

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.target as HTMLFormElement);
    startTransition(() => {
      action(formData);
      setIsSubmitting(false);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="message"
        placeholder="Type your message here..."
        required
        className="h-12 border border-white/10 bg-rich-black text-white placeholder:text-white/30 rounded-xl focus:border-sunglow-500 focus:ring-sunglow-500/20 focus:ring-2 transition-all"
      />

      <div className="flex flex-row items-center gap-2">
        <Checkbox
          checked={hasButtons}
          onCheckedChange={(value) => setHasButtons(!!value)}
          className="border border-white/30 bg-rich-black data-[state=checked]:bg-sunglow-500 data-[state=checked]:text-rich-black data-[state=checked]:border-sunglow-500"
        />
        <span className="text-md text-white/60">Include buttons</span>
      </div>

      {hasButtons && (
        <div className="space-y-3">
          {buttonTextList.map((_, index) => (
            <div
              key={index}
              className="flex flex-col gap-3 w-full p-4 border border-white/10 rounded-xl bg-rich-black"
            >
              <div className="flex items-center justify-between">
                <span className="text-md font-medium text-white">
                  Button {index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveButton(index)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <Label className="text-white/60">Text</Label>
                  <Input
                    type="text"
                    value={buttonTextList[index]}
                    onChange={(e) =>
                      setButtonTextList((prev) => {
                        const updated = [...prev];
                        updated[index] = e.target.value;
                        return updated;
                      })
                    }
                    placeholder="Button text"
                    className="border border-white/10 bg-oxford-blue text-white placeholder:text-white/30 rounded-xl focus:border-sunglow-500 focus:ring-sunglow-500/20 focus:ring-2 transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label className="text-white/60">Type</Label>
                  <Select
                    value={buttonTypesList[index]}
                    onValueChange={(value: "web_url" | "postback") =>
                      setButtonTypesList((prev) => {
                        const updated = [...prev];
                        updated[index] = value;
                        return updated;
                      })
                    }
                  >
                    <SelectTrigger className="w-full border border-white/10 bg-oxford-blue text-white rounded-xl focus:border-sunglow-500 focus:ring-sunglow-500/20 focus:ring-2 transition-all [&>span]:text-white/70">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-oxford-blue border border-white/10 rounded-xl">
                      {buttonTypeOptionsReviewer.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className="cursor-pointer text-white/80 hover:text-white focus:text-white focus:bg-white/10"
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {buttonTypesList[index] === "web_url" && (
                  <div className="flex flex-col gap-2">
                    <Label className="text-white/60">URL</Label>
                    <Input
                      type="url"
                      value={buttonUrlsList[index]}
                      onChange={(e) =>
                        setButtonUrlsList((prev) => {
                          const updated = [...prev];
                          updated[index] = e.target.value;
                          return updated;
                        })
                      }
                      placeholder="https://example.com"
                      className="border border-white/10 bg-oxford-blue text-white placeholder:text-white/30 rounded-xl focus:border-sunglow-500 focus:ring-sunglow-500/20 focus:ring-2 transition-all"
                    />
                  </div>
                )}

                {buttonTypesList[index] === "postback" && (
                  <div className="flex flex-col gap-2">
                    <Label className="text-white/60">Payload</Label>
                    <Input
                      type="text"
                      value={buttonPayloadsList[index]}
                      onChange={(e) =>
                        setButtonPayloadsList((prev) => {
                          const updated = [...prev];
                          updated[index] = e.target.value;
                          return updated;
                        })
                      }
                      placeholder="Payload value"
                      className="border border-white/10 bg-oxford-blue text-white placeholder:text-white/30 rounded-xl focus:border-sunglow-500 focus:ring-sunglow-500/20 focus:ring-2 transition-all"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}

          {buttonTextList.length < 3 && (
            <Button
              type="button"
              variant="outline"
              onClick={handleAddButton}
              className="w-full h-10 border border-dashed border-white/20 bg-rich-black text-white/60 hover:text-white hover:border-white/40 hover:bg-rich-black rounded-xl transition-all"
            >
              <Plus className="size-4 mr-2" />
              Add Button ({buttonTextList.length}/3)
            </Button>
          )}
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-sunglow hover:bg-sunglow-600 text-rich-black font-semibold transition-all duration-300"
      >
        {isSubmitting ? "Sending..." : "Send DM"}
      </Button>
    </form>
  );
}
