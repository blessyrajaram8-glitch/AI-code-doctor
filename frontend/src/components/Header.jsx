import React from 'react';
import { Stethoscope, Key, Sparkles } from 'lucide-react';

export default function Header({ samples, selectedSample, onSelectSample, onOpenApiKeyModal, apiKeyConfigured }) {
  return (
    <header className="app-header">
      <div className="brand">
        <div className="brand-icon">
          <Stethoscope size={22} />
        </div>
        <div>
          <h1 className="brand-title">AI Code Doctor</h1>
          <div className="brand-tagline">Syntax, Bug & Logic Analyzer</div>
        </div>
      </div>

      <div className="header-actions">
        <select 
          className="sample-select"
          value={selectedSample}
          onChange={(e) => onSelectSample(e.target.value)}
        >
          <option value="">-- Load Buggy Sample --</option>
          {Object.keys(samples).map((langKey) => (
            <option key={langKey} value={langKey}>
              {samples[langKey].title}
            </option>
          ))}
        </select>

        <button className="btn-icon" onClick={onOpenApiKeyModal}>
          <Key size={16} color={apiKeyConfigured ? '#10b981' : '#94a3b8'} />
          <span>{apiKeyConfigured ? 'API Key Active' : 'Configure API Key'}</span>
        </button>
      </div>
    </header>
  );
}
