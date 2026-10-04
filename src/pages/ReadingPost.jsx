import { useEffect, useMemo, useState } from 'react';
import { posts, getPost, formatDate } from '../content/posts.js';
import { renderMarkdown } from '../lib/markdown.jsx';
import { navigate } from '../lib/router.js';
import { Arrow } from '../components/Icons.jsx';

function Progress() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setValue(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return <div className="progress" style={{ '--p': value }} aria-hidden="true" />;
}

export default function ReadingPost({ slug }) {
  const post = getPost(slug);
  const content = useMemo(() => (post ? renderMarkdown(post.body) : null), [post]);

  if (!post) {
    return (
      <div className="page">
        <div className="shell not-found">
          <p className="eyebrow">404</p>
          <h1 className="page-title">Post not found</h1>
          <p className="page-lede">That link does not point at a published reading.</p>
          <a
            className="btn"
            href="/readings"
            onClick={(e) => {
              e.preventDefault();
              navigate('/readings');
            }}
          >
            <span>Back to readings</span>
            <Arrow />
          </a>
        </div>
      </div>
    );
  }

  const index = posts.findIndex((p) => p.slug === post.slug);
  const newer = index > 0 ? posts[index - 1] : null;
  const older = index < posts.length - 1 ? posts[index + 1] : null;

  return (
    <div className="page article">
      <Progress />
      <div className="shell">
        <a
          className="back-link link"
          href="/readings"
          onClick={(e) => {
            e.preventDefault();
            navigate('/readings');
          }}
        >
          &larr; All readings
        </a>

        <header className="article-head">
          <p className="post-meta">
            <span>
              Posted <time dateTime={post.date}>{formatDate(post.date)}</time>
            </span>
            {post.updated ? (
              <span>
                Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>
              </span>
            ) : null}
            <span>{post.minutes} min read</span>
          </p>
          <h1 className="article-title">{post.title}</h1>
          {post.summary ? <p className="article-summary">{post.summary}</p> : null}
          {post.tags.length ? (
            <div className="tags">
              {post.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </header>

        <article className="article-body">{content}</article>


        {post.source ? (
          <aside className="article-ref" aria-label="Reference">
            <p className="label">Reference</p>
            {post.citation ? <p className="article-ref-citation">{post.citation}</p> : null}
            <a href={post.source} target="_blank" rel="noopener noreferrer">
              {post.citation ? null : <strong>{post.sourceName}</strong>}
              <span>{post.source}</span>
            </a>
          </aside>
        ) : null}

        <div className="article-foot">
          {newer || older ? (
            <nav className="post-nav">
              {older ? (
                <a
                  href={`/readings/${older.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/readings/${older.slug}`);
                  }}
                >
                  <span>Older</span>
                  <strong>{older.title}</strong>
                </a>
              ) : null}
              {newer ? (
                <a
                  href={`/readings/${newer.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/readings/${newer.slug}`);
                  }}
                >
                  <span>Newer</span>
                  <strong>{newer.title}</strong>
                </a>
              ) : null}
            </nav>
          ) : null}
        </div>
      </div>
    </div>
  );
}
