import { Link } from 'wouter';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Code2 } from 'lucide-react';
import { getTermDefinition, type TermDefinition } from '@/data/term-definitions-multi';
import { useLanguage } from '@/hooks/use-language';
import { DEFAULT_LANGUAGE } from '@/config/languages';

interface ConceptLinkProps {
  term: string;
  slug?: string;
  children?: React.ReactNode;
}

export function ConceptLink({ term, slug, children }: ConceptLinkProps) {
  const { currentLanguage } = useLanguage();
  const conceptSlug = slug || term.toLowerCase().replace(/\s+/g, '-');
  const displayText = children || term;
  
  // Get embedded definition for current language
  const definition = getTermDefinition(term, currentLanguage || DEFAULT_LANGUAGE);

  if (!definition) {
    // Simple link without hover preview
    return (
      <Link href={`/glossary/${conceptSlug}`}>
        <span className="text-primary underline decoration-dotted underline-offset-2 hover:decoration-solid cursor-pointer font-medium transition-colors">
          {displayText}
        </span>
      </Link>
    );
  }

  return (
    <HoverCard openDelay={150} closeDelay={100}>
      <HoverCardTrigger asChild>
        <Link href={`/glossary/${definition.slug}`}>
          <span className="text-primary underline decoration-dotted underline-offset-2 hover:decoration-solid cursor-pointer font-medium transition-all hover:text-primary/80 hover:bg-primary/5 px-0.5 rounded">
            {displayText}
          </span>
        </Link>
      </HoverCardTrigger>
      <HoverCardContent className="w-96 p-4" side="top" align="start">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-bold text-lg text-foreground">{definition.term}</h4>
            <Badge variant="secondary" className="text-xs whitespace-nowrap">
              {definition.category}
            </Badge>
          </div>
          
          {/* Definition */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {definition.shortDefinition}
          </p>
          
          {/* Code Example */}
          {definition.example && (
            <div className="bg-zinc-900 rounded-md p-3 border border-zinc-800">
              <div className="flex items-center gap-1 text-xs text-zinc-500 mb-2">
                <Code2 className="w-3 h-3" />
                <span>Example:</span>
              </div>
              <pre className="text-xs text-green-400 font-mono overflow-x-auto">
                {definition.example}
              </pre>
            </div>
          )}
          
          {/* Related Terms */}
          {definition.relatedTerms && definition.relatedTerms.length > 0 && (
            <div className="pt-2 border-t border-border">
              <div className="text-xs text-muted-foreground mb-2">Related:</div>
              <div className="flex flex-wrap gap-1">
                {definition.relatedTerms.slice(0, 4).map(related => (
                  <Link key={related} href={`/glossary/${related}`}>
                    <Badge 
                      variant="outline" 
                      className="text-xs cursor-pointer hover:bg-primary/10 transition-colors"
                    >
                      {related}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          {/* Learn More */}
          <div className="flex items-center gap-1 text-xs text-primary pt-2 border-t border-border font-medium">
            <BookOpen className="w-3 h-3" />
            <span>Click to learn more in glossary →</span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

// Helper function to automatically linkify keywords in HTML text (language-aware)
export function linkifyContent(htmlText: string, language: string = 'cpp'): string {
  // Get keywords based on language
  const keywordsByLang: Record<string, string[]> = {
    cpp: [
      'polymorphism', 'encapsulation', 'inheritance', 'constructor', 'destructor',
      'pointers', 'pointer', 'references', 'reference', 'namespace', 'template',
      'templates', 'operator', 'operators', 'variable', 'variables', 'function',
      'functions', 'nullptr', 'virtual', 'override', 'classes', 'class', 'objects',
      'object', 'vectors', 'vector', 'arrays', 'array', 'string', 'struct',
      'const', 'static', 'double', 'float', 'char', 'bool', 'void', 'endl',
      'cout', 'cin', 'std', 'for', 'while', 'switch', 'return', 'loop', 'loops',
      'map', 'set', 'int', 'new', 'delete', 'if'
    ],
    python: [
      'variable', 'variables', 'function', 'functions', 'class', 'classes',
      'list', 'lists', 'dictionary', 'dictionaries', 'tuple', 'tuples',
      'for', 'while', 'if', 'elif', 'else', 'def', 'return', 'import',
      'self', 'loop', 'loops', 'object', 'objects', 'method', 'methods'
    ],
    java: [
      'class', 'classes', 'method', 'methods', 'variable', 'variables',
      'array', 'arrays', 'interface', 'interfaces', 'public', 'private',
      'static', 'void', 'int', 'string', 'object', 'objects', 'for', 'while',
      'if', 'else', 'return', 'new', 'extends', 'implements'
    ],
    javascript: [
      'variable', 'variables', 'function', 'functions', 'arrow function',
      'array', 'arrays', 'object', 'objects', 'const', 'let', 'var',
      'promise', 'promises', 'async', 'await', 'for', 'while', 'if',
      'return', 'class', 'classes', 'method', 'methods'
    ],
    typescript: [
      'type', 'types', 'interface', 'interfaces', 'class', 'classes',
      'generic', 'generics', 'enum', 'enums', 'union', 'any', 'const',
      'let', 'var', 'function', 'functions', 'array', 'arrays',
      'for', 'while', 'if', 'return', 'async', 'await'
    ]
  };
  
  const keywords = (keywordsByLang[language] || keywordsByLang.cpp)
    .sort((a, b) => b.length - a.length);

  let result = htmlText;
  
  // Track which positions we've already linkified to avoid nested links
  const linkifiedRanges: Array<{start: number, end: number}> = [];
  
  keywords.forEach((keyword) => {
    // Match whole words only, case-insensitive, not inside HTML tags or existing links
    const regex = new RegExp(`\\b(${keyword})\\b(?![^<]*>)(?![^<]*<\\/a>)`, 'gi');
    let match;
    
    // Find all matches first
    const matches: Array<{index: number, match: string}> = [];
    while ((match = regex.exec(result)) !== null) {
      matches.push({ index: match.index, match: match[0] });
    }
    
    // Apply replacements in reverse order to maintain indices
    matches.reverse().forEach(({ index, match }) => {
      // Check if this position is already linkified
      const alreadyLinkified = linkifiedRanges.some(
        range => index >= range.start && index <= range.end
      );
      
      if (!alreadyLinkified) {
        const slug = keyword.toLowerCase().replace(/\s+/g, '-');
        const replacement = `<a href="/glossary/${slug}" class="text-primary underline decoration-dotted underline-offset-2 hover:decoration-solid font-medium transition-colors hover:bg-primary/5 px-0.5 rounded" data-concept="${keyword}">${match}</a>`;
        
        result = result.substring(0, index) + replacement + result.substring(index + match.length);
        
        // Mark this range as linkified
        linkifiedRanges.push({
          start: index,
          end: index + replacement.length
        });
      }
    });
  });

  return result;
}
