'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, X, History, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/data';

const initialSuggestions = [
  { type: 'trend', text: 'Pitambari silk dhoti' },
  { type: 'trend', text: 'Roman clerical wool cassock' },
  { type: 'trend', text: 'Kasaya saffron robe' },
  { type: 'trend', text: 'Gothic damask chasuble' },
  { type: 'history', text: 'Ayodhya handspun khadi' },
  { type: 'history', text: 'Reversible liturgical stole' },
  { type: 'history', text: 'Kashi temple zari uttariya' }
];

export default function SearchClient() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState(initialSuggestions);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;

    return products.filter((p) => {
      const matchName = p.name.toLowerCase().includes(q);
      const matchCat = p.cat.toLowerCase().includes(q);
      const matchBadge = p.badge.toLowerCase().includes(q);
      const matchBlurb = p.blurb.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchMaterial = (p.materialFilter || '').toLowerCase().includes(q);
      const matchTradition = (p.tradition || '').toLowerCase().includes(q);
      return (
        matchName ||
        matchCat ||
        matchBadge ||
        matchBlurb ||
        matchDesc ||
        matchMaterial ||
        matchTradition
      );
    });
  }, [query]);

  const handleSuggestionClick = (text) => {
    setQuery(text);
  };

  return (
    <div className="wrap page search-root">
      <header className="search-header">
        <span className="eyebrow">DISCOVER SACRED ROBES</span>
        <h1 className="serif big2">Search the आstha Archive</h1>
      </header>

      {/* Main Search Input */}
      <div className="searchbar">
        <Search size={22} className="search-icon" aria-hidden="true" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by garment, fabric (silk, wool, khadi), canon or rite..."
          aria-label="Search ceremonial garments"
          autoFocus
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="Clear search input"
            className="icon-btn"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Suggestions / Trending Searches */}
      {!query && suggestions.length > 0 && (
        <section className="search-suggestions-box" aria-label="Recent and trending queries">
          <div className="between">
            <span className="caps muted sm">RECOMMENDED & RECENT QUERIES</span>
            <button
              type="button"
              className="ul-s sm muted"
              onClick={() => setSuggestions([])}
            >
              CLEAR SUGGESTIONS
            </button>
          </div>
          <div className="chips wrapchips mt-xs">
            {suggestions.map((s) => (
              <button
                key={s.text}
                type="button"
                className="sugg"
                onClick={() => handleSuggestionClick(s.text)}
              >
                {s.type === 'history' ? (
                  <History size={15} className="muted" aria-hidden="true" />
                ) : (
                  <TrendingUp size={15} className="gold" aria-hidden="true" />
                )}
                <span>{s.text}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Results Header */}
      <div className="between end search-results-meta">
        <div>
          <h2 className="serif big2">
            {query ? `Results for “${query}”` : 'Complete Curated Vestments'}
          </h2>
          <p className="muted sm">Conforming to sacred canon & master weaving guidelines</p>
        </div>
        <span className="muted caps sm">
          {results.length} {results.length === 1 ? 'PIECE' : 'PIECES'} FOUND
        </span>
      </div>

      {/* Product Grid or Empty State */}
      {results.length > 0 ? (
        <section className="grid4" aria-label="Search results">
          {results.map((p) => (
            <ProductCard key={p.slug} p={p} showAdd />
          ))}
        </section>
      ) : (
        <div className="empty-results-box">
          <Sparkles size={36} className="gold mb" aria-hidden="true" />
          <h2 className="serif big2">No Sacred Vestments Found</h2>
          <p className="muted max-w-sm">
            We could not find any garments matching “{query}”. Check spelling or browse our traditional collections.
          </p>
          <div className="row g12 mt">
            <button
              type="button"
              className="btn"
              onClick={() => setQuery('')}
            >
              CLEAR SEARCH
            </button>
            <Link href="/shop" className="btn ghost">
              VIEW ALL VESTMENTS
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

