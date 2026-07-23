import { useState, useRef, useEffect } from "react";
import { useRunCode, CodeRunResult } from "@workspace/api-client-react";
import { Terminal, Play, Loader2, Maximize2, Minimize2, AlertCircle, Save, Trash2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Editor from '@monaco-editor/react';

interface PlaygroundPanelProps {
  initialCode?: string;
}

export function PlaygroundPanel({ initialCode = "" }: PlaygroundPanelProps) {
  const [code, setCode] = useState(initialCode || '#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}');
  const [stdin, setStdin] = useState("");
  const [output, setOutput] = useState<CodeRunResult | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditorReady, setIsEditorReady] = useState(false);
  
  const runCodeMutation = useRunCode();
  const editorRef = useRef<any>(null);

  // Update code when initialCode prop changes
  useEffect(() => {
    if (initialCode) {
      setCode(initialCode);
    }
  }, [initialCode]);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    setIsEditorReady(true);
    
    // Add keyboard shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      handleRun();
    });
  };

  const handleRun = () => {
    runCodeMutation.mutate({ data: { code, stdin: stdin || undefined } }, {
      onSuccess: (data) => setOutput(data)
    });
  };

  const handleSave = () => {
    localStorage.setItem('cpp-playground-code', code);
    // Show a toast or notification
    console.log('Code saved!');
  };

  const handleLoad = () => {
    const saved = localStorage.getItem('cpp-playground-code');
    if (saved) {
      setCode(saved);
    }
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to clear the editor?')) {
      setCode('#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}');
      setOutput(null);
      setStdin('');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'program.cpp';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`flex flex-col bg-[#1e1e1e] rounded-xl border border-[#333] shadow-xl overflow-hidden transition-all duration-300 ${isExpanded ? 'fixed inset-4 z-50' : 'h-full'}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-[#3e3e3e]">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-amber-500" />
          <span className="font-mono text-sm text-zinc-300 font-medium tracking-wide">workspace.cpp</span>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-700"
            onClick={handleSave}
            title="Save to browser storage"
          >
            <Save className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-700"
            onClick={handleDownload}
            title="Download as .cpp file"
          >
            <Download className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-700"
            onClick={handleClear}
            title="Clear editor"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
          <div className="w-px h-6 bg-zinc-700" />
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-700"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
          <Button 
            onClick={handleRun} 
            disabled={runCodeMutation.isPending}
            className="h-8 bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs gap-1 border-none shadow-none"
          >
            {runCodeMutation.isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3 fill-current" />}
            RUN (Cmd+Enter)
          </Button>
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 relative bg-[#1e1e1e] min-h-0">
        <Editor
          height="100%"
          defaultLanguage="cpp"
          value={code}
          onChange={(value) => setCode(value || '')}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          options={{
            minimap: { enabled: true },
            fontSize: 14,
            fontFamily: "'Fira Code', 'Consolas', 'Monaco', monospace",
            fontLigatures: true,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 4,
            insertSpaces: true,
            wordWrap: 'on',
            bracketPairColorization: {
              enabled: true
            },
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            formatOnPaste: true,
            formatOnType: true,
            suggestOnTriggerCharacters: true,
            quickSuggestions: true,
            acceptSuggestionOnEnter: 'on',
          }}
        />
      </div>

      {/* Stdin Area */}
      <div className="h-16 border-t border-[#333] bg-[#252525]">
        <input
          type="text"
          placeholder="Standard Input (stdin) - e.g., 5 10 hello"
          value={stdin}
          onChange={(e) => setStdin(e.target.value)}
          className="w-full h-full bg-transparent px-4 font-mono text-sm text-zinc-300 placeholder:text-zinc-600 focus:outline-none"
        />
      </div>

      {/* Output Area */}
      <div className="h-1/3 min-h-[150px] border-t border-[#333] bg-[#0c0c0c] flex flex-col">
        <div className="px-4 py-1.5 bg-[#1a1a1a] border-b border-[#2a2a2a] text-xs font-mono tracking-wider text-zinc-500 flex justify-between">
          <span>TERMINAL</span>
          {output?.executionTime && <span>{output.executionTime}ms</span>}
        </div>
        <div className="flex-1 p-4 overflow-auto font-mono text-sm whitespace-pre-wrap">
          {runCodeMutation.isPending ? (
            <div className="text-zinc-500 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /> Compiling & Executing...
            </div>
          ) : !output ? (
            <div className="text-zinc-600 italic">Output will appear here...</div>
          ) : (
            <>
              {output.compilationError && (
                <div className="text-red-400 mb-2 flex items-start gap-2 bg-red-950/30 p-2 rounded">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{output.compilationError}</span>
                </div>
              )}
              {output.stdout && <div className="text-green-400">{output.stdout}</div>}
              {output.stderr && <div className="text-red-400">{output.stderr}</div>}
              {output.exitCode !== undefined && (
                <div className={`mt-4 text-xs ${output.exitCode === 0 ? 'text-zinc-500' : 'text-amber-500'}`}>
                  Process finished with exit code {output.exitCode}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
