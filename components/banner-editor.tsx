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
  linkedin: string;
  stack: Technology[];
}

export function BannerEditor() {
  const [bannerData, setBannerData] = useState<BannerData>({
    name: "",
    title: "",
    twitter: "",
    github: "",
    linkedin: "",
    stack: [],
  });

  const updateBannerData = (
    field: keyof BannerData,
    value: string | Technology[]
  ) => {
    setBannerData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDownload = async () => {
    const banner = document.getElementById("banner");
    if (!banner) return;

    try {
      const { toBlob } = await import("html-to-image");

      // Convert the banner to a Blob
      const blob = await toBlob(banner, {
        cacheBust: true, // Prevents caching issues
        width: banner.offsetWidth, // Proper width
        height: banner.offsetHeight, // Proper height
      });

      if (!blob) {
        console.error("Failed to generate the image as a blob");
        return;
      }

      // Create a temporary link to download the file
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);

      link.href = url;
      link.download = "banneringiz.png";
      link.style.display = "none"; // Keep it hidden
      document.body.appendChild(link);

      link.click(); // Trigger download

      // Clean up the URL object and link
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
            label: "LinkedIn",
            id: "linkedin",
            placeholder: "username",
            value: bannerData.linkedin,
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
            />
          </div>
        ))}
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
