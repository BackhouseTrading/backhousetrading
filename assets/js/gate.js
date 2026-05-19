(function () {
  var KEY  = 'bt_access';
  var PASS = 'airstream';

  if (sessionStorage.getItem(KEY) === '1') return;

  // Hide page immediately to prevent flash of content
  document.documentElement.style.visibility = 'hidden';

  document.addEventListener('DOMContentLoaded', function () {
    var gate = document.createElement('div');
    gate.id = 'bt-gate';
    gate.innerHTML = [
      '<div id="bt-gate-card">',
      '  <div id="bt-gate-logo">',
      '    <svg width="36" height="36" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">',
      '      <rect width="32" height="32" rx="6" fill="#1854D0"/>',
      '      <text x="6" y="23" font-family="Inter,sans-serif" font-size="18" font-weight="800" fill="white">B</text>',
      '    </svg>',
      '    <span>Backhouse Trading</span>',
      '  </div>',
      '  <p id="bt-gate-label">This site is password protected.</p>',
      '  <form id="bt-gate-form" autocomplete="off">',
      '    <input id="bt-gate-input" type="password" placeholder="Enter password" autocomplete="current-password" />',
      '    <p id="bt-gate-error">Incorrect password. Please try again.</p>',
      '    <button type="submit">Continue</button>',
      '  </form>',
      '</div>'
    ].join('');

    // Inline styles so the gate works before any stylesheet loads
    var css = [
      '#bt-gate{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;',
        'background:#08152A;font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;}',
      '#bt-gate-card{background:#0D1F3C;border:1px solid rgba(255,255,255,0.08);border-radius:12px;',
        'padding:40px 36px;width:100%;max-width:380px;box-shadow:0 24px 64px rgba(0,0,0,0.5);}',
      '#bt-gate-logo{display:flex;align-items:center;gap:10px;margin-bottom:28px;}',
      '#bt-gate-logo span{color:#fff;font-size:15px;font-weight:700;letter-spacing:-0.01em;}',
      '#bt-gate-label{color:rgba(255,255,255,0.55);font-size:13px;margin-bottom:20px;}',
      '#bt-gate-input{width:100%;padding:11px 14px;border-radius:7px;border:1px solid rgba(255,255,255,0.14);',
        'background:rgba(255,255,255,0.06);color:#fff;font-size:15px;font-family:inherit;outline:none;',
        'transition:border-color 150ms ease;display:block;margin-bottom:8px;}',
      '#bt-gate-input:focus{border-color:#1854D0;}',
      '#bt-gate-input::placeholder{color:rgba(255,255,255,0.3);}',
      '#bt-gate-error{color:#f87171;font-size:12px;margin-bottom:12px;display:none;}',
      '#bt-gate-form button{width:100%;padding:11px;border-radius:7px;border:none;cursor:pointer;',
        'background:#1854D0;color:#fff;font-size:15px;font-weight:600;font-family:inherit;',
        'transition:background 150ms ease;margin-top:4px;}',
      '#bt-gate-form button:hover{background:#1242AD;}'
    ].join('');

    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
    document.body.appendChild(gate);
    document.body.style.overflow = 'hidden';

    // Reveal page with gate overlaid
    document.documentElement.style.visibility = 'visible';

    var input = document.getElementById('bt-gate-input');
    var error = document.getElementById('bt-gate-error');
    input.focus();

    document.getElementById('bt-gate-form').addEventListener('submit', function (e) {
      e.preventDefault();
      if (input.value === PASS) {
        sessionStorage.setItem(KEY, '1');
        gate.remove();
        document.body.style.overflow = '';
      } else {
        error.style.display = 'block';
        input.value = '';
        input.focus();
      }
    });
  });
})();
