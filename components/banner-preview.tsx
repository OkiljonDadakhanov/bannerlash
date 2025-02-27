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
    motto?: string;
  };
}

export function BannerPreview({ data }: BannerPreviewProps) {
  return (
    <div
      id="banner"
      className="w-full mx-auto md:max-w-3xl lg:max-w-4xl aspect-[1200/630] rounded-lg bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-8 flex flex-col justify-between relative"
    >
      {/* Top Section: Name, Title, and Image */}
      <div className="flex flex-row items-start justify-between gap-4">
        <div className="text-left space-y-2 sm:space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            {data.name || "Your Name"}
          </h2>
          <p className="text-lg sm:text-xl text-gray-300">{data.title || "Your Title"}</p>
        </div>
        {data.image && (
          <div className="flex-shrink-0">
            <Image
              src={data.image}
              alt="Profile"
              width={80}
              height={80}
              className="rounded-full object-cover sm:w-24 sm:h-24 md:w-24 md:h-24 w-20 h-20"
            />
          </div>
        )}
      </div>

      {/* Center Section: Display Motto */}
      <div className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-4 pointer-events-none">
        <p className="text-gray-400 text-base sm:text-lg md:text-lg italic">
          {data.motto ? `"${data.motto}"` : "Your motto/quote here"}
        </p>
      </div>

      {/* Bottom Section: Social Links and Tech Stack */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
        <div className="flex flex-wrap justify-center sm:justify-start gap-3">
          {data.twitter && (
            <div className="flex items-center gap-2 text-gray-300 text-sm sm:text-base">
              <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>@{data.twitter}</span>
            </div>
          )}
          {data.github && (
            <div className="flex items-center gap-2 text-gray-300 text-sm sm:text-base">
              <Github className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>{data.github}</span>
            </div>
          )}
        </div>

        {data.stack.length > 0 && (
          <div className="flex flex-wrap justify-center sm:justify-end gap-2 sm:gap-3">
            {data.stack.map((tech) => (
              <Image
                key={tech.name}
                src={tech.icon}
                alt={tech.name}
                className="h-6 w-6 sm:h-8 sm:w-8"
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