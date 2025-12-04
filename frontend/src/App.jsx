import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [inputText, setInputText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isReverse, setIsReverse] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  const handleTranslate = async () => {
    if (!inputText.trim()) return

    setIsLoading(true)
    try {
      const endpoint = isReverse ? '/reverse' : '/translate'
      const response = await fetch(`http://localhost:3001${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      })

      const data = await response.json()
      setTranslatedText(data.translated)
    } catch (error) {
      console.error('Translation error:', error)
      setTranslatedText('Translation failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(translatedText)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (error) {
      console.error('Copy failed:', error)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleTranslate()
    }
  }

  return (
    <div className="app-container">
      {showIntro && (
        <div className="star-wars-intro">
          <div className="intro-text">
            <p>A long time ago in a galaxy far, far away....</p>
          </div>
        </div>
      )}
      
      <div className="stars"></div>
      <div className="twinkling"></div>
      
      <div className="content-wrapper">
        <header className="header">
          <div className="logo-container">
            <div className="empire-logo">⬡</div>
            <h1 className="title">
              <span className="title-main">GALACTIC TRANSLATOR</span>
              <span className="title-sub">⟨ AUREBESH STANDARD ⟩</span>
            </h1>
            <div className="rebel-logo">✦</div>
          </div>
        </header>

        <main className="main-content">
          <div className="translator-card">
            {/* Status Bar */}
            <div className="status-bar">
              <span className="status-item">⚡ PROTOCOL DROID TRANSLATION MATRIX</span>
              <span className="status-item pulse">● ONLINE</span>
            </div>

            {/* Mode Toggle */}
            <div className="mode-toggle">
              <button
                onClick={() => setIsReverse(false)}
                className={`toggle-btn ${!isReverse ? 'active' : ''}`}
              >
                <span className="btn-icon">▶</span> BASIC → AUREBESH
              </button>
              <button
                onClick={() => setIsReverse(true)}
                className={`toggle-btn ${isReverse ? 'active' : ''}`}
              >
                <span className="btn-icon">◀</span> AUREBESH → BASIC
              </button>
            </div>

            {/* Input Section */}
            <div className="input-section">
              <label className="section-label">
                <span className="label-icon">◈</span>
                {isReverse ? 'AUREBESH INPUT BUFFER' : 'GALACTIC BASIC INPUT'}
                <span className="char-count">{inputText.length} CHARACTERS</span>
              </label>
              <div className="terminal-wrapper">
                <div className="terminal-header">
                  <span className="terminal-dots">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                  </span>
                  <span className="terminal-title">TRANSLATION_INTERFACE.HLG</span>
                </div>
                <textarea
                  className="input-textarea"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={
                    isReverse
                      ? '> Enter Aurebesh text (e.g., Aurek-Usk-Resh-Esk-Besh-Esk-Senth-Herf)'
                      : '> Enter Galactic Basic text to translate...'
                  }
                  rows={6}
                />
              </div>
            </div>

            {/* Translate Button */}
            <button
              onClick={handleTranslate}
              disabled={isLoading || !inputText.trim()}
              className="translate-btn"
            >
              {isLoading ? (
                <>
                  <span className="loading-spinner">⟳</span>
                  <span>TRANSLATING...</span>
                </>
              ) : (
                <>
                  <span className="btn-glow"></span>
                  <span>⚡ ENGAGE TRANSLATION PROTOCOL</span>
                </>
              )}
            </button>

            {/* Output Section */}
            {translatedText && (
              <div className="output-section animate-fade-in">
                <div className="output-header">
                  <label className="section-label">
                    <span className="label-icon">◈</span>
                    {isReverse ? 'GALACTIC BASIC OUTPUT' : 'AUREBESH TRANSLATION'}
                  </label>
                  <button
                    onClick={handleCopy}
                    className="copy-btn"
                    title="Copy to clipboard"
                  >
                    {copySuccess ? '✓ TRANSMITTED' : '⎙ COPY DATA'}
                  </button>
                </div>
                <div className="terminal-wrapper">
                  <div className="terminal-header">
                    <span className="terminal-dots">
                      <span className="dot red"></span>
                      <span className="dot yellow"></span>
                      <span className="dot green"></span>
                    </span>
                    <span className="terminal-title">OUTPUT_BUFFER.HLG</span>
                  </div>
                  <div className={`output-text ${!isReverse ? 'aurebesh-font' : ''}`}>
                    <span className="output-prompt">&gt; </span>{translatedText}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="info-section">
            <div className="holocron-tip">
              <span className="tip-icon">◈</span>
              <p className="info-text">
                HOLOCRON TIP: Press <kbd>Ctrl</kbd> + <kbd>Enter</kbd> for rapid translation
              </p>
            </div>
            <div className="features-grid">
              <div className="feature-item">
                <span className="feature-icon">⚡</span>
                <span>Real-time Translation</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">⟲</span>
                <span>Bidirectional</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">⎙</span>
                <span>Copy Support</span>
              </div>
            </div>
          </div>
        </main>

        <footer className="footer">
          <div className="footer-content">
            <p className="footer-text">⟨ IMPERIAL PROTOCOL DROID DIVISION ⟩</p>
            <p className="footer-motto">May the Force be with you, always</p>
            <div className="footer-line"></div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
