import React from 'react';
import { Play, Trash2, Code2, Loader2 } from 'lucide-react';

const SUPPORTED_LANGUAGES = [
  { id: 'python', label: 'Python' },
  { id: 'javascript', label: 'JavaScript' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'cpp', label: 'C++' },
  { id: 'java', label: 'Java' },
  { id: 'go', label: 'Go' },
  { id: 'rust', label: 'Rust' },
  { id: 'php', label: 'PHP' },
  { id: 'sql', label: 'SQL' }
];

export default function CodeEditor({ code, setCode, language, setLanguage, onAnalyze, loading }) {
  const lineCount = code ? code.split('\n').length : 1;
  const lineNumbersArray = Array.from({ length: lineCount }, (_, i) => i + 1);

  return (
    <div className="editor-card">
      <div className="editor-toolbar">
        <div className="lang-selector">
          <Code2 size={18} color="var(--primary)" />
          <select 
            className="lang-select" 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        <button 
          className="btn-icon" 
          onClick={() => setCode('')} 
          title="Clear Code"
          disabled={!code || loading}
        >
          <Trash2 size={16} />
          <span>Clear</span>
        </button>
      </div>

      <div className="editor-area">
        <div className="line-numbers">
          {lineNumbersArray.map((num) => (
            <span key={num}>{num}</span>
          ))}
        </div>
        <textarea
          className="code-textarea"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={`// Paste or write your ${language.toUpperCase()} code here...\n// Click "Analyze Code" to diagnose errors.`}
          spellCheck="false"
        />
      </div>

      <div className="editor-footer">
        <div className="char-count">
          {lineCount} {lineCount === 1 ? 'line' : 'lines'} | {code.length} characters
        </div>

        <button 
          className="btn-analyze" 
          onClick={onAnalyze} 
          disabled={!code.trim() || loading}
        >
          {loading ? (
            <>
              <Loader2 size={18} className="spinner" />
              <span>Analyzing Code...</span>
            </>
          ) : (
            <>
              <Play size={18} fill="currentColor" />
              <span>Analyze Code</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
