import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";

export interface Technology {
  name: string;
  icon: string;
  size: number;
}

export const technologies: Technology[] = [
  {
    name: "HTML",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    size: 32,
  },
  {
    name: "CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    size: 32,
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    size: 32,
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    size: 32,
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    size: 32,
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    size: 32,
  },
  {
    name: "R",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg",
    size: 32,
  },
  {
    name: "Rust",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg",
    size: 32,
  },
  {
    name: "Dart",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
    size: 32,
  },
  {
    name: "Flutter",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
    size: 32,
  },
  {
    name: "C++",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    size: 32,
  },
  {
    name: "Java",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    size: 32,
  },
  {
    name: "C",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
    size: 32,
  },
  {
    name: "C#",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
    size: 32,
  },
  {
    name: "PHP",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    size: 32,
  },
  {
    name: "Swift",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
    size: 32,
  },
  {
    name: "Ruby",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg",
    size: 32,
  },
  {
    name: "Kotlin",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
    size: 32,
  },
  {
    name: "Perl",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/perl/perl-original.svg",
    size: 32,
  },
  {
    name: "Lua",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/lua/lua-original.svg",
    size: 32,
  },
  {
    name: "Objective-C",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/objectivec/objectivec-plain.svg",
    size: 32,
  },
  {
    name: "Scala",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scala/scala-original.svg",
    size: 32,
  },
  {
    name: "Haskell",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/haskell/haskell-original.svg",
    size: 32,
  },
  {
    name: "Elixir",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elixir/elixir-original.svg",
    size: 32,
  },
  {
    name: "Julia",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/julia/julia-original.svg",
    size: 32,
  },
  {
    name: "F#",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fsharp/fsharp-original.svg",
    size: 32,
  },
  {
    name: "Solidity",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg",
    size: 32,
  },
];

interface TechStackProps {
  selected: Technology[];
  onChange: (stack: Technology[]) => void;
}

export function TechStack({ selected, onChange }: TechStackProps) {
  const [search, setSearch] = useState("");
  const [filteredTech, setFilteredTech] = useState(technologies);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    setFilteredTech(
      technologies.filter((tech) =>
        tech.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const toggleTech = (tech: Technology) => {
    const isSelected = selected.some((t) => t.name === tech.name);
    if (isSelected) {
      onChange(selected.filter((t) => t.name !== tech.name));
    } else if (selected.length < 5) {
      onChange([...selected, tech]);
    }
  };

  return (
    <div className="space-y-4">
      <Label className="text-lg font-medium text-white">Tech Stack</Label>
      <div className="flex flex-wrap gap-2">
        {selected.map((tech) => (
          <div
            key={tech.name}
            className="flex items-center gap-2 bg-purple-600 text-white px-3 py-1 rounded-full"
          >
            <Image
              src={tech.icon}
              alt={tech.name}
              width={20}
              height={20}
              className="rounded-full"
            />
            <span>{tech.name}</span>
            <button
              onClick={() => toggleTech(tech)}
              className="text-red-400 hover:text-red-500"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search technologies..."
        className="w-full p-2 rounded-md bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <div className="max-h-40 overflow-y-auto space-y-2">
        {filteredTech.map((tech) => {
          const isSelected = selected.some((t) => t.name === tech.name);
          return (
            <button
              key={tech.name}
              onClick={() => toggleTech(tech)}
              className={`flex items-center gap-2 w-full p-2 rounded-lg transition-colors ${
                isSelected
                  ? "bg-purple-500 bg-opacity-20"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
              disabled={selected.length >= 5 && !isSelected}
            >
              <Image
                src={tech.icon}
                alt={tech.name}
                width={tech.size}
                height={tech.size}
              />
              <span className="text-white">{tech.name}</span>
            </button>
          );
        })}
      </div>
      {selected.length >= 5 && (
        <p className="text-sm text-red-500">
          You can select up to 5 technologies only.
        </p>
      )}
    </div>
  );
}
