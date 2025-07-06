import React from "react";
import { Sparkles } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-gray-700 bg-[#1a1a1a]/95 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-8 w-8 text-orange-500" />
              <h1 className="text-xl font-bold text-white">Prompt Enhancer</h1>
            </div>
            <span className="hidden sm:block text-sm text-gray-400 border-l border-gray-600 pl-3 ml-3">
              AI-Powered Prompt Enhancement
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400 hidden md:block">
              Powered by DeepSeek
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
