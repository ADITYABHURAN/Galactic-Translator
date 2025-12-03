import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Aurebesh character mapping (A-Z to Aurebesh names)
const aurebeshMap = {
  'A': 'Aurek',
  'B': 'Besh',
  'C': 'Cresh',
  'D': 'Dorn',
  'E': 'Esk',
  'F': 'Forn',
  'G': 'Grek',
  'H': 'Herf',
  'I': 'Isk',
  'J': 'Jenth',
  'K': 'Krill',
  'L': 'Leth',
  'M': 'Mern',
  'N': 'Nern',
  'O': 'Osk',
  'P': 'Peth',
  'Q': 'Qek',
  'R': 'Resh',
  'S': 'Senth',
  'T': 'Trill',
  'U': 'Usk',
  'V': 'Vev',
  'W': 'Wesk',
  'X': 'Xesh',
  'Y': 'Yirt',
  'Z': 'Zerek'
};

// Middleware
app.use(cors());
app.use(express.json());

// Translation endpoint
app.post('/translate', (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    // Convert text to Aurebesh
    const translated = text
      .toUpperCase()
      .split('')
      .map(char => {
        if (aurebeshMap[char]) {
          return aurebeshMap[char];
        }
        // Keep spaces and punctuation as is
        return char === ' ' ? ' ' : char;
      })
      .join('-')
      .replace(/--/g, ' ') // Replace double dashes with spaces
      .replace(/- /g, ' ') // Clean up dash-space combos
      .replace(/ -/g, ' '); // Clean up space-dash combos

    res.json({ translated });
  } catch (error) {
    res.status(500).json({ error: 'Translation failed' });
  }
});

// Reverse translation endpoint
app.post('/reverse', (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    // Create reverse map
    const reverseMap = {};
    Object.keys(aurebeshMap).forEach(key => {
      reverseMap[aurebeshMap[key].toLowerCase()] = key;
    });

    // Convert Aurebesh back to English
    const words = text.split(' ');
    const translated = words.map(word => {
      const chars = word.split('-');
      return chars.map(char => {
        const lowerChar = char.toLowerCase();
        return reverseMap[lowerChar] || char;
      }).join('');
    }).join(' ');

    res.json({ translated });
  } catch (error) {
    res.status(500).json({ error: 'Reverse translation failed' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Galactic Translator API is running' });
});

app.listen(PORT, () => {
  console.log(`🌌 Galactic Translator API running on http://localhost:${PORT}`);
});
