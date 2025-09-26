import React, { useState, useEffect } from 'react';
import Head from '../components/shared/Head';
import { theme } from '../styles/theme';

/*
  ToolsPage embeds the external tools application. We use an iframe for quick integration.
  Consider future enhancement: proxy or micro-frontend integration if deeper interaction or SEO is required.
*/
const ToolsPage = () => {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!loaded) {
        // Show fallback message after 12s if iframe hasn't loaded
        setFailed(true);
      }
    }, 12000);
    return () => clearTimeout(timeout);
  }, [loaded]);

  return (
    <div style={{ background: theme.colors.background, minHeight: '100vh' }}>
      <Head
        title="Tools"
        description="Collection of handy frontend tools and utilities to speed up your workflow."
        keywords="frontend tools, web utilities, generators, development helpers"
        canonicalUrl="https://habbiwebdesign.com/tools"
      />
      <section style={{ padding: '10rem 0 4rem' }}>
        <div className="container" style={{ maxWidth: theme.sizes.maxWidth, margin: '0 auto', padding: '0 2rem' }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 7vw, 5rem)',
            fontWeight: 700,
            marginBottom: '1rem',
            background: theme.colors.gradient1,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.03em'
          }}>Tools & Utilities</h1>
          <p style={{
            fontSize: '1.15rem',
            lineHeight: 1.6,
            maxWidth: '820px',
            opacity: 0.85,
            marginBottom: '2.5rem'
          }}>
            Explore a curated set of frontend productivity tools. These run in an embedded app. If it doesn't load, use the direct link below.
          </p>
          <a href="https://frontend-desired-tools.vercel.app/" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-block',
            padding: '0.85rem 1.4rem',
            fontWeight: 600,
            borderRadius: theme.borderRadius.medium,
            background: theme.colors.gradient1,
            color: '#fff',
            textDecoration: 'none',
            marginBottom: '2rem'
          }}>Open in New Tab</a>
        </div>
        <div style={{ position: 'relative', width: '100%', height: '80vh', maxWidth: '1600px', margin: '0 auto', padding: '0 2rem 4rem' }}>
          {!loaded && !failed && (
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              background: 'linear-gradient(135deg, rgba(0,229,255,0.05) 0%, rgba(156,39,176,0.05) 100%)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: theme.borderRadius.large
            }}>
              <div style={{
                width: '48px', height: '48px', border: '4px solid rgba(255,255,255,0.15)', borderTopColor: theme.colors.primary, borderRadius: '50%', animation: 'spin 1s linear infinite'
              }} />
              <p style={{ opacity: 0.7 }}>Loading tools...</p>
            </div>
          )}
          {failed && (
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: theme.borderRadius.large
            }}>
              <h2 style={{ marginBottom: '1rem' }}>Unable to Load Tools</h2>
              <p style={{ maxWidth: '520px', marginBottom: '1.5rem', opacity: 0.8 }}>The embedded tools app took too long to respond. You can still access it directly via the button above.</p>
              <a href="https://frontend-desired-tools.vercel.app/" target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-block', padding: '0.9rem 1.5rem', fontWeight: 600, borderRadius: theme.borderRadius.medium, background: theme.colors.gradient1, color: '#fff', textDecoration: 'none'
              }}>Open Tools</a>
            </div>
          )}
          <iframe
            title="Frontend Tools"
            src="https://frontend-desired-tools.vercel.app/"
            onLoad={() => setLoaded(true)}
            style={{
              width: '100%',
              height: '100%',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: theme.borderRadius.large,
              background: '#0A0A0A',
              boxShadow: theme.shadows.medium
            }}
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>
      </section>
      <style>{`@keyframes spin {0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}`}</style>
    </div>
  );
};

export default ToolsPage;
