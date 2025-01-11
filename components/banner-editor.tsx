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

  const handleDownload = async () => {
    const banner = document.getElementById("banner");
    if (!banner) return;

    // Use html-to-image library to convert the banner to an image
    try {
      const dataUrl = await import("html-to-image").then((mod) =>
        mod.toPng(banner)
      );
      const link = document.createElement("a");
      link.download = "banneringiz.png";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error generating banner:", error);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Your name"
            value={bannerData.name}
            onChange={(e) =>
              setBannerData({ ...bannerData, name: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Your professional title"
            value={bannerData.title}
            onChange={(e) =>
              setBannerData({ ...bannerData, title: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="twitter">Twitter Username</Label>
          <Input
            id="twitter"
            placeholder="@username"
            value={bannerData.twitter}
            onChange={(e) =>
              setBannerData({ ...bannerData, twitter: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="github">GitHub Username</Label>
          <Input
            id="github"
            placeholder="username"
            value={bannerData.github}
            onChange={(e) =>
              setBannerData({ ...bannerData, github: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="github">LinkedIn</Label>
          <Input
            id="linkedin"
            placeholder="username"
            value={bannerData.linkedin}
            onChange={(e) =>
              setBannerData({ ...bannerData, linkedin: e.target.value })
            }
          />
        </div>
        <TechStack
          selected={bannerData.stack}
          onChange={(stack) => setBannerData({ ...bannerData, stack })}
        />
        <Button className="w-full" size="lg" onClick={handleDownload}>
          <Download className="mr-2 h-4 w-4" />
          Download Banner
        </Button>
      </div>
      <div className="relative">
        <BannerPreview data={bannerData} />
      </div>
    </div>
  );
}
