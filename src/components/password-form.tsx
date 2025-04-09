"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import env from "@/env";
import { categoriesEnum } from "@/db/schema";
import { calculatePasswordStrength } from "@/lib/utils";
import formSchema from "@/schemas/add-password-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { MouseEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import CategoryDropdown from "./category-dropdown";
import CustomButton from "./custom-button";

export default function PasswordForm({ id }: { id: number | null }) {
  const categories = categoriesEnum.enumValues;
  const [value, setValue] = useState<(typeof categories)[number]>(
    categories[0],
  );
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const togglePasswordVisibility = (e: MouseEvent) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      url: "",
      username: "",
      password: "",
      note: "",
      category: value,
    },
  });

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    async function fetchPassword() {
      const response = await fetch(`${env.baseUrl}/api/passwords?id=${id}`);
      const { title, url, username, password, note, category } = (
        await response.json()
      ).password as TPassword;

      form.setValue("title", title);
      form.setValue("url", url);
      form.setValue("username", username);
      form.setValue("password", password);
      form.setValue("note", note);
      form.setValue("category", category);
      setLoading(false);
    }

    fetchPassword();
  }, [id, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { title, url, username, password, note, category } = values;
    const securityLevel = calculatePasswordStrength(password);

    if (id) {
      const response = await fetch(`${env.baseUrl}/api/passwords`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          title,
          url,
          username,
          password,
          note,
          category,
          security_level: securityLevel,
        }),
      });

      if (!response.ok) {
        toast.error("Failed to update password");
        return;
      }

      toast.success("Password updated successfully");
      router.push("/");
      return;
    }

    const response = await fetch(`${env.baseUrl}/api/passwords`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        url,
        username,
        password,
        note,
        category,
        security_level: securityLevel,
      }),
    });

    if (!response.ok) {
      toast.error("Failed to add password");
      return;
    }

    toast.success("Password added successfully");
    router.push("/");
  }

  if (loading) {
    return (
      <div className="flex-center">
        <LoaderCircle className="animate-spin size-11" />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="card !space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input className="capitalize" placeholder="Google" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <CategoryDropdown
                  value={field.value as (typeof categories)[number]}
                  onChange={(value) => {
                    setValue(value);
                    form.setValue("category", value);
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="https://google.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username / Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...field}
                  />
                </FormControl>
                <span className="size-6 absolute right-2 top-1/2 -translate-y-1/2">
                  <CustomButton
                    variant="ghost"
                    size="icon"
                    icon={showPassword ? <EyeOff /> : <Eye />}
                    tooltip={showPassword ? "Hide Password" : "Show Password"}
                    onClick={(e) => togglePasswordVisibility(e)}
                  />
                </span>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note</FormLabel>
              <FormControl>
                <Input placeholder="This is a note" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">{id === null ? "Add" : "Edit"} Password</Button>
      </form>
    </Form>
  );
}
