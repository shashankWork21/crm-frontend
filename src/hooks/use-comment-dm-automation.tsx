"use client";

import { startTransition, useActionState, useEffect, useState } from "react";

import { useAuth } from "@/context/auth.context";
import { useRouter } from "next/navigation";
import {
  createAutomation,
  createAutomationReviewer,
  updateAutomation,
} from "@/actions/automation";
import {
  Automation,
  Platform,
  ResponseSource,
  TriggerSource,
  TriggerType,
  ResponseType,
  LeadMagnetField,
} from "@/lib/types";
import {
  TriggerTypeOption,
  triggerTypeOptions,
} from "@/lib/options/trigger-type-options";
import {
  ButtonTypeOption,
  buttonTypeOptions,
} from "@/lib/options/buttonTypeOptions";

interface ResponseButton {
  text: string;
  type: "CAPTURE_URL" | "LEAD_MAGNET_URL" | "OTHER_URL" | "POSTBACK";
  url: string;
}

interface UseCommentDmAutomationProps {
  assetId: string;
  assetUrl: string;
  leadMagnetId: string;
  defaultValues?: Partial<Automation>;
  editMode?: boolean;
  reviewerMode?: boolean;
}

export default function useCommentDmAutomation({
  assetId,
  assetUrl,
  leadMagnetId,
  defaultValues,
  editMode = false,
  reviewerMode = false,
}: UseCommentDmAutomationProps) {
  const router = useRouter();
  const { user } = useAuth();

  // Parse default button values
  const defaultButtonData: ResponseButton[] = defaultValues?.responseButtonList
    ? (defaultValues.responseButtonList as ResponseButton[]).map((item) =>
        typeof item === "string" ? JSON.parse(item) : item,
      )
    : [];

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedTriggerType, setSelectedTriggerType] =
    useState<TriggerTypeOption | null>(() => {
      if (defaultValues?.triggerType) {
        return (
          triggerTypeOptions.find(
            (opt) => opt.value === defaultValues.triggerType,
          ) || null
        );
      }
      return null;
    });

  const [triggerValues, setTriggerValues] = useState<string[]>(
    defaultValues?.triggerValues || [],
  );
  const [keywordInput, setKeywordInput] = useState("");

  const [includeButtons, setIncludeButtons] = useState<boolean>(
    defaultButtonData.length > 0,
  );

  const [buttons, setButtons] = useState<number[]>(() => {
    if (defaultButtonData.length > 0) {
      return defaultButtonData.map((_, i) => i + 1);
    }
    return [1];
  });

  const [buttonTextList, setButtonTextList] = useState<string[]>(() => {
    if (defaultButtonData.length > 0) {
      return defaultButtonData.map((b) => b.text || "");
    }
    return [];
  });

  const [buttonTypeOptionsList, setButtonTypeOptionsList] = useState<
    ButtonTypeOption[]
  >(() => {
    if (defaultButtonData.length > 0) {
      return defaultButtonData.map((b) => {
        const option = buttonTypeOptions.find((opt) => opt.value === b.type) as
          | ButtonTypeOption
          | undefined;
        return option || (null as unknown as ButtonTypeOption);
      });
    }
    return [];
  });

  const [buttonUrlList, setButtonUrlList] = useState<string[]>(() => {
    if (defaultButtonData.length > 0) {
      return defaultButtonData.map((b) => b.url || "");
    }
    return [];
  });

  const [replyToComment, setReplyToComment] = useState<boolean>(
    defaultValues?.replyToComment || false,
  );
  const [verifyFollower, setVerifyFollower] = useState<boolean>(
    defaultValues?.verifyFollower || false,
  );
  const [enforceFollow, setEnforceFollow] = useState<boolean>(
    defaultValues?.enforceFollow || false,
  );
  const [fieldsToCapture, setFieldsToCapture] = useState<LeadMagnetField[]>(
    defaultValues?.fieldsToCapture || [],
  );

  const [commentReplies, setCommentReplies] = useState<number[]>(() => {
    if (
      defaultValues?.commentReplies &&
      defaultValues.commentReplies.length > 0
    ) {
      return defaultValues.commentReplies.map((_, i) => i + 1);
    }
    return [1];
  });

  const [defaultCommentReplies] = useState<string[]>(
    defaultValues?.commentReplies || [],
  );

  const handleAddCommentReply = () => {
    setCommentReplies((prev) => [...prev, prev[prev.length - 1] + 1]);
  };

  const handleRemoveCommentReply = (index: number) => {
    setCommentReplies((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddTriggerValue = (value: string) => {
    setTriggerValues((prev) => [...prev, value]);
  };

  const handleRemoveTriggerValue = (value: string) => {
    setTriggerValues((prev) => prev.filter((v) => v !== value));
  };

  const handleKeywordInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if ((e.key === "Tab" || e.key === "Enter") && keywordInput.trim()) {
      e.preventDefault();
      const value = keywordInput.trim();
      if (!triggerValues.includes(value)) {
        handleAddTriggerValue(value);
      }
      setKeywordInput("");
    }
  };

  function handleTriggerTypeOptionChange(value: string) {
    const selectedOption = triggerTypeOptions.find(
      (option: TriggerTypeOption) => option.value === value,
    );
    if (selectedOption) {
      setSelectedTriggerType(selectedOption);
    }
  }

  const automationPayload = {
    assetId,
    assetUrl,
    platform: Platform.INSTAGRAM,
    organisationId: user?.organisationId || "",
    createdById: user?.id || "",
    leadMagnetId,
    triggerSource: TriggerSource.COMMENT,
    triggerType: selectedTriggerType?.value as TriggerType,
    triggerValues,
    responseSource: ResponseSource.INSTAGRAM_DM,
    responseType: ResponseType.TEXT,
    replyToComment,
    verifyFollower,
    enforceFollow,
    responseButtonList: includeButtons
      ? buttons.map((_, index) =>
          JSON.stringify({
            text: buttonTextList[index],
            type: buttonTypeOptionsList[index]?.value,
            url: buttonUrlList[index],
          }),
        )
      : [],
    fieldsToCapture: fieldsToCapture as LeadMagnetField[],
  };

  const [formState, action] = useActionState(
    editMode
      ? updateAutomation.bind(null, defaultValues?.id || "", automationPayload)
      : reviewerMode
        ? createAutomationReviewer.bind(null, automationPayload)
        : createAutomation.bind(null, automationPayload),
    {
      success: false,
      message: "",
      errors: {},
      itemId: "",
    },
  );

  function handleIncludeButtonsToggle() {
    setIncludeButtons(!includeButtons);
  }

  function handleAddButton() {
    if (buttons.length >= 3) return; // Max 3 buttons
    setButtons((prev) => [...prev, prev[prev.length - 1] + 1]);
    setButtonTextList((prev) => [...prev, ""]);
    setButtonTypeOptionsList((prev) => [
      ...prev,
      null as unknown as ButtonTypeOption,
    ]);
    setButtonUrlList((prev) => [...prev, ""]);
  }

  function handleRemoveButton(index: number) {
    setButtons((prev) => prev.filter((_, i) => i !== index));
    setButtonTextList((prev) => prev.filter((_, i) => i !== index));
    setButtonTypeOptionsList((prev) => prev.filter((_, i) => i !== index));
    setButtonUrlList((prev) => prev.filter((_, i) => i !== index));
  }

  function handleButtonTextChange(index: number, value: string) {
    setButtonTextList((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  }

  function handleButtonTypeChange(index: number, value: string) {
    const selectedOption = buttonTypeOptions.find(
      (option) => option.value === value,
    ) as ButtonTypeOption | undefined;
    if (selectedOption) {
      setButtonTypeOptionsList((prev) => {
        const updated = [...prev];
        updated[index] = selectedOption;
        return updated;
      });
    }
  }

  function handleButtonUrlChange(index: number, value: string) {
    setButtonUrlList((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  }

  // Initialize the arrays when buttons state changes (for initial button)
  useEffect(() => {
    if (buttons.length > 0 && buttonTextList.length === 0) {
      setButtonTextList(buttons.map(() => ""));
      setButtonTypeOptionsList(
        buttons.map(() => null as unknown as ButtonTypeOption),
      );
      setButtonUrlList(buttons.map(() => ""));
    }
  }, [buttons.length, buttonTextList.length]);

  useEffect(() => {
    if (formState?.success) {
      router.push(`/lead-magnets/${leadMagnetId}`);
    }
  }, [formState?.success, router, leadMagnetId]);

  function handleVerifyFollowerToggle() {
    setVerifyFollower(!verifyFollower);
  }

  function handleEnforceFollowToggle() {
    setEnforceFollow(!enforceFollow);
  }

  function handleReplyToCommentToggle() {
    setReplyToComment(!replyToComment);
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

  function handleFieldToCaptureChange(field: LeadMagnetField) {
    setFieldsToCapture((prev) => {
      if (prev.includes(field)) {
        return prev.filter((f) => f !== field);
      }
      return [...prev, field];
    });
  }

  return {
    formState,
    handleSubmit,
    isSubmitting,
    triggerValues,
    handleAddTriggerValue,
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
    isEditMode: editMode,
    defaultValues,
    defaultCommentReplies,
  };
}
