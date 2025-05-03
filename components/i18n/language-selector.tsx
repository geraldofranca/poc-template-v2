"use client"

import { useLanguage } from "./language-context"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"

const flags = {
  en: "/flags/us.png",
  es: "/flags/es.png",
  pt: "/flags/br.png",
}

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 relative">
          <Image
            src={flags[language] || "/placeholder.svg"}
            alt={language}
            width={24}
            height={24}
            className="rounded-sm"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage("en")} className="cursor-pointer">
          <div className="flex items-center">
            <Image
              src={flags.en || "/placeholder.svg"}
              alt="English"
              width={20}
              height={20}
              className="mr-2 rounded-sm"
            />
            <span>{t.languages.en}</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("es")} className="cursor-pointer">
          <div className="flex items-center">
            <Image
              src={flags.es || "/placeholder.svg"}
              alt="Spanish"
              width={20}
              height={20}
              className="mr-2 rounded-sm"
            />
            <span>{t.languages.es}</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("pt")} className="cursor-pointer">
          <div className="flex items-center">
            <Image
              src={flags.pt || "/placeholder.svg"}
              alt="Portuguese"
              width={20}
              height={20}
              className="mr-2 rounded-sm"
            />
            <span>{t.languages.pt}</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
