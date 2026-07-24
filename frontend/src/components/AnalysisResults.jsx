import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, Copy, Check, Lightbulb, Activity, Stethoscope, Code } from 'lucide-react';

export default function AnalysisResults({ results, loading }) {
  const [activeTab, setActiveTab] = useState('errors');
  const [copied, setCopied] = useState(false);

  if (loading) {
    return (
      <div className="results-card">
        <div className="empty-state">
          <Stethoscope size={48} className="empty-icon spinner" color="var(--primary)" />
          <h3>Examining Code Health...</h3>
          <p style={{ marginTop: '0.5rem', color: 'var(--text-muted)' }}>
            Detecting syntax flaws, logic bugs, memory leaks, and performance optimization opportunities.
          </p>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="results-card">
        <div className="empty-state">
          <Stethoscope size={48} className="empty-icon" />
          <h3>No Diagnosis Yet</h3>
          <p style={{ marginTop: '0.5rem', color: 'var(--text-muted)' }}>
            Enter your code on the left panel and click <strong>"Analyze Code"</strong> to diagnose errors and get instant fixes.
          </p>
        </div>
      </div>
    );
  }

  const handleCopy = () => {
    if (results.correctedCode) {
      navigator.clipboard.writeText(results.correctedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getHealthBadgeClass = (score) => {
    if (score >= 80) return 'good';
    if (score >= 50) return 'warning';
    return 'critical';
  };

  const errorsCount = results.errors ? results.errors.length : 0;
  const suggestionsCount = results.suggestions ? results.suggestions.length : 0;

  return (
    <div className="results-card">
      <div className="results-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Activity size={20} color="var(--primary)" />
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Diagnosis Report</h2>
        </div>

        <div className={`health-badge ${getHealthBadgeClass(results.healthScore || 100)}`}>
          <span>Code Health:</span>
          <strong>{results.healthScore ?? 100} / 100</strong>
        </div>
      </div>

      <div className="tabs-nav">
        <button
          className={`tab-btn ${activeTab === 'errors' ? 'active' : ''}`}
          onClick={() => setActiveTab('errors')}
        >
          <AlertTriangle size={16} />
          <span>Errors & Issues ({errorsCount})</span>
        </button>

        <button
          className={`tab-btn ${activeTab === 'code' ? 'active' : ''}`}
          onClick={() => setActiveTab('code')}
        >
          <Code size={16} />
          <span>Corrected Code</span>
        </button>

        <button
          className={`tab-btn ${activeTab === 'suggestions' ? 'active' : ''}`}
          onClick={() => setActiveTab('suggestions')}
        >
          <Lightbulb size={16} />
          <span>Best Practices ({suggestionsCount})</span>
        </button>
      </div>

      <div className="results-body">
        {results.summary && (
          <div className="summary-box">
            <strong>Diagnosis Summary:</strong> {results.summary}
          </div>
        )}

        {activeTab === 'errors' && (
          <div>
            {errorsCount === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--accent-green)' }}>
                <CheckCircle2 size={40} style={{ marginBottom: '0.5rem' }} />
                <h4>No Errors Detected!</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Your code appears syntactically sound and bug-free.</p>
              </div>
            ) : (
              results.errors.map((err, index) => (
                <div key={index} className="error-card">
                  <div className="error-header">
                    <span className="error-title">{err.type || 'Error'}: {err.message}</span>
                    {err.line && <span className="error-line">Line {err.line}</span>}
                  </div>
                  <div className="error-explanation">{err.explanation}</div>
                  {err.fixTip && (
                    <div className="error-tip">
                      <Lightbulb size={14} />
                      <span><strong>Fix Tip:</strong> {err.fixTip}</span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'code' && (
          <div className="code-view-container">
            <div className="code-view-header">
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Fixed & Optimized Code</span>
              <button className="btn-copy" onClick={handleCopy}>
                {copied ? <Check size={14} color="var(--accent-green)" /> : <Copy size={14} />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>
            <pre className="code-block">
              <code>{results.correctedCode || '// No corrected code available'}</code>
            </pre>
          </div>
        )}

        {activeTab === 'suggestions' && (
          <div>
            {suggestionsCount === 0 ? (
              <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>
                No additional suggestions at this time.
              </div>
            ) : (
              results.suggestions.map((sug, index) => (
                <div key={index} className="suggestion-item">
                  <Lightbulb size={18} color="var(--accent-orange)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>{sug}</div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
