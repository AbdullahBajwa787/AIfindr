import { moreTools } from "@/lib/more-tools";

export type Tool = {
  slug: string;
  name: string;
  category: string;
  description: string;
  price: "Free" | "Freemium" | "Paid" | "Check pricing";
  icon: string;
  color: string;
  featured?: boolean;
  website: string;
  tags: string[];
};

const originalTools: Tool[] = [
  { slug: "chatgpt", name: "ChatGPT", category: "Writing", description: "Your curious, capable AI partner for ideas, writing, and everyday questions.", price: "Freemium", icon: "✳", color: "mint", featured: true, website: "https://chatgpt.com", tags: ["Assistant", "Writing", "Research"] },
  { slug: "midjourney", name: "Midjourney", category: "Image generation", description: "Turn the image in your imagination into a beautiful visual.", price: "Paid", icon: "◉", color: "pink", featured: true, website: "https://midjourney.com", tags: ["Art", "Design", "Images"] },
  { slug: "perplexity", name: "Perplexity", category: "Research", description: "A smarter way to find answers, with sources you can follow.", price: "Freemium", icon: "◈", color: "blue", featured: true, website: "https://perplexity.ai", tags: ["Search", "Research", "Answers"] },
  { slug: "notion-ai", name: "Notion AI", category: "Productivity", description: "A helpful teammate tucked right inside your workspace.", price: "Freemium", icon: "N", color: "cream", website: "https://notion.so/product/ai", tags: ["Notes", "Writing", "Work"] },
  { slug: "elevenlabs", name: "ElevenLabs", category: "Audio", description: "Create natural-sounding voices, narration, and audio experiences.", price: "Freemium", icon: "≋", color: "orange", website: "https://elevenlabs.io", tags: ["Voice", "Audio", "Text to speech"] },
  { slug: "cursor", name: "Cursor", category: "Coding", description: "A code editor designed to make building with AI feel natural.", price: "Freemium", icon: "⌘", color: "cream", website: "https://cursor.com", tags: ["Code", "Developer", "Editor"] },
  { slug: "runway", name: "Runway", category: "Video", description: "Bring your stories to life with a new generation of creative tools.", price: "Freemium", icon: "▰", color: "violet", website: "https://runwayml.com", tags: ["Video", "Creative", "Generative"] },
  { slug: "canva-magic", name: "Canva Magic Studio", category: "Design", description: "Make polished designs and get past the blank canvas, faster.", price: "Freemium", icon: "C", color: "blue", website: "https://canva.com/magic", tags: ["Design", "Presentations", "Images"] },
  { slug: "grammarly", name: "Grammarly", category: "Writing", description: "Make your writing clearer, more confident, and more you.", price: "Freemium", icon: "G", color: "mint", website: "https://grammarly.com", tags: ["Writing", "Editing", "Work"] },
  { slug: "suno", name: "Suno", category: "Audio", description: "Make a song from a spark of an idea, no instruments required.", price: "Freemium", icon: "♫", color: "orange", website: "https://suno.com", tags: ["Music", "Audio", "Creative"] },
  { slug: "github-copilot", name: "GitHub Copilot", category: "Coding", description: "An AI pair programmer that helps you focus on the fun parts.", price: "Paid", icon: "⌘", color: "violet", website: "https://github.com/features/copilot", tags: ["Code", "Developer", "Productivity"] },
  { slug: "ideogram", name: "Ideogram", category: "Image generation", description: "Explore creative images with typography that actually reads.", price: "Freemium", icon: "✺", color: "pink", website: "https://ideogram.ai", tags: ["Images", "Design", "Typography"] },
];

export const tools: Tool[] = [...originalTools, ...moreTools];

export const categories = ["All tools", ...Array.from(new Set(tools.map((tool) => tool.category)))];
