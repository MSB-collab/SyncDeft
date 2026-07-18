
import React, { useEffect, useRef, useState } from 'react';
import './Template.css';

// --- CONFIGURATION ---
const CONFIG = {
  itemCount: 20,
  starCount: 150,
  zGap: 800,
  loopSize: 0,
  idleSpeed: 0.5,        // baseline "auto" flythrough speed (units/ms) when idle
  scrollMultiplier: 0.9, // how strongly real scroll boosts the camera
  scrollFriction: 0.92,  // how fast the scroll boost decays back to idle
  maxScrollDelta: 120,   // clamps a single scroll tick so big jumps (e.g. first
                          // event, resize, anchor jumps) can't cause a huge spike
  colors: ['#f9c349', '#00f3ff', '#f9c349', '#ffffff']
};

const TEXTS = ["AI AUTOMATION", "WEB DEVELOPMENT", "APPLICATION DEVELOPMENT", "AI AGENTS DEVELOPMENT", "FULL STACK DEVELOPMENT", "AI-ENGINEERED MARKETING", "CLOUD SOLUTIONS", "AI SOLUTIONS", "UI/UX DESIGN", "CUSTOM SOFTWARE DEVELOPMENT"];

// Resolves the scrollTop of whatever element actually fired the scroll
// event — works whether it's window/document or a nested scrollable div.
const getScrollTopFromEvent = (e) => {
  const target = e.target;
  if (target === document || target === window) {
    return document.scrollingElement ? document.scrollingElement.scrollTop : window.scrollY;
  }
  if (typeof target.scrollTop === 'number') {
    return target.scrollTop;
  }
  return window.scrollY;
};

const Template = () => {
  const containerRef = useRef(null);
  const worldRef = useRef(null);
  const viewportRef = useRef(null);
  const itemsRef = useRef([]);
  const frameRef = useRef(null);
  const lastTimeRef = useRef(0);
  const isVisibleRef = useRef(true);

  const [fps, setFps] = useState(60);
  const [velocity, setVelocity] = useState(0);
  const [scrollPos, setScrollPos] = useState(0);

  const stateRef = useRef({
    scroll: 0,           // virtual camera Z position
    scrollBoost: 0,       // extra speed injected by real scroll, decays over time
    lastScrollTop: null,  // null until first real scroll event resolves it
    mouseX: 0,
    mouseY: 0
  });

  useEffect(() => {
    CONFIG.loopSize = CONFIG.itemCount * CONFIG.zGap;

    const world = worldRef.current;
    const items = [];

    // Create Items
    for (let i = 0; i < CONFIG.itemCount; i++) {
      const el = document.createElement('div');
      el.className = 'item';

      const isHeading = i % 4 === 0;

      if (isHeading) {
        const txt = document.createElement('div');
        txt.className = 'big-text';
        txt.innerText = TEXTS[i % TEXTS.length];
        el.appendChild(txt);
        items.push({
          el, type: 'text',
          x: 0, y: 0, rot: 0,
          baseZ: -i * CONFIG.zGap
        });
      } else {
        const card = document.createElement('div');
        card.className = 'card';
        const randId = Math.floor(Math.random() * 9999);
        card.innerHTML = `
          <div class="card-header">
            <span class="card-id">ID-${randId}</span>
            <div style="width: 10px; height: 10px; background: var(--accent);"></div>
          </div>
          <h2>${TEXTS[i % TEXTS.length]}</h2>
          <div class="card-footer">
            <span>GRID: ${Math.floor(Math.random() * 10)}x${Math.floor(Math.random() * 10)}</span>
            <span>DATA_SIZE: ${(Math.random() * 100).toFixed(1)}MB</span>
          </div>
          <div style="position:absolute; bottom:2rem; right:2rem; font-size:4rem; opacity:0.1; font-weight:900;">0${i}</div>
        `;
        el.appendChild(card);

        const angle = (i / CONFIG.itemCount) * Math.PI * 6;
        const x = Math.cos(angle) * (window.innerWidth * 0.3);
        const y = Math.sin(angle) * (window.innerHeight * 0.3);
        const rot = (Math.random() - 0.5) * 30;

        items.push({
          el, type: 'card',
          x, y, rot,
          baseZ: -i * CONFIG.zGap
        });
      }
      world.appendChild(el);
    }

    // Create Stars
    for (let i = 0; i < CONFIG.starCount; i++) {
      const el = document.createElement('div');
      el.className = 'star';
      world.appendChild(el);
      items.push({
        el, type: 'star',
        x: (Math.random() - 0.5) * 3000,
        y: (Math.random() - 0.5) * 3000,
        baseZ: -Math.random() * CONFIG.loopSize
      });
    }

    itemsRef.current = items;

    // --- MOUSE PARALLAX (scoped to this component's own bounds) ---
    const handleMouseMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      stateRef.current.mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      stateRef.current.mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // --- REAL SCROLL feeds the camera ---
    // Capture phase so we catch scroll events fired on ANY scrollable
    // element (window, document, or a nested div such as .home-container),
    // not just window itself.
    const handleScroll = (e) => {
      const state = stateRef.current;
      const currentTop = getScrollTopFromEvent(e);

      if (state.lastScrollTop === null) {
        // First event: just establish the baseline, don't inject a
        // boost (avoids a big spike from the initial scroll position).
        state.lastScrollTop = currentTop;
        return;
      }

      let delta = currentTop - state.lastScrollTop;
      state.lastScrollTop = currentTop;

      // Clamp so any abrupt jump (e.g. anchor navigation) can't spike the scene
      delta = Math.max(-CONFIG.maxScrollDelta, Math.min(CONFIG.maxScrollDelta, delta));

      state.scrollBoost += delta * CONFIG.scrollMultiplier;
    };
    window.addEventListener('scroll', handleScroll, { capture: true, passive: true });

    // --- Only animate while the section is actually on screen (perf) ---
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    if (containerRef.current) observer.observe(containerRef.current);

    // --- RAF LOOP ---
    const raf = (time) => {
      frameRef.current = requestAnimationFrame(raf);

      if (!isVisibleRef.current) {
        lastTimeRef.current = time;
        return;
      }

      const delta = time - (lastTimeRef.current || time);
      lastTimeRef.current = time;
      if (delta > 0 && time % 10 < 1) setFps(Math.round(1000 / delta));

      const state = stateRef.current;

      // Scroll boost decays back toward 0 (idle autoplay takes back over)
      state.scrollBoost *= CONFIG.scrollFriction;

      const combinedSpeed = CONFIG.idleSpeed + state.scrollBoost;
      state.scroll += combinedSpeed * (delta || 16);

      setVelocity(Math.abs(combinedSpeed));
      setScrollPos(state.scroll);

      const tiltX = state.mouseY * 5 - state.scrollBoost * 0.4;
      const tiltY = state.mouseX * 5;

      if (worldRef.current) {
        worldRef.current.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      }

      // Perspective pulses slightly with speed
      const baseFov = 1000;
      const fov = baseFov - Math.min(Math.abs(state.scrollBoost) * 8, 500);
      if (viewportRef.current) {
        viewportRef.current.style.perspective = `${fov}px`;
      }

      const cameraZ = state.scroll;

      itemsRef.current.forEach(item => {
        let relZ = item.baseZ + cameraZ;
        const modC = CONFIG.loopSize;
        let vizZ = ((relZ % modC) + modC) % modC;
        if (vizZ > 500) vizZ -= modC;

        let alpha = 1;
        if (vizZ < -3000) alpha = 0;
        else if (vizZ < -2000) alpha = (vizZ + 3000) / 1000;
        if (vizZ > 100 && item.type !== 'star') alpha = 1 - ((vizZ - 100) / 400);
        if (alpha < 0) alpha = 0;

        item.el.style.opacity = alpha;

        if (alpha > 0) {
          let trans = `translate3d(${item.x}px, ${item.y}px, ${vizZ}px)`;

          if (item.type === 'star') {
            const stretch = Math.max(1, Math.min(1 + Math.abs(state.scrollBoost) * 0.15, 10));
            trans += ` scale3d(1, 1, ${stretch})`;
          } else if (item.type === 'text') {
            trans += ` rotateZ(${item.rot}deg)`;
            if (Math.abs(state.scrollBoost) > 1) {
              const offset = Math.min(Math.abs(state.scrollBoost), 15);
              item.el.style.textShadow = `${offset}px 0 red, ${-offset}px 0 cyan`;
            } else {
              item.el.style.textShadow = 'none';
            }
          } else {
            const t = time * 0.001;
            const float = Math.sin(t + item.x) * 10;
            trans += ` rotateZ(${item.rot}deg) rotateY(${float}deg)`;
          }

          item.el.style.transform = trans;
        }
      });
    };

    frameRef.current = requestAnimationFrame(raf);

    // --- CLEANUP ---
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll, { capture: true });
      observer.disconnect();
      itemsRef.current.forEach(item => {
        if (item.el && item.el.parentNode) item.el.parentNode.removeChild(item.el);
      });
      itemsRef.current = [];
    };
  }, []);

  return (
    <div className="template-container" ref={containerRef}>
      {/* OVERLAYS */}
      <div className="scanlines"></div>
      <div className="vignette"></div>
      <div className="noise"></div>

      {/* HUD */}
      <div className="hud">
        <div className="hud-top">
          
          
          
        </div>
       
        
      </div>

      {/* 3D WORLD */}
      <div className="viewport" ref={viewportRef}>
        <div className="world" ref={worldRef}></div>
      </div>
    </div>
  );
};

export default Template;