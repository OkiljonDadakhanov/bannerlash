import { Github, Twitter, Linkedin } from "lucide-react";
import type { Technology } from "./tech-stack";
import Image from "next/image";

interface BannerPreviewProps {
  data: {
    name: string;
    title: string;
    twitter: string;
    github: string;
    linkedin: string;
    stack: Technology[];
  };
}

export function BannerPreview({ data }: BannerPreviewProps) {
  return (
    <div
      id="banner"
      className="w-full aspect-[1200/630] rounded-lg bg-gradient-to-br from-gray-900 to-gray-800 p-8 flex flex-col justify-between"
    >
      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-white">
          {data.name || "Your Name"}
        </h2>
        <p className="text-xl text-gray-300">{data.title || "Your Title"}</p>
      </div>
      <div className="flex justify-between items-end">
        <div className="flex gap-4">
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

          {data.linkedin && (
            <div className="flex items-center gap-2 text-gray-300">
              <Linkedin className="h-5 w-5" />
              <span>{data.linkedin}</span>
            </div>
          )}
        </div>
        {data.stack.length > 0 && (
          <div className="flex gap-3">
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
