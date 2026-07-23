import { useParams, Link } from "wouter";
import { useGetGlossaryTerm } from "@/hooks/use-static-data";
import { SimpleSyntaxHighlighter } from "@/components/ui/syntax-highlighter";
import { ChevronLeft, Info, AlertTriangle, Lightbulb, Link2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function GlossaryTerm() {
  const { slug } = useParams<{ slug: string }>();
  const slugValue = slug || "";
  const { data: term } = useGetGlossaryTerm(slugValue);

  if (!term) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Term Not Found</h1>
        <p className="text-muted-foreground mb-6">The glossary term "{slugValue}" could not be found.</p>
        <Link href="/glossary" className="text-primary hover:underline">
          ← Back to Glossary
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-10">
      <Link href="/glossary" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
        <ChevronLeft className="w-4 h-4 mr-1" /> Back to Glossary
      </Link>

      <div className="space-y-4 border-b pb-8">
        <Badge variant="outline" className="uppercase tracking-widest text-xs font-mono">{term.category}</Badge>
        <h1 className="text-5xl font-bold font-mono text-foreground tracking-tight">{term.term}</h1>
        <p className="text-2xl text-muted-foreground font-handwriting pt-2 leading-relaxed">
          {term.shortDefinition}
        </p>
      </div>

      <div className="space-y-12">
        <section className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2 text-primary border-l-4 border-primary pl-3">
            <Info className="w-5 h-5" /> Detailed Definition
          </h2>
          <p className="text-lg leading-relaxed text-foreground/90">{term.definition}</p>
        </section>

        <section className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4 p-6 bg-card border rounded-xl">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" /> Analogy
            </h3>
            <p className="text-muted-foreground italic leading-relaxed">{term.analogy}</p>
          </div>
          <div className="space-y-4 p-6 bg-card border rounded-xl">
            <h3 className="font-bold text-lg">Why it exists</h3>
            <p className="text-muted-foreground leading-relaxed">{term.whyItExists}</p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-primary">Syntax & Usage</h2>
          <div className="p-4 bg-background border rounded-lg font-mono text-sm overflow-x-auto text-muted-foreground">
            {term.syntax}
          </div>
          <div className="mt-4 rounded-xl overflow-hidden border">
            <SimpleSyntaxHighlighter code={term.codeExample} />
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          <section className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2 text-green-500">
              <CheckCircleIcon className="w-5 h-5" /> Best Practices
            </h2>
            <ul className="space-y-3">
              {term.bestPractices.map((bp, i) => (
                <li key={i} className="flex gap-2 text-muted-foreground">
                  <span className="text-green-500 mt-1">•</span>
                  <span className="leading-relaxed">{bp}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-5 h-5" /> Common Mistakes
            </h2>
            <ul className="space-y-3">
              {term.commonMistakes.map((cm, i) => (
                <li key={i} className="flex gap-2 text-muted-foreground">
                  <span className="text-destructive mt-1">•</span>
                  <span className="leading-relaxed">{cm}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {term.relatedTerms.length > 0 && (
          <section className="pt-8 border-t">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
              <Link2 className="w-5 h-5 text-muted-foreground" /> Related Concepts
            </h2>
            <div className="flex flex-wrap gap-2">
              {term.relatedTerms.map(rt => (
                <Link key={rt} href={`/glossary/${rt.toLowerCase().replace(/ /g, '-')}`}>
                  <Badge variant="secondary" className="text-sm px-3 py-1 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors font-mono">
                    {rt}
                  </Badge>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function CheckCircleIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );
}
