"use client";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { X, Plus, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { triggerTypeOptions } from "@/lib/options/trigger-type-options";
import { Automation, LeadMagnetField, TriggerType } from "@/lib/types";
import useCommentDmAutomation from "@/hooks/use-comment-dm-automation";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";
import { buttonTypeOptions } from "@/lib/options/buttonTypeOptions";
import { Button } from "../ui/button";

interface IgDMAutomationFormProps {
  leadMagnetId: string;
  assetId: string;
  assetUrl: string;
  defaultValues?: Automation;
  editMode?: boolean;
}

export default function IgCommentDMAutomationForm({
  assetId,
  assetUrl,
  leadMagnetId,
  defaultValues,
  editMode = false,
}: IgDMAutomationFormProps) {
  const {
    handleSubmit,
    isSubmitting,
    triggerValues,
    handleRemoveTriggerValue,
    selectedTriggerType,
    handleTriggerTypeOptionChange,
    keywordInput,
    setKeywordInput,
    handleKeywordInputKeyDown,
    includeButtons,
    handleIncludeButtonsToggle,
    buttons,
    handleAddButton,
    handleRemoveButton,
    buttonTextList,
    buttonTypeOptionsList,
    buttonUrlList,
    handleButtonTextChange,
    handleButtonTypeChange,
    handleButtonUrlChange,
    verifyFollower,
    handleVerifyFollowerToggle,
    enforceFollow,
    handleEnforceFollowToggle,
    replyToComment,
    handleReplyToCommentToggle,
    fieldsToCapture,
    handleFieldToCaptureChange,
    commentReplies,
    handleAddCommentReply,
    handleRemoveCommentReply,
    isEditMode,
    defaultCommentReplies,
  } = useCommentDmAutomation({
    assetId,
    assetUrl,
    leadMagnetId,
    defaultValues,
    editMode,
  });

  return (
    <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
      <div className="p-5 bg-oxford-blue rounded-lg">
        <h1 className="text-xl font-semibold text-white mb-4">
          Trigger (This decides when the automation will run)
        </h1>
        <div className="space-y-2 mt-6">
          <Label
            htmlFor="business-model"
            className="text-md font-medium text-white/80"
          >
            When should this automation be triggered?
          </Label>
          <Select
            value={selectedTriggerType?.value || ""}
            onValueChange={handleTriggerTypeOptionChange}
          >
            <SelectTrigger className="w-full h-12! border border-white/10 bg-rich-black text-white rounded-xl focus:border-sunglow-500 focus:ring-sunglow-500/20 focus:ring-2 transition-all [&>span]:text-white/70 [&>span[data-placeholder]]:text-white/30 mt-4">
              <SelectValue placeholder="Select one" />
            </SelectTrigger>
            <SelectContent className="bg-oxford-blue-300 border border-white/10 rounded-xl text-md">
              {triggerTypeOptions
                .filter(
                  (option) =>
                    ![
                      TriggerType.MESSAGE_ANY,
                      TriggerType.MESSAGE_KEYWORD,
                      TriggerType.TIME_DELAY,
                    ].includes(option.value),
                )
                .map((option, index) => (
                  <SelectItem
                    key={index}
                    value={option.value}
                    className={`cursor-pointer text-white/80 hover:text-white focus:text-white focus:bg-white/10 ${
                      option.value === selectedTriggerType?.value
                        ? "font-semibold bg-rich-black"
                        : ""
                    }`}
                  >
                    {option.label}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        {(selectedTriggerType?.value === TriggerType.COMMENT_KEYWORD ||
          selectedTriggerType?.value === TriggerType.MESSAGE_KEYWORD) && (
          <div className="space-y-3 mt-4">
            <Label className="text-sm font-medium text-white/80">
              Keywords
            </Label>
            <div className="relative">
              <Input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={handleKeywordInputKeyDown}
                placeholder="Type a keyword and press tab/enter/return to add"
                className="h-12 border border-white/10 bg-rich-black text-white placeholder:text-white/30 rounded-xl focus:border-sunglow-500 focus:ring-sunglow-500/20 focus:ring-2 transition-all"
              />
            </div>
            {triggerValues.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {triggerValues.map((value) => (
                  <Badge
                    key={value}
                    className="bg-sunglow/20 text-sunglow border border-sunglow/30 px-3 py-1 gap-2"
                  >
                    {value}
                    <button
                      type="button"
                      onClick={() => handleRemoveTriggerValue(value)}
                      className="hover:text-white transition-colors"
                    >
                      <X className="size-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="p-5 bg-oxford-blue rounded-lg">
        <h1 className="text-xl font-semibold text-white mb-4">
          Comment Reply Settings
        </h1>
        <div className="flex-1 flex flex-row items-center mt-6">
          <Checkbox
            className="border border-white/30 bg-rich-black data-[state=checked]:bg-sunglow-500 data-[state=checked]:text-rich-black data-[state=checked]:border-sunglow-500"
            checked={replyToComment}
            onCheckedChange={handleReplyToCommentToggle}
          />
          <p className="ml-3 text-md text-white/80">
            Reply to the user's comment
          </p>
        </div>
        {replyToComment && (
          <div className="space-y-3 mt-6">
            <Label htmlFor="commentReplies">Comment Replies</Label>
            <div className="flex flex-col gap-3">
              {commentReplies.map((reply, index) => (
                <div key={reply} className="flex items-center gap-2">
                  <Input
                    type="text"
                    name="commentReplies"
                    placeholder={`Reply ${index + 1}`}
                    defaultValue={defaultCommentReplies[index] || ""}
                    className="flex-1 border border-white/10 bg-rich-black text-white placeholder:text-white/30 rounded-xl focus:border-sunglow-500 focus:ring-sunglow-500/20 focus:ring-2 transition-all h-12"
                  />
                  {commentReplies.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveCommentReply(index)}
                      className="text-red-400 hover:text-red-300 transition-colors p-2"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={handleAddCommentReply}
                className="w-full h-10 border border-dashed border-white/20 bg-rich-black text-white/60 hover:text-white hover:border-white/40 hover:bg-rich-black rounded-xl transition-all"
              >
                <Plus className="size-4 mr-2" />
                Add Reply
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="p-5 bg-oxford-blue rounded-lg">
        <h1 className="text-xl font-semibold text-white mb-4">
          Follower Verification Settings
        </h1>
        <div className="flex-1 flex flex-row items-center">
          <Checkbox
            className="border border-white/30 bg-rich-black data-[state=checked]:bg-sunglow-500 data-[state=checked]:text-rich-black data-[state=checked]:border-sunglow-500"
            checked={verifyFollower}
            onCheckedChange={handleVerifyFollowerToggle}
          />
          <p className="ml-3 text-md text-white/80">
            Verify if the user is a follower before sending the Lead Magnet
          </p>
        </div>
        {verifyFollower && (
          <>
            <div className="flex-1 flex flex-row items-center mt-5">
              <Checkbox
                className="border border-white/30 bg-rich-black data-[state=checked]:bg-sunglow-500 data-[state=checked]:text-rich-black data-[state=checked]:border-sunglow-500"
                checked={enforceFollow}
                onCheckedChange={handleEnforceFollowToggle}
              />
              <p className="ml-3 text-md text-white/80">
                Send the Lead Magnet only after they follow the account
              </p>
            </div>
            <div className="space-y-3 mt-6">
              <Label
                htmlFor="verificationMessage"
                className="text-md font-medium text-white/80"
              >
                Message for non-followers
              </Label>

              <Textarea
                name="verificationMessage"
                placeholder="What should the message be if they are not a follower?"
                defaultValue={defaultValues?.verificationMessage || ""}
                className="h-12 border border-white/10 bg-rich-black text-white placeholder:text-white/30 rounded-xl focus:border-sunglow-500 focus:ring-sunglow-500/20 focus:ring-2 transition-all"
              />
            </div>
            <div className="space-y-3 mt-6">
              <Label className="text-sm font-medium text-white/80">
                Quick Reply Text
              </Label>
              <div className="relative">
                <Input
                  type="text"
                  name="verificationButtonText"
                  placeholder="Example: 'I'm Following' or 'Done'"
                  defaultValue={defaultValues?.verificationButtonText || ""}
                  className="h-12 border border-white/10 bg-rich-black text-white placeholder:text-white/30 rounded-xl focus:border-sunglow-500 focus:ring-sunglow-500/20 focus:ring-2 transition-all"
                />
              </div>
            </div>
          </>
        )}
      </div>
      <div className="p-5 bg-oxford-blue rounded-lg">
        <h1 className="text-xl font-semibold text-white mb-4">
          DM Response Settings
        </h1>
        <div className="space-y-3">
          <Label
            htmlFor="responseContent"
            className="text-md font-medium text-white/80"
          >
            Message Content
          </Label>

          <Textarea
            name="responseContent"
            placeholder="Type your response message here..."
            defaultValue={defaultValues?.responseContent || ""}
            className="h-12 border border-white/10 bg-rich-black text-white placeholder:text-white/30 rounded-xl focus:border-sunglow-500 focus:ring-sunglow-500/20 focus:ring-2 transition-all"
          />
        </div>
        <div className="flex flex-col gap-2 mt-6">
          <p className="text-md text-white/70">
            What fields would you like to capture for the lead?
          </p>
          <div className="text-sm text-white/70 flex flex-row gap-12 justify-start items-center">
            <div className="flex flex-row justify-start items-center gap-2">
              <Checkbox
                className="border border-white/30 bg-rich-black data-[state=checked]:bg-sunglow-500 data-[state=checked]:text-rich-black data-[state=checked]:border-sunglow-500"
                checked={fieldsToCapture.includes(LeadMagnetField.NAME)}
                onCheckedChange={() =>
                  handleFieldToCaptureChange(LeadMagnetField.NAME)
                }
              />
              <Label>Name</Label>
            </div>
            <div className="flex flex-row justify-start items-center gap-2">
              <Checkbox
                className="border border-white/30 bg-rich-black data-[state=checked]:bg-sunglow-500 data-[state=checked]:text-rich-black data-[state=checked]:border-sunglow-500"
                checked={fieldsToCapture.includes(LeadMagnetField.EMAIL)}
                onCheckedChange={() =>
                  handleFieldToCaptureChange(LeadMagnetField.EMAIL)
                }
              />
              <Label>Email</Label>
            </div>
            <div className="flex flex-row justify-start items-center gap-2">
              <Checkbox
                className="border border-white/30 bg-rich-black data-[state=checked]:bg-sunglow-500 data-[state=checked]:text-rich-black data-[state=checked]:border-sunglow-500"
                checked={fieldsToCapture.includes(LeadMagnetField.PHONE_NUMBER)}
                onCheckedChange={() =>
                  handleFieldToCaptureChange(LeadMagnetField.PHONE_NUMBER)
                }
              />
              <Label>Phone Number</Label>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-row items-center mt-6">
          <Checkbox
            className="border border-white/30 bg-rich-black data-[state=checked]:bg-sunglow-500 data-[state=checked]:text-rich-black data-[state=checked]:border-sunglow-500"
            checked={includeButtons}
            onCheckedChange={handleIncludeButtonsToggle}
          />
          <p className="ml-3 text-md text-white/80">
            Include quick response buttons in the DM?
          </p>
        </div>
        {includeButtons && (
          <div className="flex flex-col items-start mt-6 space-y-4">
            {buttons.map((button, index) => (
              <div
                key={button}
                className="flex flex-col gap-3 w-full p-4 border border-white/10 rounded-xl bg-rich-black"
              >
                <div className="flex items-center justify-between">
                  <span className="text-md font-medium text-white">
                    Button {index + 1}
                  </span>
                  {buttons.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveButton(index)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  )}
                </div>
                <div className="flex flex-col items-center gap-5">
                  <div className="text-white/60 w-full flex flex-col gap-3">
                    <Label>Text:</Label>
                    <Input
                      type="text"
                      value={buttonTextList[index] || ""}
                      onChange={(e) =>
                        handleButtonTextChange(index, e.target.value)
                      }
                      placeholder={`Button ${index + 1} Text`}
                      className="border border-white/10 bg-oxford-blue text-white placeholder:text-white/30 rounded-xl focus:border-sunglow-500 focus:ring-sunglow-500/20 focus:ring-2 transition-all"
                    />
                  </div>
                  <div className="text-white/60 w-full flex flex-col gap-3">
                    <Label>Type:</Label>
                    <Select
                      value={buttonTypeOptionsList[index]?.value || ""}
                      onValueChange={(value) =>
                        handleButtonTypeChange(index, value)
                      }
                    >
                      <SelectTrigger className="w-full border border-white/10 bg-oxford-blue text-white rounded-xl focus:border-sunglow-500 focus:ring-sunglow-500/20 focus:ring-2 transition-all [&>span]:text-white/70 [&>span[data-placeholder]]:text-white/30">
                        <SelectValue placeholder="Select button type" />
                      </SelectTrigger>
                      <SelectContent className="bg-oxford-blue border border-white/10 rounded-xl">
                        {buttonTypeOptions.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                            className={`cursor-pointer text-white/80 hover:text-white focus:text-white focus:bg-white/10 ${
                              option.value ===
                              buttonTypeOptionsList[index]?.value
                                ? "font-semibold bg-rich-black"
                                : ""
                            }`}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {buttonTypeOptionsList[index]?.value === "OTHER_URL" && (
                  <Input
                    type="url"
                    value={buttonUrlList[index] || ""}
                    onChange={(e) =>
                      handleButtonUrlChange(index, e.target.value)
                    }
                    placeholder="https://example.com"
                    className="w-full h-12! border border-white/10 bg-rich-black text-white placeholder:text-white/30 rounded-xl focus:border-sunglow-500 focus:ring-sunglow-500/20 focus:ring-2 transition-all"
                  />
                )}
              </div>
            ))}
            {buttons.length < 3 && (
              <Button
                type="button"
                variant="outline"
                onClick={handleAddButton}
                className="w-full h-12 border border-dashed border-white/20 bg-rich-black text-white/60 hover:text-white hover:border-white/40 hover:bg-rich-black rounded-xl transition-all"
              >
                <Plus className="size-4 mr-2" />
                Add Button ({buttons.length}/3)
              </Button>
            )}
          </div>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="mx-auto mt-4 col-span-2 w-1/2 bg-sunglow hover:bg-sunglow-600 text-rich-black font-semibold transition-all duration-300"
      >
        {isEditMode ? "Update Automation" : "Create Automation"}
      </Button>
    </form>
  );
}
