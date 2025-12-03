import { useState } from 'react'
import './App.css'

function App() {
  const [inputText, setInputText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isReverse, setIsReverse] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)

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
      <div className="content-wrapper">
        <header className="header">
          <h1 className="title">
            <span className="title-main">GALACTIC TRANSLATOR</span>
            <span className="title-sub">English ⟷ Aurebesh</span>
          </h1>
        </header>

        <main className="main-content">
          <div className="translator-card">
            {/* Mode Toggle */}
            <div className="mode-toggle">
              <button
                onClick={() => setIsReverse(false)}
                className={`toggle-btn ${!isReverse ? 'active' : ''}`}
              >
                English → Aurebesh
              </button>
              <button
                onClick={() => setIsReverse(true)}
                className={`toggle-btn ${isReverse ? 'active' : ''}`}
              >
                Aurebesh → English
              </button>
            </div>

            {/* Input Section */}
            <div className="input-section">
              <label className="section-label">
                {isReverse ? 'Aurebesh Input' : 'English Input'}
              </label>
              <textarea
                className="input-textarea"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={
                  isReverse
                    ? 'Enter Aurebesh text (e.g., Aurek-Usk-Resh-Esk-Besh-Esk-Senth-Herf)'
                    : 'Enter English text to translate...'
                }
                rows={6}
              />
            </div>

            {/* Translate Button */}
            <button
              onClick={handleTranslate}
              disabled={isLoading || !inputText.trim()}
              className="translate-btn"
            >
              {isLoading ? (
                <span className="loading-spinner">⟳</span>
              ) : (
                'Translate'
              )}
            </button>

            {/* Output Section */}
            {translatedText && (
              <div className="output-section animate-fade-in">
                <div className="output-header">
                  <label className="section-label">
                    {isReverse ? 'English Translation' : 'Aurebesh Translation'}
                  </label>
                  <button
                    onClick={handleCopy}
                    className="copy-btn"
                    title="Copy to clipboard"
                  >
                    {copySuccess ? '✓ Copied!' : '📋 Copy'}
                  </button>
                </div>
                <div className={`output-text ${!isReverse ? 'aurebesh-font' : ''}`}>
                  {translatedText}
                </div>
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="info-section">
            <p className="info-text">
              💡 Press <kbd>Ctrl</kbd> + <kbd>Enter</kbd> to translate quickly
            </p>
          </div>
        </main>

        <footer className="footer">
          <p>May the Force be with you</p>
        </footer>
      </div>
    </div>
  )
}

export default App
