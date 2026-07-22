import { PlaygroundPanel } from "@/components/playground/playground-panel";
import { TerminalSquare } from "lucide-react";

export default function FullPlayground() {
  const defaultCode = `// The Workshop
// Write, compile, and execute C++ instantly.

#include <iostream>
#include <vector>
#include <string>

class Developer {
private:
    std::string name;
    int level;
    
public:
    Developer(std::string n, int l) : name(n), level(l) {}
    
    void code() {
        std::cout << name << " (Lvl " << level << ") is typing..." << std::endl;
        std::cout << "Compiling... Success!" << std::endl;
    }
};

int main() {
    std::cout << "--- C++ Playground Initialized ---" << std::endl;
    
    Developer dev("Student", 1);
    dev.code();
    
    return 0;
}`;

  return (
    <div className="h-screen flex flex-col p-4 bg-background overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-2 mb-4">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          <TerminalSquare className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold font-handwriting">Free Code Playground</h1>
          <p className="text-sm text-muted-foreground">Experiment outside the lessons. Standard library is available.</p>
        </div>
      </div>
      <div className="flex-1 min-h-0">
        <PlaygroundPanel initialCode={defaultCode} />
      </div>
    </div>
  );
}
