import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";

/**
 * Wrap <pre> elements output by shiki with a Claude-style chrome:
 * a top bar with three dots + language label (left) + copy button (right).
 */
function wrapCodeBlocks(html: string): string {
  return html.replace(
    /<pre([^>]*)>([\s\S]*?)<\/pre>/g,
    (_match, attrs: string, content: string) => {
      let lang = "code";
      const preLangMatch = attrs.match(/data-language="([^"]*)"/);
      if (preLangMatch) {
        lang = preLangMatch[1];
      } else {
        const codeLangMatch = content.match(/data-language="([^"]*)"/);
        if (codeLangMatch) lang = codeLangMatch[1];
      }
      return (
        `<div class="code-block">` +
        `<div class="code-block__bar">` +
        `<span class="code-block__dots">` +
        `<span class="code-block__dot code-block__dot--red"></span>` +
        `<span class="code-block__dot code-block__dot--yellow"></span>` +
        `<span class="code-block__dot code-block__dot--green"></span>` +
        `</span>` +
        `<span class="code-block__lang">${lang}</span>` +
        `<button class="code-block__copy" type="button" aria-label="复制代码">复制</button>` +
        `</div>` +
        `<pre${attrs}>${content}</pre>` +
        `</div>`
      );
    }
  );
}

export async function renderMarkdown(content: string): Promise<string> {
  // NOTE: unified v11 + remark/rehype plugin types have a known TS overload
  // mismatch (runtime is fine). Cast plugins to `any` to bypass type check.
  const file = await unified()
    .use(remarkParse as never)
    .use(remarkGfm as never)
    .use(remarkRehype as never)
    .use(rehypePrettyCode, {
      theme: {
        light: "github-light",
        dark: "github-dark",
      },
      keepBackground: false,
    })
    .use(rehypeStringify as never)
    .process(content);
  return wrapCodeBlocks(String(file));
}
