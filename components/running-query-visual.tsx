export function RunningQueryVisual() {
  return (
    <div className="live-query-feature-visual" aria-hidden="true">
      <div className="hero-operation-console">
        <div className="hero-operation-toolbar">
          <span className="hero-operation-title">
            <i className="hero-operation-live-dot" /> Running queries
          </span>
          <code className="hero-operation-live">LIVE · 3S</code>
        </div>
        <div className="hero-operation-row is-stopping">
          <i />
          <span>
            <code className="hero-operation-command">SELECT sleep(60)</code>
            <small className="hero-operation-meta">analytics · 01:42</small>
          </span>
          <span className="hero-operation-action">
            <b>Stop</b>
            <em>Stopped</em>
          </span>
        </div>
        <div className="hero-operation-row">
          <i />
          <span>
            <code className="hero-operation-command">GROUP BY service</code>
            <small className="hero-operation-meta">events · 00:18</small>
          </span>
          <span className="hero-operation-action">
            <b>Stop</b>
          </span>
        </div>
      </div>
      <span className="hero-principle-caption">Local cancel + KILL QUERY</span>
    </div>
  );
}
