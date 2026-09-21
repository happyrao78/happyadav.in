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

export default function BlogPost({ slug }) {
  const post = getPost(slug);
  const content = useMemo(() => (post ? renderMarkdown(post.body) : null), [post]);

  useEffect(() => {
    if (post) document.title = `${post.title} — Happy Yadav`;
    return () => {
      document.title = 'Happy Yadav — Applied AI Engineer';
    };
  }, [post]);

  if (!post) {
    return (
      <div className="page">
        <div className="shell not-found">
          <p className="eyebrow">404</p>
          <h1 className="page-title">Post not found</h1>
          <p className="page-lede">That link does not point at a published blog.</p>
          <a
            className="btn"
            href="#/blog"
            onClick={(e) => {
              e.preventDefault();
              navigate('/blog');
            }}
          >
            <span>Back to the blogs</span>
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
          href="#/blog"
          onClick={(e) => {
            e.preventDefault();
            navigate('/blog');
          }}
        >
          &larr; All blogs
        </a>

        <header className="article-head">
          <p className="post-meta">
            <span>{formatDate(post.date)}</span>
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

        <div className="article-foot">
          {newer || older ? (
            <nav className="post-nav">
              {older ? (
                <a
                  href={`#/blog/${older.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/blog/${older.slug}`);
                  }}
                >
                  <span>Older</span>
                  <strong>{older.title}</strong>
                </a>
              ) : null}
              {newer ? (
                <a
                  href={`#/blog/${newer.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/blog/${newer.slug}`);
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
