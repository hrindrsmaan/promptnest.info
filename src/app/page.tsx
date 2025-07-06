"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Copy,
  Wand2,
  Sparkles,
  Linkedin,
  Github,
  ExternalLink,
} from "lucide-react";

export default function PromptEnhancer() {
  const [originalPrompt, setOriginalPrompt] = useState("");
  const [enhancedPrompt, setEnhancedPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const enhancePrompt = async () => {
    if (!originalPrompt.trim()) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/enhance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: originalPrompt,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to enhance prompt");
      }

      setEnhancedPrompt(data.enhanced);
    } catch (err) {
      console.error("Enhancement failed:", err);
      setError(err instanceof Error ? err.message : "Failed to enhance prompt");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-700 bg-[#1a1a1a]/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-8 w-8 text-orange-500" />
                <h1 className="text-xl font-bold text-white">
                  Prompt Enhancer
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400 hidden md:block">
                Powered by DeepSeek
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Hero Section */}
          <div className="text-center py-8">
            <h2 className="text-3xl font-bold text-white mb-3">
              Transform Your Prompts
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Transform basic prompts into detailed, effective instructions that
              get better AI responses
            </p>
          </div>

          {/* Input Textarea */}
          <div className="space-y-4">
            <Textarea
              placeholder="Enter your prompt here..."
              value={originalPrompt}
              onChange={(e) => setOriginalPrompt(e.target.value)}
              className="min-h-[150px] text-base resize-none bg-[#2d2d2d] border-gray-600 text-white placeholder:text-gray-500 focus:border-orange-400 focus:ring-orange-400"
            />

            <div className="flex flex-col items-center gap-2">
              <Button
                onClick={enhancePrompt}
                disabled={isLoading || !originalPrompt.trim()}
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 disabled:bg-gray-600 disabled:text-gray-400"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Enhancing...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4 mr-2" />
                    Enhance Prompt
                  </>
                )}
              </Button>

              {error && <p className="text-red-400 text-sm">{error}</p>}
            </div>
          </div>

          {/* Enhanced Output */}
          {enhancedPrompt && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                  Enhanced
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(enhancedPrompt)}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white h-8 px-3"
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </Button>
              </div>

              <Textarea
                value={enhancedPrompt}
                readOnly
                className="min-h-[150px] text-base resize-none bg-[#2d2d2d] border-gray-600 text-white focus:ring-0 focus:border-gray-600"
              />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-700 bg-[#1a1a1a]/95 backdrop-blur-sm mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-400">
              <span className="text-sm">Built by</span>
              <a
                href="https://www.linkedin.com/in/harindermaan/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors font-medium"
              >
                <Linkedin className="h-4 w-4" />
                Harinder Singh
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
