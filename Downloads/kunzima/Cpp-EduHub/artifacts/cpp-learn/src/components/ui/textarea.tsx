import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => (
  <textarea ref={ref} className={cn('flex min-h-[80px] w-full rounded-md border border-slate-700 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500', className)} {...props} />
));
Textarea.displayName = 'Textarea';

export { Textarea };
