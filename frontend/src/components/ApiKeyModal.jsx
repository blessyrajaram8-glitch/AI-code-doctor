import React, { useState } from 'react';
import { X, Key, Check } from 'lucide-react';

export default function ApiKeyModal({ isOpen, onClose, onSave, currentKey }) {
  const [key, setKey] = useState(currentKey || '');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(key);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Key size={20} color="var(--primary)" />
            <h3 className="modal-title">Gemini API Key Settings</h3>
          </div>
          <button className="btn-icon" style={{ padding: '0.3rem' }} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Enter your custom Google Gemini API Key to enable AI code doctor analysis. Your key is stored securely in your browser's local storage.
            </p>
            <input
              type="password"
              className="input-field"
              placeholder="AIzaSy..."
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
            <p style={{ fontSize: '0.75rem', color: 'var(--text-dark)', marginTop: '0.4rem' }}>
              Note: If left empty, the application uses internal diagnostic heuristics.
            </p>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-icon" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-analyze" style={{ padding: '0.5rem 1.25rem' }}>
              <Check size={16} />
              <span>Save Key</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
