'use client';
import { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  SlidersHorizontal,
  X,
  ArrowRight,
  Filter,
  Check,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import Guarantee from '@/components/Guarantee';
import Photo from '@/components/Photo';
import { products, groups, traditions, materials, sortOptions, inr } from '@/lib/data';

function ShopContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialTradition = searchParams.get('tradition') || 'all';
  const initialMaterial = searchParams.get('material') || 'All Materials';

  const [selectedTradition, setSelectedTradition] = useState(initialTradition);
  const [selectedMaterial, setSelectedMaterial] = useState(initialMaterial);
  const [selectedSort, setSelectedSort] = useState('curated');
  const [maxPrice, setMaxPrice] = useState(15000);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync state if URL searchParams change
  useEffect(() => {
    const t = searchParams.get('tradition');
    if (t) setSelectedTradition(t);
    const m = searchParams.get('material');
    if (m) setSelectedMaterial(m);
  }, [searchParams]);

  // Compute active filters
  const activeFilters = useMemo(() => {
    const list = [];
    if (selectedTradition !== 'all') {
      const match = traditions.find((t) => t.id === selectedTradition);
      list.push({
        type: 'tradition',
        label: match ? match.label : selectedTradition
      });
    }
    if (selectedMaterial !== 'All Materials') {
      list.push({
        type: 'material',
        label: selectedMaterial
      });
    }
    if (maxPrice < 15000) {
      list.push({
        type: 'price',
        label: `Under ${inr(maxPrice)}`
      });
    }
    return list;
  }, [selectedTradition, selectedMaterial, maxPrice]);

  // Filter and sort items
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by tradition / group
    if (selectedTradition !== 'all') {
      result = result.filter(
        (p) => p.tradition === selectedTradition || p.group === selectedTradition
      );
    }

    // Filter by material
    if (selectedMaterial !== 'All Materials') {
      result = result.filter((p) => p.materialFilter === selectedMaterial);
    }

    // Filter by price
    result = result.filter((p) => p.price <= maxPrice);

    // Sorting
    if (selectedSort === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (selectedSort === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (selectedSort === 'newest') {
      // reverse catalogue order
      result.reverse();
    } else {
      // curated / featured first
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [selectedTradition, selectedMaterial, maxPrice, selectedSort]);

  const clearAllFilters = () => {
    setSelectedTradition('all');
    setSelectedMaterial('All Materials');
    setMaxPrice(15000);
    setSelectedSort('curated');
    router.replace('/shop');
  };

  const removeFilter = (filterType) => {
    if (filterType === 'tradition') setSelectedTradition('all');
    if (filterType === 'material') setSelectedMaterial('All Materials');
    if (filterType === 'price') setMaxPrice(15000);
  };

  return (
    <div className="wrap page shop-root">
      {/* Editorial Header */}
      <header className="shop-header">
        <span className="eyebrow">COUTURE OF REVERENCE • A/W SACRED EDITION</span>
        <div className="between end">
          <h1 className="serif big">Sacred Traditions & Ceremonial Vestments</h1>
          <span className="muted caps sm">
            {filteredProducts.length} OF {products.length} COMMISSIONS
          </span>
        </div>
        <p className="muted lead">
          Hand-loomed ceremonial vestments, sacred dhotis, and monastic habit crafted with uncompromised textile purity and canonical reverence.
        </p>
      </header>

      {/* Tradition Chips Navigation */}
      <nav className="chips-nav" role="tablist" aria-label="Tradition filter">
        {traditions.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={selectedTradition === t.id}
            className={`chip ${selectedTradition === t.id ? 'on' : ''}`}
            onClick={() => setSelectedTradition(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {/* Filter and Sort Toolbar */}
      <div className="filterbar">
        <button
          type="button"
          className="pill filter-pill-btn"
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          aria-expanded={mobileFilterOpen}
        >
          <SlidersHorizontal size={16} />
          <span>FILTER OPTIONS</span>
          {activeFilters.length > 0 && <b className="dot">{activeFilters.length}</b>}
        </button>

        {/* Desktop Filter Dropdowns */}
        <div className="desktop-filters">
          <label className="filter-select-label">
            <span className="filter-label-text">Material:</span>
            <select
              value={selectedMaterial}
              onChange={(e) => setSelectedMaterial(e.target.value)}
              className="filter-select"
              aria-label="Filter by material"
            >
              {materials.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </label>

          <label className="filter-select-label">
            <span className="filter-label-text">Max Price:</span>
            <select
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="filter-select"
              aria-label="Filter by maximum price"
            >
              <option value={15000}>All Prices (Up to ₹15,000)</option>
              <option value={10000}>Under ₹10,000</option>
              <option value={7000}>Under ₹7,000</option>
              <option value={4500}>Under ₹4,500</option>
            </select>
          </label>
        </div>

        {/* Sort Dropdown */}
        <div className="sort-wrapper">
          <label className="filter-select-label">
            <span className="filter-label-text">SORT:</span>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="filter-select"
              aria-label="Sort vestments by"
            >
              {sortOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {/* Mobile Filter Drawer Overlay */}
      {mobileFilterOpen && (
        <div className="mobile-filter-drawer">
          <div className="mobile-filter-panel">
            <div className="between mobile-filter-head">
              <h2 className="serif big2">Filter Vestments</h2>
              <button
                type="button"
                className="icon-btn"
                onClick={() => setMobileFilterOpen(false)}
                aria-label="Close filters"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mobile-filter-section">
              <span className="eyebrow">TRADITION</span>
              <div className="mobile-options-list">
                {traditions.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className={`mobile-option-item ${selectedTradition === t.id ? 'active' : ''}`}
                    onClick={() => setSelectedTradition(t.id)}
                  >
                    <span>{t.label}</span>
                    {selectedTradition === t.id && <Check size={16} />}
                  </button>
                ))}
              </div>
            </div>

            <div className="mobile-filter-section">
              <span className="eyebrow">MATERIAL & FIBRE</span>
              <div className="mobile-options-list">
                {materials.map((m) => (
                  <button
                    key={m}
                    type="button"
                    className={`mobile-option-item ${selectedMaterial === m ? 'active' : ''}`}
                    onClick={() => setSelectedMaterial(m)}
                  >
                    <span>{m}</span>
                    {selectedMaterial === m && <Check size={16} />}
                  </button>
                ))}
              </div>
            </div>

            <div className="mobile-filter-section">
              <span className="eyebrow">MAXIMUM BUDGET: {inr(maxPrice)}</span>
              <input
                type="range"
                min={2500}
                max={15000}
                step={500}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="price-range-slider"
                aria-label="Maximum budget range"
              />
              <div className="between sm muted mt-xs">
                <span>₹2,500</span>
                <span>₹15,000</span>
              </div>
            </div>

            <div className="mobile-filter-actions">
              <button
                type="button"
                className="btn ghost full"
                onClick={clearAllFilters}
              >
                RESET ALL
              </button>
              <button
                type="button"
                className="btn full"
                onClick={() => setMobileFilterOpen(false)}
              >
                APPLY ({filteredProducts.length} ITEMS)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Filter Chips */}
      {activeFilters.length > 0 && (
        <div className="active-filters-bar">
          <span className="muted caps sm">Active Filters:</span>
          {activeFilters.map((f) => (
            <span key={f.type} className="fchip">
              <span>{f.label}</span>
              <button
                type="button"
                onClick={() => removeFilter(f.type)}
                aria-label={`Remove filter ${f.label}`}
              >
                <X size={12} />
              </button>
            </span>
          ))}
          <button
            type="button"
            className="ul-s sm muted clear-all-btn"
            onClick={clearAllFilters}
          >
            CLEAR ALL
          </button>
        </div>
      )}

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <section className="grid4" aria-label="Product catalogue">
          {filteredProducts.map((p) => (
            <ProductCard key={p.slug} p={p} showAdd />
          ))}
        </section>
      ) : (
        <div className="empty-results-box">
          <Sparkles size={32} className="gold mb" />
          <h2 className="serif big2">No Sacred Vestments Match This Criteria</h2>
          <p className="muted max-w-sm">
            We could not find any vestments matching the selected filters. Try broadening your criteria or reset all filters.
          </p>
          <button
            type="button"
            className="btn mt"
            onClick={clearAllFilters}
          >
            RESET ALL FILTERS
          </button>
        </div>
      )}

      {/* Sankalpa Guarantee & Craft Assurances */}
      <Guarantee />

      <section className="assure" aria-label="Craft Assurances">
        <div>
          <h3 className="caps sm">100% AHIMSA CERTIFIED SILK</h3>
          <p className="muted sm">
            Mulberry silk harvested post-emergence without harming the living moth, preserving sacred Ahimsa vows.
          </p>
        </div>
        <div>
          <h3 className="caps sm">AUTHENTIC ECCLESIASTICAL WORSTED WOOL</h3>
          <p className="muted sm">
            Pure breathable tropical wool conforming to canonical Roman and diocesan guidelines.
          </p>
        </div>
      </section>
    </div>
  );
}

export default function ShopClient() {
  return (
    <Suspense fallback={<div className="wrap page"><p className="muted">Loading sacred catalogue...</p></div>}>
      <ShopContent />
    </Suspense>
  );
}

