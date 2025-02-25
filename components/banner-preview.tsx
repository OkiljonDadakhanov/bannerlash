import { Github, Twitter } from "lucide-react";
import type { Technology } from "./tech-stack";
import Image from "next/image";

interface BannerPreviewProps {
  data: {
    name: string;
    title: string;
    twitter: string;
    github: string;
    stack: Technology[];
    image?: string;
    motto?: string; // Added motto field
  };
}

export function BannerPreview({ data }: BannerPreviewProps) {
  return (
    <div
      id="banner"
      className="w-full aspect-[1200/630] rounded-lg bg-gradient-to-br from-gray-900 to-gray-800 p-8 flex flex-col justify-between relative"
    >
      {/* Top Section: Name, Title, and Image */}
      <div className="flex items-start justify-between gap-6">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-white">
            {data.name || "Your Name"}
          </h2>
          <p className="text-xl text-gray-300">{data.title || "Your Title"}</p>
        </div>
        {data.image && (
          <div className="flex-shrink-0">
            <Image
              src={data.image}
              alt="Profile"
              width={100}
              height={100}
              className="rounded-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Center Section: Display Motto or Default Text */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="text-gray-400 text-lg italic">
          {data.motto
            ? `"${data.motto}"`
            : data.name
            ? `"${data.title || "Professional"} at work"`
            : "Your tagline here"}
        </p>
      </div>

      {/* Bottom Section: Social Links and Tech Stack */}
      <div className="flex flex-col gap-6 sm:flex-row sm:justify-between sm:items-start sm:mt-4">
        <div className="flex flex-wrap gap-4 mt-4 sm:mt-0">
          {data.twitter && (
            <div className="flex items-center gap-2 text-gray-300">
              <Twitter className="h-5 w-5" />
              <span>@{data.twitter}</span>
            </div>
          )}
          {data.github && (
            <div className="flex items-center gap-2 text-gray-300">
              <Github className="h-5 w-5" />
              <span>{data.github}</span>
            </div>
          )}
       
        </div>

        {data.stack.length > 0 && (
          <div className="flex flex-wrap gap-3 sm:mt-0 mt-4">
            {data.stack.map((tech) => (
              <Image
                key={tech.name}
                src={tech.icon}
                alt={tech.name}
                className="h-8 w-8"
                height={32}
                width={32}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}