"use client";

import { startTransition, useActionState, useState } from "react";
import { Loader2, User, Mail, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Gender } from "@/lib/types";
import { createContact } from "@/actions/contact";

// Placeholder action - replace with your actual action

interface ContactCreateFormProps {
  organisationId: string;
}

export default function ContactCreateForm({
  organisationId,
}: ContactCreateFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  console.log("Organisation ID:", organisationId);

  const [formState, action] = useActionState(
    createContact.bind(null, organisationId),
    {
      success: false,
      message: "",
      errors: {},
    }
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.target as HTMLFormElement);
    startTransition(() => {
      action(formData);
      setIsSubmitting(false);
    });
  }

  return (
    <Card className="mx-auto mt-10 w-full md:w-3/5 xl:w-2/5 border-powder-blue-700/40 bg-white shadow-lg">
      <CardHeader className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-oxford-blue-500 shadow-md">
            <User className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-semibold text-rich-black">
            Create New Contact
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name - Required */}
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="flex items-center gap-2 text-sm font-medium text-rich-black-500"
            >
              <User className="h-4 w-4 text-oxford-blue-500" />
              Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter contact name"
              required
              className="h-11 border border-powder-blue-700/40 bg-white focus:border-oxford-blue-400 focus:ring-oxford-blue-400"
            />
            {!!formState.errors.name && (
              <ul className="space-y-1 text-sm text-red-500">
                {formState.errors.name.map((error: string, index: number) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Phone Number - Required */}
          <div className="space-y-2">
            <Label
              htmlFor="phoneNumber"
              className="flex items-center gap-2 text-sm font-medium text-rich-black-500"
            >
              <Phone className="h-4 w-4 text-oxford-blue-500" />
              Phone Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              placeholder="Enter phone number"
              required
              className="h-11 border border-powder-blue-700/40 bg-white focus:border-oxford-blue-400 focus:ring-oxford-blue-400"
            />
            {!!formState.errors.phoneNumber && (
              <ul className="space-y-1 text-sm text-red-500">
                {formState.errors.phoneNumber.map(
                  (error: string, index: number) => (
                    <li key={index}>{error}</li>
                  )
                )}
              </ul>
            )}
          </div>

          {/* Email - Optional */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="flex items-center gap-2 text-sm font-medium text-rich-black-500"
            >
              <Mail className="h-4 w-4 text-oxford-blue-500" />
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter email address"
              className="h-11 border border-powder-blue-700/40 bg-white focus:border-oxford-blue-400 focus:ring-oxford-blue-400"
            />
            {!!formState.errors.email && (
              <ul className="space-y-1 text-sm text-red-500">
                {formState.errors.email.map((error: string, index: number) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Gender - Optional */}
          <div className="space-y-2">
            <Label
              htmlFor="gender"
              className="flex items-center gap-2 text-sm font-medium text-rich-black-500"
            >
              Gender
            </Label>
            <Select name="gender">
              <SelectTrigger className="w-full !h-11 bg-white border-gray-200 focus:border-powder-blue-500 focus:ring-powder-blue-500">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value={Gender.MALE}>Male</SelectItem>
                <SelectItem value={Gender.FEMALE}>Female</SelectItem>
                <SelectItem value={Gender.OTHER}>Other</SelectItem>
              </SelectContent>
            </Select>
            {!!formState.errors?.gender && (
              <ul className="space-y-1 text-sm text-red-500">
                {formState.errors?.gender.map(
                  (error: string, index: number) => (
                    <li key={index}>{error}</li>
                  )
                )}
              </ul>
            )}
          </div>
          {/* Contact Stage - Required with default */}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 h-12 bg-sunglow hover:bg-sunglow-600 text-rich-black font-semibold text-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg cursor-pointer"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating...
                </div>
              ) : (
                "Create Contact"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
