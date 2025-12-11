"use client";

import { startTransition, useActionState, useState } from "react";
import { Loader2, User, Mail, Phone, ArrowLeft } from "lucide-react";
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
import Link from "next/link";

interface ContactCreateFormProps {
  organisationId: string;
}

export default function ContactCreateForm({
  organisationId,
}: ContactCreateFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    <Card className="bg-white rounded-2xl shadow-sm border border-slate-200">
      <CardHeader className="pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-oxford-blue flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-slate-900">
              Create New Contact
            </CardTitle>
            <p className="text-slate-500 text-sm mt-1">
              Add a new contact to your organization
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-700 font-medium">
              Name <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter contact name"
                required
                className="h-12 pl-11 bg-white border-slate-200 rounded-xl focus:border-oxford-blue focus:ring-oxford-blue/20"
              />
            </div>
            {!!formState.errors.name && (
              <ul className="text-sm text-red-500">
                {formState.errors.name.map((error: string, index: number) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="text-slate-700 font-medium">
              Phone Number <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                placeholder="Enter phone number"
                required
                className="h-12 pl-11 bg-white border-slate-200 rounded-xl focus:border-oxford-blue focus:ring-oxford-blue/20"
              />
            </div>
            {!!formState.errors.phoneNumber && (
              <ul className="text-sm text-red-500">
                {formState.errors.phoneNumber.map((error: string, index: number) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-700 font-medium">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter email address"
                className="h-12 pl-11 bg-white border-slate-200 rounded-xl focus:border-oxford-blue focus:ring-oxford-blue/20"
              />
            </div>
            {!!formState.errors.email && (
              <ul className="text-sm text-red-500">
                {formState.errors.email.map((error: string, index: number) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <Label htmlFor="gender" className="text-slate-700 font-medium">
              Gender
            </Label>
            <Select name="gender">
              <SelectTrigger className="h-12 bg-white border-slate-200 rounded-xl focus:border-oxford-blue focus:ring-oxford-blue/20">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent className="bg-white border-slate-200 rounded-xl">
                <SelectItem value={Gender.MALE}>Male</SelectItem>
                <SelectItem value={Gender.FEMALE}>Female</SelectItem>
                <SelectItem value={Gender.OTHER}>Other</SelectItem>
              </SelectContent>
            </Select>
            {!!formState.errors?.gender && (
              <ul className="text-sm text-red-500">
                {formState.errors?.gender.map((error: string, index: number) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Success/Error Message */}
          {formState.message && (
            <div
              className={`p-4 rounded-xl text-sm font-medium ${
                formState.success
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {formState.message}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <Link href="/contacts" className="flex-1">
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl font-semibold"
              >
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 h-12 bg-oxford-blue hover:bg-oxford-blue-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50"
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
