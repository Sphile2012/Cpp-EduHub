import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface MemoryCell {
  address: string;
  name?: string;
  value: string | number;
  type: 'variable' | 'pointer' | 'array';
  pointsTo?: string;
  region?: 'stack' | 'heap';
}

interface MemoryVisualizerProps {
  cells: MemoryCell[];
  title?: string;
  showAddresses?: boolean;
}

export function MemoryVisualizer({ 
  cells, 
  title = "Memory Layout",
  showAddresses = true 
}: MemoryVisualizerProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {cells.map((cell, idx) => {
            const pointsToCell = cell.pointsTo 
              ? cells.find(c => c.address === cell.pointsTo)
              : null;

            return (
              <div key={idx} className="relative">
                <div
                  className={cn(
                    "border rounded-lg p-4 transition-all hover:border-primary/50",
                    cell.type === 'pointer' && "bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800"
                  )}
                >
                  <div className="flex items-center justify-between gap-4">
                    {/* Variable Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {cell.name && (
                          <span className="font-mono font-bold text-lg">{cell.name}</span>
                        )}
                        <Badge variant={
                          cell.type === 'pointer' ? 'default' :
                          cell.type === 'array' ? 'secondary' :
                          'outline'
                        }>
                          {cell.type}
                        </Badge>
                      </div>
                      {showAddresses && (
                        <div className="text-xs text-muted-foreground font-mono">
                          Address: {cell.address}
                        </div>
                      )}
                    </div>

                    {/* Value Display */}
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Value:</div>
                      <div className={cn(
                        "font-mono text-xl font-bold",
                        cell.type === 'pointer' && "text-blue-600 dark:text-blue-400"
                      )}>
                        {cell.type === 'pointer' ? (
                          <span className="flex items-center gap-1">
                            {cell.value}
                            {pointsToCell && <ArrowRight className="w-4 h-4" />}
                          </span>
                        ) : (
                          cell.value
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Pointer Arrow */}
                  {cell.type === 'pointer' && pointsToCell && (
                    <div className="mt-3 pt-3 border-t">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">Points to:</span>
                        <span className="font-mono font-semibold">{pointsToCell.name}</span>
                        <span className="text-muted-foreground">at</span>
                        <span className="font-mono text-xs">{pointsToCell.address}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        *{cell.name} = {pointsToCell.value}
                      </div>
                    </div>
                  )}
                </div>

                {/* Visual Arrow to pointed memory */}
                {cell.type === 'pointer' && pointsToCell && idx < cells.length - 1 && (
                  <div className="absolute left-1/2 -translate-x-1/2 h-8 w-0.5 bg-gradient-to-b from-blue-400 to-transparent" />
                )}
              </div>
            );
          })}
        </div>

        {/* Stack/Heap Labels */}
        <div className="mt-6 pt-4 border-t">
          <div className="flex gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border border-muted-foreground rounded" />
              <span className="text-muted-foreground">Stack Memory</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-100 dark:bg-blue-950/40 border border-blue-300 dark:border-blue-700 rounded" />
              <span className="text-muted-foreground">Pointer</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Example usage component
export function PointerExample() {
  const cells: MemoryCell[] = [
    {
      address: '0x1000',
      name: 'age',
      value: 25,
      type: 'variable'
    },
    {
      address: '0x2000',
      name: 'ptr',
      value: '0x1000',
      type: 'pointer',
      pointsTo: '0x1000'
    }
  ];

  return (
    <div className="space-y-4">
      <MemoryVisualizer cells={cells} title="Pointer Example: int* ptr = &age;" />
      
      <Card className="bg-muted/30">
        <CardContent className="pt-6">
          <div className="space-y-2 text-sm">
            <div className="font-mono bg-background p-3 rounded border">
              <div>int age = 25;</div>
              <div>int* ptr = &age;</div>
              <div className="text-green-600 dark:text-green-400">// ptr stores the ADDRESS of age</div>
            </div>
            <ul className="space-y-1 text-muted-foreground">
              <li>• <code className="text-foreground">ptr</code> holds memory address <code className="text-foreground">0x1000</code></li>
              <li>• <code className="text-foreground">*ptr</code> accesses the value at that address: <code className="text-foreground">25</code></li>
              <li>• Changing <code className="text-foreground">*ptr = 30</code> also changes <code className="text-foreground">age</code></li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
