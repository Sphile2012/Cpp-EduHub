import { Link } from 'wouter';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Badge } from '@/components/ui/badge';
import { BookOpen } from 'lucide-react';

interface ConceptLinkProps {
  term: string;
  slug?: string;
  preview?: {
    definition: string;
    category: string;
  };
  children?: React.ReactNode;
}

export function ConceptLink({ term, slug, preview, children }: ConceptLinkProps) {
  const conceptSlug = slug || term.toLowerCase().replace(/\s+/g, '-');
  const displayText = children || term;

  if (!preview) {
    // Simple link without hover preview
    return (
      <Link href={`/glossary/${conceptSlug}`}>
        <span className="text-primary underline decoration-dotted underline-offset-2 hover:decoration-solid cursor-pointer font-medium">
          {displayText}
        </span>
      </Link>
    );
  }

  return (
    <HoverCard openDelay={200}>
      <HoverCardTrigger asChild>
        <Link href={`/glossary/${conceptSlug}`}>
          <span className="text-primary underline decoration-dotted underline-offset-2 hover:decoration-solid cursor-pointer font-medium transition-all hover:text-primary/80">
            {displayText}
          </span>
        </Link>
      </HoverCardTrigger>
      <HoverCardContent className="w-80" side="top">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-bold text-lg">{term}</h4>
            <Badge variant="secondary" className="text-xs">
              {preview.category}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {preview.definition}
          </p>
          <div className="flex items-center gap-1 text-xs text-primary pt-2">
            <BookOpen className="w-3 h-3" />
            <span>Click to learn more</span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

// Helper function to automatically linkify C++ keywords in text
// This version returns HTML string for use with dangerouslySetInnerHTML
export function linkifyContent(htmlText: string): string {
  // Common C++ keywords and concepts to linkify
  const concepts = [
    { term: 'pointer', category: 'Memory' },
    { term: 'pointers', category: 'Memory' },
    { term: 'reference', category: 'Memory' },
    { term: 'references', category: 'Memory' },
    { term: 'class', category: 'OOP' },
    { term: 'classes', category: 'OOP' },
    { term: 'object', category: 'OOP' },
    { term: 'objects', category: 'OOP' },
    { term: 'constructor', category: 'OOP' },
    { term: 'destructor', category: 'OOP' },
    { term: 'inheritance', category: 'OOP' },
    { term: 'polymorphism', category: 'OOP' },
    { term: 'encapsulation', category: 'OOP' },
    { term: 'abstraction', category: 'OOP' },
    { term: 'function', category: 'Functions' },
    { term: 'functions', category: 'Functions' },
    { term: 'array', category: 'Data Structures' },
    { term: 'arrays', category: 'Data Structures' },
    { term: 'vector', category: 'STL' },
    { term: 'vectors', category: 'STL' },
    { term: 'loop', category: 'Control Flow' },
    { term: 'loops', category: 'Control Flow' },
    { term: 'variable', category: 'Basics' },
    { term: 'variables', category: 'Basics' },
    { term: 'operator', category: 'Basics' },
    { term: 'operators', category: 'Basics' },
    { term: 'template', category: 'Templates' },
    { term: 'templates', category: 'Templates' },
    { term: 'namespace', category: 'Basics' },
    { term: 'const', category: 'Keywords' },
    { term: 'static', category: 'Keywords' },
    { term: 'virtual', category: 'OOP' },
    { term: 'override', category: 'OOP' },
    { term: 'struct', category: 'Data Types' },
    { term: 'enum', category: 'Data Types' },
  ];

  // Sort by length (longest first) to avoid partial matches
  const sortedConcepts = [...concepts].sort((a, b) => b.term.length - a.term.length);
  
  let result = htmlText;
  
  sortedConcepts.forEach((concept) => {
    // Match whole words only, case-insensitive, but not inside HTML tags
    const regex = new RegExp(`\\b(${concept.term})\\b(?![^<]*>)`, 'gi');
    
    result = result.replace(regex, (match) => {
      const slug = concept.term.toLowerCase();
      return `<a href="/glossary/${slug}" class="text-primary underline decoration-dotted underline-offset-2 hover:decoration-solid font-medium transition-colors" data-concept="${concept.term}" data-category="${concept.category}">${match}</a>`;
    });
  });

  return result;
}
