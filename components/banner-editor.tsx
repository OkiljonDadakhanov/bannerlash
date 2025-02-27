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
  motto?: string;
}

export function BannerEditor() {
  const [bannerData, setBannerData] = useState<BannerData>({
    name: "",
    title: "",
    twitter: "",
    github: "",
    stack: [],
    image: undefined,
    motto: "",
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
    <div className="flex flex-col gap-6 md:gap-8">
      {/* Preview Section - Shows at top on mobile */}
      <div className="order-1 md:order-2 w-full md:sticky md:top-4">
        <div className="overflow-hidden rounded-lg shadow-md">
          <BannerPreview data={bannerData} />
        </div>
      </div>

      {/* Form Section */}
      <div className="order-2 md:order-1 space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Left column */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Your name"
                value={bannerData.name}
                onChange={(e) => updateBannerData("name", e.target.value)}
                className="text-gray-900 bg-white border-gray-300"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Your professional title"
                value={bannerData.title}
                onChange={(e) => updateBannerData("title", e.target.value)}
                className="text-gray-900 bg-white border-gray-300"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="twitter">Twitter Username</Label>
              <Input
                id="twitter"
                placeholder="@username"
                value={bannerData.twitter}
                onChange={(e) => updateBannerData("twitter", e.target.value)}
                className="text-gray-900 bg-white border-gray-300"
              />
            </div>
          </div>
          
          {/* Right column */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="github">GitHub Username</Label>
              <Input
                id="github"
                placeholder="username"
                value={bannerData.github}
                onChange={(e) => updateBannerData("github", e.target.value)}
                className="text-gray-900 bg-white border-gray-300"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="motto">Favorite Motto/Quote</Label>
              <Input
                id="motto"
                placeholder="Enter your favorite motto or quote"
                value={bannerData.motto || ""}
                onChange={(e) => updateBannerData("motto", e.target.value)}
                className="text-gray-900 bg-white border-gray-300"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">Profile Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="text-gray-900 bg-white border-gray-300 text-sm"
              />
            </div>
          </div>
        </div>
        
        {/* Tech Stack - Full width */}
        <div className="pt-2">
          <TechStack
            selected={bannerData.stack}
            onChange={(stack) => updateBannerData("stack", stack)}
          />
        </div>
        
        {/* Download Button - Full width */}
        <Button 
          className="w-full mt-6" 
          size="lg" 
          onClick={handleDownload}
        >
          <Download className="mr-2 h-4 w-4" />
          Download Banner
        </Button>
      </div>
    </div>
  );
}