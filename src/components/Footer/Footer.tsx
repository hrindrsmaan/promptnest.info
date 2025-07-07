import { Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SiteFooter() {
  return (
    <footer className="py-6 md:px-8 md:py-0 border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left opacity-80">
          Created by Harinder Singh
        </p>
        <div className="flex items-center gap-2">
          <a
            href="https://www.linkedin.com/in/harindermaan/"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="ghost" size="icon">
              <Linkedin className="h-5 w-5 fill-current" />
            </Button>
          </a>
        </div>
      </div>
    </footer>
  );
}
