import { Check, ChevronDown, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LANGUAGES, LANGUAGE_ORDER } from '@/config/languages';
import { useLanguage } from '@/hooks/use-language';
import { cn } from '@/lib/utils';

interface LanguagePickerProps {
  className?: string;
  compact?: boolean;
  onSelect?: () => void;
}

export function LanguagePicker({ className, compact = false, onSelect }: LanguagePickerProps) {
  const { currentLanguage, setLanguage } = useLanguage();

  const handleSelect = (langId: string) => {
    setLanguage(langId);
    onSelect?.();
  };

  const activeLanguage = currentLanguage ? LANGUAGES[currentLanguage] : null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'justify-between gap-2 bg-background/60 hover:bg-accent/10 text-left',
            compact ? 'h-9 px-3' : 'w-full',
            className,
          )}
        >
          <span className="flex min-w-0 items-center gap-2">
            <Languages className="h-4 w-4 shrink-0" />
            <span className="truncate text-sm font-medium">
              {activeLanguage ? `${activeLanguage.icon} ${activeLanguage.displayName}` : 'Select Language'}
            </span>
          </span>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        {LANGUAGE_ORDER.map((langId) => {
          const lang = LANGUAGES[langId];
          return (
            <DropdownMenuItem
              key={langId}
              onClick={() => handleSelect(langId)}
              className="cursor-pointer"
            >
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{lang.icon}</span>
                  <div>
                    <div className="text-sm font-medium">{lang.displayName}</div>
                    <div className="text-xs capitalize text-muted-foreground">{lang.difficulty}</div>
                  </div>
                </div>
                {currentLanguage === langId && <Check className="h-4 w-4 text-primary" />}
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
