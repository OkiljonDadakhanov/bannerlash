"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BannerPreview } from "./banner-preview";
import { TechStack, type Technology } from "./tech-stack";


interface BannerData {
  name: string;
  title: string;
  twitter: string;
  github: string;
  stack: Technology[];
  image?: string;
  motto?: string; // Added motto field
}

export function BannerEditor() {
  const [bannerData, setBannerData] = useState<BannerData>({
    name: "",
    title: "",
    twitter: "",
    github: "",
    stack: [],
    image: undefined,
    motto: "", // Initialize motto
  });

  const updateBannerData = (
    field: keyof BannerData,
    value: string | Technology[]
  ) => {
    setBannerData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateBannerData("image", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = async () => {
    const banner = document.getElementById("banner");
    if (!banner) return;

    try {
      const { toBlob } = await import("html-to-image");

      const blob = await toBlob(banner, {
        cacheBust: true,
        width: banner.offsetWidth,
        height: banner.offsetHeight,
      });

      if (!blob) {
        console.error("Failed to generate the image as a blob");
        return;
      }

      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);

      link.href = url;
      link.download = "banneringiz.png";
      link.style.display = "none";
      document.body.appendChild(link);

      link.click();

      URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating banner:", error);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Form Section */}
      <div className="space-y-6">
        {[
          {
            label: "Name",
            id: "name",
            placeholder: "Your name",
            value: bannerData.name,
          },
          {
            label: "Title",
            id: "title",
            placeholder: "Your professional title",
            value: bannerData.title,
          },
          {
            label: "Twitter Username",
            id: "twitter",
            placeholder: "@username",
            value: bannerData.twitter,
          },
          {
            label: "GitHub Username",
            id: "github",
            placeholder: "username",
            value: bannerData.github,
          },
         
          {
            label: "Favorite Motto/Quote",
            id: "motto",
            placeholder: "Enter your favorite motto or quote",
            value: bannerData.motto || "",
          },
        ].map(({ label, id, placeholder, value }) => (
          <div className="space-y-2" key={id}>
            <Label htmlFor={id}>{label}</Label>
            <Input
              id={id}
              placeholder={placeholder}
              value={value}
              onChange={(e) =>
                updateBannerData(id as keyof BannerData, e.target.value)
              }
              className="text-gray-900 bg-white border-gray-300"
            />
          </div>
        ))}
        {/* Image Upload Input */}
        <div className="space-y-2">
          <Label htmlFor="image">Profile Image</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="text-gray-900 bg-white border-gray-300"
          />
        </div>
        <TechStack
          selected={bannerData.stack}
          onChange={(stack) => updateBannerData("stack", stack)}
        />
        <Button className="w-full" size="lg" onClick={handleDownload}>
          <Download className="mr-2 h-4 w-4" />
          Download Banner
        </Button>
      </div>

      {/* Preview Section */}
      <div className="relative">
        <BannerPreview data={bannerData} />
      </div>
    </div>
  );
}