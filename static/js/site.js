document.addEventListener('DOMContentLoaded', () => {
  const data = {
    'rlbench-bars': [['OpenVLA',40],['SpatialVLA',46],['CogACT',61],['CoT-VLA',66],['π₀.₅',65],['HybridVLA',74],['QwenVLA-OFT',69],['DeepVision-VLA',83]],
    'real-bars': [['OpenVLA-OFT',66.9],['QwenVLA-OFT',73.8],['π₀.₅',81.3],['DeepVision-VLA',89.4]],
  };
  for (const [id, rows] of Object.entries(data)) {
    const container = document.getElementById(id);
    rows.forEach(([name, score]) => {
      const row = document.createElement('div');
      row.className = 'bar-row' + (name === 'DeepVision-VLA' ? ' ours' : '');
      row.innerHTML = `<span class="bar-name"></span><div class="bar-track" aria-hidden="true"><div class="bar-value"></div></div><span class="bar-score"></span>`;
      row.querySelector('.bar-name').textContent = name;
      row.querySelector('.bar-value').style.width = score + '%';
      row.querySelector('.bar-score').textContent = score.toFixed(Number.isInteger(score) ? 0 : 1) + '%';
      container.append(row);
    });
  }
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  function selectTab(tab, focus = false) {
    tabs.forEach(item => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
      const panel = document.getElementById(item.getAttribute('aria-controls'));
      panel.hidden = !selected;
      if (!selected) panel.querySelectorAll('video').forEach(video => video.pause());
    });
    if (focus) tab.focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); selectTab(tabs[next], true); }
    });
  });
  const dialog = document.getElementById('figure-dialog');
  const expanded = document.getElementById('expanded-figure');
  document.querySelectorAll('[data-lightbox]').forEach(button => button.addEventListener('click', () => {
    expanded.src = button.dataset.lightbox;
    expanded.alt = button.querySelector('img').alt;
    dialog.showModal();
  }));
  document.getElementById('close-figure').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  const copy = document.getElementById('copy-citation');
  copy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(document.getElementById('bibtex-code').textContent);
      copy.textContent = 'Copied';
      document.getElementById('copy-status').textContent = 'BibTeX copied to clipboard.';
      setTimeout(() => { copy.textContent = 'Copy BibTeX'; }, 2500);
    } catch {
      const range = document.createRange();
      range.selectNodeContents(document.getElementById('bibtex-code'));
      window.getSelection().removeAllRanges(); window.getSelection().addRange(range);
      document.getElementById('copy-status').textContent = 'Citation selected. Press Control+C or Command+C to copy.';
    }
  });
  const hero = document.getElementById('hero-video');
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) hero.play().catch(() => {}); else hero.pause();
    }), {threshold: .3});
    observer.observe(hero);
  }
});
