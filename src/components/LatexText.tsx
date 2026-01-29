import type { ReactElement } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

type LatexTextProps = {
  children: string;
  display?: boolean;
};

/**
 * Splits text by $...$ (inline) and $$...$$ (display), renders math with KaTeX.
 */
export const LatexText = ({ children, display = false }: LatexTextProps): ReactElement => {
  const parts: React.ReactNode[] = [];
  let remainder = children;
  let key = 0;

  const pushText = (raw: string): void => {
    if (raw.length > 0) parts.push(<span key={key++}>{raw}</span>);
  };

  const pushMath = (latex: string, isDisplay: boolean): void => {
    try {
      const html = katex.renderToString(latex, {
        throwOnError: false,
        displayMode: isDisplay,
        output: "html",
      });
      parts.push(
        <span
          key={key++}
          dangerouslySetInnerHTML={{ __html: html }}
          className={isDisplay ? "latex-display" : "latex-inline"}
        />
      );
    } catch {
      pushText(`$${latex}$`);
    }
  };

  while (remainder.length > 0) {
    const displayMatch = remainder.match(/^\$\$([\s\S]*?)\$\$/);
    const inlineMatch = remainder.match(/^\$([^$]*?)\$/);

    if (displayMatch !== null) {
      pushMath(displayMatch[1], true);
      remainder = remainder.slice(displayMatch[0].length);
      continue;
    }
    if (inlineMatch !== null) {
      pushMath(inlineMatch[1], false);
      remainder = remainder.slice(inlineMatch[1].length + 2);
      continue;
    }

    const next = remainder.search(/\$\$?/);
    if (next === -1) {
      pushText(remainder);
      break;
    }
    pushText(remainder.slice(0, next));
    remainder = remainder.slice(next);
  }

  const Wrapper = display ? "div" : "span";
  return <Wrapper className="latex-text">{parts}</Wrapper>;
};