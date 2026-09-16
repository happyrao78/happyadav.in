/**
 * A small, dependency-free Markdown subset renderer.
 * Supports: frontmatter, headings, paragraphs, lists, blockquotes,
 * fenced code, images, horizontal rules, and inline bold / italic / code / links.
 */

const INLINE = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*\n]+\*|_[^_\n]+_|!\[[^\]]*\]\([^)]+\)|\[[^\]]+\]\([^)]+\))/g;

export function parseFrontmatter(raw) {
  const text = raw.replace(/^﻿/, '');
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text);
  if (!match) return { data: {}, body: text.trim() };

  const data = {};
  match[1].split(/\r?\n/).forEach((line) => {
    const pair = /^([A-Za-z0-9_-]+)\s*:\s*(.*)$/.exec(line.trim());
    if (!pair) return;
    const key = pair[1];
    let value = pair[2].trim();

    if (/^\[.*\]$/.test(value)) {
      data[key] = value
        .slice(1, -1)
        .split(',')
        .map((item) => item.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean);
      return;
    }
    value = value.replace(/^['"]|['"]$/g, '');
    if (value === 'true' || value === 'false') data[key] = value === 'true';
    else data[key] = value;
  });

  return { data, body: text.slice(match[0].length).trim() };
}

function inline(text, keyBase) {
  const parts = String(text).split(INLINE).filter((part) => part !== '' && part !== undefined);

  return parts.map((part, i) => {
    const key = `${keyBase}-${i}`;

    if (/^`[^`]+`$/.test(part)) return <code key={key}>{part.slice(1, -1)}</code>;
    if (/^\*\*[^*]+\*\*$/.test(part)) return <strong key={key}>{part.slice(2, -2)}</strong>;
    if (/^\*[^*]+\*$/.test(part)) return <em key={key}>{part.slice(1, -1)}</em>;
    if (/^_[^_]+_$/.test(part)) return <em key={key}>{part.slice(1, -1)}</em>;

    const img = /^!\[([^\]]*)\]\(([^)]+)\)$/.exec(part);
    if (img) return <img key={key} src={img[2]} alt={img[1]} loading="lazy" />;

    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (link) {
      const external = /^https?:\/\//.test(link[2]);
      return (
        <a
          key={key}
          href={link[2]}
          target={external ? '_blank' : undefined}
          rel={external ? 'noreferrer' : undefined}
        >
          {link[1]}
        </a>
      );
    }

    return <span key={key}>{part}</span>;
  });
}

/** Splits the body into blocks and returns an array of React nodes. */
export function renderMarkdown(body) {
  const lines = String(body).replace(/\r\n/g, '\n').split('\n');
  const nodes = [];
  let i = 0;
  let key = 0;

  const push = (node) => {
    nodes.push(node);
    key += 1;
  };

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i += 1;
      continue;
    }

    // Fenced code
    if (/^```/.test(line)) {
      const lang = line.slice(3).trim();
      const buffer = [];
      i += 1;
      while (i < lines.length && !/^```/.test(lines[i])) {
        buffer.push(lines[i]);
        i += 1;
      }
      i += 1;
      push(
        <pre key={`code-${key}`} data-lang={lang || undefined}>
          <code>{buffer.join('\n')}</code>
        </pre>,
      );
      continue;
    }

    // Horizontal rule
    if (/^(-{3,}|\*{3,})$/.test(line.trim())) {
      push(<hr key={`hr-${key}`} />);
      i += 1;
      continue;
    }

    // Heading
    const heading = /^(#{1,4})\s+(.*)$/.exec(line);
    if (heading) {
      const level = heading[1].length;
      const Tag = `h${Math.min(level + 1, 5)}`;
      push(<Tag key={`h-${key}`}>{inline(heading[2], `h-${key}`)}</Tag>);
      i += 1;
      continue;
    }

    // Blockquote
    if (/^>\s?/.test(line)) {
      const buffer = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        buffer.push(lines[i].replace(/^>\s?/, ''));
        i += 1;
      }
      push(<blockquote key={`q-${key}`}>{inline(buffer.join(' '), `q-${key}`)}</blockquote>);
      continue;
    }

    // Unordered list
    if (/^[-*]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*]\s+/, ''));
        i += 1;
      }
      push(
        <ul key={`ul-${key}`}>
          {items.map((item, n) => (
            <li key={n}>{inline(item, `ul-${key}-${n}`)}</li>
          ))}
        </ul>,
      );
      continue;
    }

    // Ordered list
    if (/^\d+\.\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s+/, ''));
        i += 1;
      }
      push(
        <ol key={`ol-${key}`}>
          {items.map((item, n) => (
            <li key={n}>{inline(item, `ol-${key}-${n}`)}</li>
          ))}
        </ol>,
      );
      continue;
    }

    // Standalone image
    const standalone = /^!\[([^\]]*)\]\(([^)]+)\)$/.exec(line.trim());
    if (standalone) {
      push(
        <figure key={`fig-${key}`}>
          <img src={standalone[2]} alt={standalone[1]} loading="lazy" />
          {standalone[1] ? <figcaption>{standalone[1]}</figcaption> : null}
        </figure>,
      );
      i += 1;
      continue;
    }

    // Paragraph
    const buffer = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(```|>|#{1,4}\s|[-*]\s|\d+\.\s|-{3,}$|\*{3,}$)/.test(lines[i])
    ) {
      buffer.push(lines[i].trim());
      i += 1;
    }
    push(<p key={`p-${key}`}>{inline(buffer.join(' '), `p-${key}`)}</p>);
  }

  return nodes;
}

export function readingTime(body) {
  const words = String(body).trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 210));
}
