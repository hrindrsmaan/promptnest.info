"use client";

import { useState } from "react";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Sparkles, Zap, Target, BrainCircuit } from "lucide-react";

export default function HomePage() {
  const [prompt, setPrompt] = useState("");
  const [enhancedPrompt, setEnhancedPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState("");
  const [model, setModel] = useState("deepseek");

  const modelNames: Record<string, string> = {
    deepseek: "DeepSeek-V2",
    gpt: "OpenAI GPT-4",
    claude: "Anthropic Claude 3",
  };

  const handleEnhance = async () => {
    if (!prompt) {
      setError("Please enter a prompt to enhance.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setEnhancedPrompt("");
    setCopySuccess("");
    try {
      const response = await fetch("/api/enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, model }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to enhance.");
      if (data && data.enhanced) setEnhancedPrompt(data.enhanced);
      else throw new Error("No enhanced prompt returned.");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(
      () => {
        setCopySuccess("Copied!");
        setTimeout(() => setCopySuccess(""), 2000);
      },
      () => {
        setCopySuccess("Failed to copy.");
      }
    );
  };

  return (
    <>
      <Head>
        <title>
          Prompt Enhancer for ChatGPT, Claude AI, DeepSeek | Free AI Prompt
          Optimizer
        </title>
        <meta
          name="description"
          content="Upgrade your AI prompts instantly. Use our free prompt enhancer for ChatGPT, Claude AI, DeepSeek, and more. Get better results with AI prompt optimization, rewriting, and prompt engineering."
        />
        <meta
          name="keywords"
          content="prompt enhancer for ChatGPT, Claude AI prompt optimizer, DeepSeek prompt generator, free AI prompt rewriting tool, best prompt engineering app, prompt improvement for LLMs"
        />
      </Head>
      <main className="flex-1">
        <section
          className="container mx-auto px-4 md:px-8 py-12 md:py-20"
          id="enhancer"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
              Prompt Enhancer & Optimizer for LLMs
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl">
              Boost your prompt quality for ChatGPT, Claude, DeepSeek instantly.
            </p>
          </div>

          <Card className="max-w-4xl mx-auto bg-[#1c1c1e]">
            <CardHeader>
              <CardTitle>Enter Your Prompt</CardTitle>
              <CardDescription>
                Optimize and rewrite prompts for AI chatbots
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="E.g., Explain quantum computing to a 5-year-old"
                disabled={isLoading}
                rows={6}
              />
              <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="model-select">Choose AI Model</Label>
                  <Select value={model} onValueChange={setModel}>
                    <SelectTrigger id="model-select" className="w-[160px]">
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="deepseek">DeepSeek-V2</SelectItem>
                      <SelectItem value="gpt">OpenAI GPT-4</SelectItem>
                      <SelectItem value="claude">Anthropic Claude 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleEnhance} disabled={isLoading || !prompt}>
                  {isLoading ? (
                    "Enhancing..."
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" /> Enhance
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {enhancedPrompt && (
            <section className="mt-10 max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Here is your Enhanced Prompt</CardTitle>
                  <CardDescription>
                    Optimized using: <strong>{modelNames[model]}</strong>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-base font-semibold">
                      Original Prompt:
                    </Label>
                    <div className="bg-muted p-3 rounded-md mt-1 text-sm relative">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-2 right-2"
                        onClick={() => copyToClipboard(prompt)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <div className="pr-6 whitespace-pre-wrap">{prompt}</div>
                    </div>
                  </div>
                  <div>
                    <Label className="text-base font-semibold">
                      Enhanced Prompt:
                    </Label>
                    <div className="bg-background p-3 border rounded-md mt-1 text-sm relative">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-2 right-2"
                        onClick={() => copyToClipboard(enhancedPrompt)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <div className="pr-6 whitespace-pre-wrap">
                        {enhancedPrompt}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          )}

          {error && (
            <p className="text-sm text-red-500 text-center mt-6">{error}</p>
          )}
          {copySuccess && (
            <p className="text-sm text-green-600 text-center mt-2">
              {copySuccess}
            </p>
          )}
        </section>

        <section id="features" className="py-16 bg-muted/50">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-bold text-center mb-6">
              Why Use Prompt Engineering?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Feature
                icon={<Zap />}
                title="More Clarity"
                description="Add structure, context & examples automatically."
              />
              <Feature
                icon={<Target />}
                title="Better Accuracy"
                description="Avoid vague prompts and guide the AI better."
              />
              <Feature
                icon={<BrainCircuit />}
                title="Works with All Models"
                description="ChatGPT, Claude AI, DeepSeek and more supported."
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center p-4 bg-white dark:bg-secondary rounded-md shadow-sm">
      <div className="flex justify-center items-center mb-3 text-primary/80">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}
