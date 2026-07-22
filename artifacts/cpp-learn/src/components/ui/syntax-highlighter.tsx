import { cn } from "@/lib/utils";

export function SimpleSyntaxHighlighter({ code, language = "cpp" }: { code: string, language?: string }) {
  // A very basic regex-based syntax highlighter for C++
  const highlight = (text: string) => {
    if (!text) return "";
    
    // Process string in this exact order to avoid replacing already wrapped spans
    let highlighted = text
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Strings
    highlighted = highlighted.replace(/(".*?")/g, '<span class="text-green-400">$1</span>');
    
    // Comments
    highlighted = highlighted.replace(/(\/\/.*)/g, '<span class="text-muted-foreground italic">$1</span>');
    
    // Numbers
    highlighted = highlighted.replace(/\b(\d+)\b/g, '<span class="text-blue-400">$1</span>');
    
    // Keywords
    const keywords = ['int', 'float', 'double', 'char', 'void', 'bool', 'auto', 'struct', 'class', 'public', 'private', 'protected', 'return', 'if', 'else', 'while', 'for', 'do', 'switch', 'case', 'break', 'continue', 'namespace', 'using', 'std', 'cout', 'cin', 'endl', '#include', 'const', 'virtual', 'override', 'new', 'delete'];
    const keywordRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
    highlighted = highlighted.replace(keywordRegex, '<span class="text-amber-500 font-semibold">$1</span>');
    
    // #include directives specifically
    highlighted = highlighted.replace(/(&lt;[a-zA-Z0-9_.]+&gt;)/g, '<span class="text-green-400/80">$1</span>');

    // Functions
    highlighted = highlighted.replace(/([a-zA-Z0-9_]+)(?=\()/g, '<span class="text-orange-400">$1</span>');

    return highlighted;
  };

  return (
    <pre className="font-mono text-sm leading-relaxed overflow-x-auto p-4 rounded-lg bg-black/40 border shadow-inner">
      <code dangerouslySetLabel={{ __html: highlight(code) }} dangerouslySetInnerHTML={{ __html: highlight(code) }} />
    </pre>
  );
}
