"use client";

import { useState } from "react";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Sparkles, Zap, Target, BrainCircuit } from "lucide-react";

export default function HomePage() {
  const [prompt, setPrompt] = useState("");
  const [enhancedPrompt, setEnhancedPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState("");
  const [model, setModel] = useState("deepseek");

  const modelNames: { [key: string]: string } = {
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
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to enhance prompt.");
      }
      const data = await response.json();
      if (data && data.enhanced) {
        setEnhancedPrompt(data.enhanced);
      } else {
        throw new Error("API response did not contain an enhanced prompt.");
      }
    } catch (err) {
      let message: string;
      if (err instanceof Error) {
        message = err.message;
      } else if (typeof err === "string") {
        message = err;
      } else {
        message = "An unexpected error occurred.";
      }
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!enhancedPrompt) return;
    navigator.clipboard.writeText(enhancedPrompt).then(
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
        {/* Hero Section */}
        <section className="container mx-auto px-4 md:px-8 py-20 md:py-32 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
            Prompt Enhancer for ChatGPT, Claude AI & DeepSeek
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Instantly rewrite and optimize your prompts for{" "}
            <strong>ChatGPT</strong>, <strong>Claude AI</strong>, and more.
            Boost your results with our free{" "}
            <strong>AI prompt optimizer</strong> and expert prompt engineering.
          </p>
          <div className="mt-8">
            <a href="#enhancer">
              <Button size="lg" className="py-6 px-8 text-lg">
                <Sparkles className="mr-2 h-5 w-5" /> Try the Prompt Enhancer
                Now
              </Button>
            </a>
          </div>
        </section>

        <section id="features" className="py-20 md:py-24 bg-secondary/50">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
                Why Use an AI Prompt Optimizer?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-2">
                Enhance your prompts for <strong>ChatGPT</strong>,
                <strong>Claude AI</strong>, and other LLMs. Get more accurate,
                creative, and relevant AI responses.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="flex items-center justify-center mb-4 bg-blue-100 dark:bg-blue-900/50 rounded-full h-16 w-16 mx-auto">
                  <Zap className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Instant Clarity & Detail
                </h3>
                <p className="text-muted-foreground">
                  Our <strong>prompt enhancer for ChatGPT</strong> adds crucial
                  context, examples, and constraints to your prompts, removing
                  ambiguity and improving quality.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="flex items-center justify-center mb-4 bg-green-100 dark:bg-green-900/50 rounded-full h-16 w-16 mx-auto">
                  <Target className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Achieve Higher Accuracy
                </h3>
                <p className="text-muted-foreground">
                  Well-structured prompts lead to more relevant, accurate, and
                  creative responses from language models like Claude AI and
                  DeepSeek.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="flex items-center justify-center mb-4 bg-purple-100 dark:bg-purple-900/50 rounded-full h-16 w-16 mx-auto">
                  <BrainCircuit className="h-8 w-8 text-purple-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Advanced Prompt Engineering
                </h3>
                <p className="text-muted-foreground">
                  Leverage expert-level <strong>prompt engineering</strong>
                  techniques and optimize for any AI chatbot or LLM.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Enhancer Section */}
        <section
          id="enhancer"
          className="container mx-auto px-4 md:px-8 py-20 md:py-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Free Prompt Generator & Rewriter
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-2">
              Select your AI model and enter your prompt. Our
              <strong>prompt quality booster</strong> will do the rest!
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Original Prompt</CardTitle>
                <CardDescription>
                  Enter the prompt you want to improve.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., Write a product description for an AI-powered cat toy (prompt enhancer for ChatGPT, Claude AI, DeepSeek)"
                  disabled={isLoading}
                  rows={7}
                />
                <span className="text-xs text-muted-foreground">
                  Need ideas? Try: Summarize this article for Claude AI or
                  Generate SEO keywords for a tech blog (prompt optimizer for
                  LLMs)
                </span>
              </CardContent>
              <CardFooter className="justify-between items-end gap-4">
                <div className="grid gap-1.5">
                  <Label htmlFor="model-select">Model</Label>
                  <Select value={model} onValueChange={setModel}>
                    <SelectTrigger id="model-select" className="w-[180px]">
                      <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="deepseek">DeepSeek-V2</SelectItem>
                      <SelectItem value="gpt">OpenAI GPT-4</SelectItem>
                      <SelectItem value="claude">Anthropic Claude 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={handleEnhance}
                  disabled={isLoading || !prompt}
                  size="sm"
                  className="h-9 py-2 px-6"
                >
                  {isLoading ? (
                    "Enhancing..."
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" /> Enhance
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div className="grid gap-1">
                    <CardTitle>Enhanced via {modelNames[model]}</CardTitle>
                    <CardDescription>
                      The refined, high-quality prompt.
                    </CardDescription>
                  </div>
                  <Button
                    onClick={copyToClipboard}
                    variant="ghost"
                    size="icon"
                    disabled={!enhancedPrompt || isLoading}
                  >
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copy</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-2 p-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ) : (
                  <div className="prose prose-sm dark:prose-invert min-h-[190px] w-full rounded-md border border-transparent bg-transparent px-3 py-2 text-sm">
                    {enhancedPrompt || (
                      <span className="text-gray-400">
                        Your enhanced prompt will appear here...
                      </span>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          <div className="mt-6 text-center h-6">
            {error && (
              <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
            )}
            {copySuccess && (
              <p className="text-sm text-green-600 dark:text-green-500">
                {copySuccess}
              </p>
            )}
          </div>
        </section>

        {/* FAQ / SEO Content Section */}
        <section className="bg-muted/40 rounded-lg p-6 mt-10 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-2">
            Frequently Asked Questions
          </h2>
          <dl className="space-y-4 text-left">
            <div>
              <dt className="font-semibold">
                What is a prompt enhancer for ChatGPT?
              </dt>
              <dd>
                A prompt enhancer for ChatGPT is a tool that rewrites and
                optimizes your input to get better, more accurate results from
                ChatGPT and similar AI models.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">
                Can I use this prompt optimizer for Claude AI?
              </dt>
              <dd>
                Yes, our AI prompt optimizer supports Claude AI, DeepSeek, and
                OpenAI GPT models, making it easy to improve prompts for any
                popular chatbot.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Is this prompt enhancer free?</dt>
              <dd>
                Yes, you can use our free prompt enhancer and prompt rewriting
                tool for unlimited prompt improvements.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">
                What are the benefits of prompt engineering for LLMs?
              </dt>
              <dd>
                Prompt engineering helps you get more relevant, creative, and
                accurate responses from large language models like ChatGPT,
                Claude, and DeepSeek.
              </dd>
            </div>
          </dl>
        </section>
      </main>
    </>
  );
}
