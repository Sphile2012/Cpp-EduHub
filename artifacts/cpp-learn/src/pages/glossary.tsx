import { useGetGlossary } from "@/hooks/use-static-data";
import { useLanguage } from "@/hooks/use-language";
import { Link } from "wouter";
import { Search, Library, Hash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Card } from "@/components/ui/card";

export default function GlossaryList() {
  const { data: terms, isLoading } = useGetGlossary();
  const { languageConfig } = useLanguage();
  const [search, setSearch] = useState("");

  const filteredTerms = terms?.filter(t => 
    t.term.toLowerCase().includes(search.toLowerCase()) || 
    t.shortDefinition.toLowerCase().includes(search.toLowerCase()) ||
    t.category.toLowerCase().includes(search.toLowerCase())
  ) || [];
  const hasTerms = terms?.length > 0;

  // Group by category
  const grouped = filteredTerms.reduce((acc, term) => {
    if (!acc[term.category]) acc[term.category] = [];
    acc[term.category].push(term);
    return acc;
  }, {} as Record<string, typeof filteredTerms>);

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold font-handwriting text-primary flex items-center gap-3">
            <Library className="w-8 h-8" />
            {languageConfig?.displayName || 'Programming'} Glossary
          </h1>
          <p className="text-muted-foreground text-lg">
            Your technical reference for {languageConfig?.displayName || 'programming'} concepts, keywords, and paradigms.
          </p>
        </div>
        
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search terms..." 
            className="pl-9 bg-card border-border"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12 animate-pulse">Loading terms...</div>
      ) : !hasTerms ? (
        <div className="text-center py-12 text-muted-foreground bg-card border rounded-xl">
          The glossary is currently empty. Add terms or check your content source.
        </div>
      ) : (
        <div className="space-y-12">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category} className="space-y-4">
              <h2 className="text-2xl font-bold capitalize flex items-center gap-2 border-b pb-2">
                <Hash className="w-5 h-5 text-muted-foreground" /> {category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map(term => (
                  <Link key={term.slug} href={`/glossary/${term.slug}`}>
                    <Card className="h-full p-5 hover:border-primary/50 hover:bg-accent/5 transition-all hover:-translate-y-1 cursor-pointer flex flex-col group">
                      <h3 className="text-lg font-bold font-mono text-foreground group-hover:text-primary transition-colors mb-2">
                        {term.term}
                      </h3>
                      <p className="text-sm text-muted-foreground flex-1 line-clamp-3">
                        {term.shortDefinition}
                      </p>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ))}
          {filteredTerms.length === 0 && (
             <div className="text-center py-12 text-muted-foreground bg-card border rounded-xl">
               No terms found matching "{search}"
             </div>
          )}
        </div>
      )}
    </div>
  );
}
