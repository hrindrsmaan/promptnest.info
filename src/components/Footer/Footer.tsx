import { Github, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="py-6 md:px-8 md:py-0 border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by You. The source code is available on{" "}
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Twitter className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Github className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </footer>
  );
}
