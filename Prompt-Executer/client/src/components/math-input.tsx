import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import "mathlive";
import type { MathfieldElement } from "mathlive";

// Add types for MathLive custom element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "math-field": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        "virtual-keyboard-mode"?: "manual" | "onfocus" | "off"; 
      };
    }
  }
}

interface MathInputProps {
  value?: string;
  onChange?: (latex: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
}

export function MathInput({ value = "", onChange, placeholder, readOnly, className }: MathInputProps) {
  const mfRef = useRef<MathfieldElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    // Customize mathfield on mount
    if (mfRef.current) {
      mfRef.current.smartMode = true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mfRef.current as any).virtualKeyboardMode = "manual"; 
      
      // Update value if changed externally
      if (value !== mfRef.current.getValue()) {
        mfRef.current.setValue(value);
      }
    }
  }, []);

  useEffect(() => {
    if (mfRef.current && value !== mfRef.current.getValue()) {
      mfRef.current.setValue(value);
    }
  }, [value]);

  const handleInput = (e: React.SyntheticEvent<HTMLElement>) => {
    const target = e.target as MathfieldElement;
    onChange?.(target.getValue());
  };

  return (
    <div 
      className={cn(
        "relative rounded-lg border bg-card transition-all duration-200 overflow-hidden",
        isFocused ? "border-primary ring-1 ring-primary shadow-[0_0_10px_rgba(0,255,255,0.2)]" : "border-input",
        className
      )}
    >
      <math-field
        ref={mfRef}
        onInput={handleInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        readOnly={readOnly}
        class={cn(
          "w-full p-4 text-xl bg-transparent outline-none font-mono text-foreground",
          "selection:bg-primary/30"
        )}
        style={{
          backgroundColor: 'transparent',
          color: 'var(--foreground)',
          fontSize: '1.25rem'
        }}
      >
        {value}
      </math-field>
      
      {!value && !isFocused && placeholder && (
        <div className="absolute inset-0 p-4 text-muted-foreground pointer-events-none font-sans flex items-center">
          {placeholder}
        </div>
      )}

      {/* Math Tools Indicator */}
      <div className="absolute right-2 bottom-2 px-2 py-1 bg-secondary/10 rounded text-[10px] text-secondary font-mono tracking-wider border border-secondary/20 pointer-events-none">
        LaTeX
      </div>
    </div>
  );
}
