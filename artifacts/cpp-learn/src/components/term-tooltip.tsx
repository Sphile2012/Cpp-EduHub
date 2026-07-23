import { useState } from 'react';
import { Book, ExternalLink } from 'lucide-react';
import { Link } from 'wouter';
import { cn } from '@/lib/utils';
import { getTermDefinition } from '@/data/term-definitions';
import { SimpleSyntaxHighlighter } from './ui/syntax-highlighter';

interface TermTooltipProps {
  term: string;
  children: React.ReactNode;
  className?: string;
}

export function TermTooltip({ term, children, className }: TermTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const definition = getTermDefinition(term);

  if (!definition) {
    return <>{children}</>;
  }

  return (
    <span className="relative inline-block">
      {/* Trigger */}
      <button
        className={cn(
          "text-primary underline decoration-dotted underline-offset-4 hover:decoration-solid cursor-help transition-all",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded",
          className
        )}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        aria-label={`Definition of ${definition.name}`}
      >
        {children}
      </button>

      {/* Tooltip */}
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <div 
            className="fixed inset-0 z-40 md:hidden bg-black/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Popover */}
          <div
            className={cn(
              "absolute z-50 w-96 max-w-[calc(100vw-2rem)]",
              "left-1/2 -translate-x-1/2 top-full mt-2",
              "md:left-0 md:translate-x-0",
              "bg-card border border-border rounded-lg shadow-2xl",
              "p-4 space-y-3 animate-in fade-in-0 zoom-in-95 duration-200"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="font-mono font-bold text-lg text-primary">
                  {definition.name}
                </h4>
                <p className="text-xs text-muted-foreground capitalize">
                  {definition.category}
                </p>
              </div>
              <Link 
                href={`/glossary/${definition.glossarySlug}`}
                className="flex items-center gap-1 text-xs text-primary hover:underline"
                onClick={() => setIsOpen(false)}
              >
                <Book className="w-3 h-3" />
                <span>Learn More</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>

            {/* Definition */}
            <p className="text-sm text-foreground leading-relaxed">
              {definition.shortDefinition}
            </p>

            {/* Code Example */}
            {definition.example && (
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Example:
                </p>
                <div className="rounded overflow-hidden border border-border">
                  <SimpleSyntaxHighlighter code={definition.example} />
                </div>
              </div>
            )}

            {/* Related Terms */}
            {definition.relatedTerms && definition.relatedTerms.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Related:
                </p>
                <div className="flex flex-wrap gap-2">
                  {definition.relatedTerms.slice(0, 5).map((relatedTerm) => (
                    <TermTooltip key={relatedTerm} term={relatedTerm}>
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-primary/10 text-xs font-mono text-primary hover:bg-primary/20 transition-colors">
                        {relatedTerm}
                      </span>
                    </TermTooltip>
                  ))}
                </div>
              </div>
            )}

            {/* Mobile Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="md:hidden w-full mt-2 py-2 text-xs text-center text-muted-foreground hover:text-foreground border-t border-border"
            >
              Close
            </button>
          </div>
        </>
      )}
    </span>
  );
}

/**
 * Auto-linkify C++ terms in text content
 */
export function linkifyTerms(text: string): React.ReactNode {
  if (!text) return text;

  const terms = [
    'vector', 'pointer', 'reference', 'class', 'object', 'function', 'template',
    'namespace', 'const', 'auto', 'new', 'delete', 'nullptr', 'int', 'double',
    'char', 'bool', 'string', 'array', 'map', 'set', 'iterator', 'algorithm',
    'stl', 'for', 'while', 'if', 'else', 'switch', 'break', 'continue',
    'return', 'void', 'public', 'private', 'protected', 'virtual', 'override',
    'constructor', 'destructor', 'inheritance', 'polymorphism', 'stack', 'heap'
  ];

  // Create regex pattern that matches whole words only
  const pattern = new RegExp(`\\b(${terms.join('|')})\\b`, 'gi');
  
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    // Add text before match
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    // Add linked term
    const term = match[0];
    parts.push(
      <TermTooltip key={`${term}-${match.index}`} term={term.toLowerCase()}>
        <span>{term}</span>
      </TermTooltip>
    );

    lastIndex = match.index + term.length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}
