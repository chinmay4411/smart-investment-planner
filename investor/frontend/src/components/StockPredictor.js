import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StockPredictor.css';

const StockPredictor = () => {
  const [selected, setSelected] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5500/stocks/popular')
      .then(res => res.data.success && setPopular(res.data.stocks))
      .catch(console.error);
  }, []);

  const fetchStock = async (sym) => {
    setSelected(sym); setLoading(true); setError('');
    try {
      const analysisRes = await axios.get(`http://127.0.0.1:5500/stock/analyze/${sym}`);
      const predRes = await axios.get(`http://127.0.0.1:5500/stock/predict/${sym}?days=5`);
      if (analysisRes.data.success) setAnalysis(analysisRes.data.analysis);
      if (predRes.data.success) setPrediction(predRes.data.prediction);
    } catch {
      setError('Failed to fetch stock data');
    }
    setLoading(false);
  };

  const trainModel = async () => {
    if (!selected) return;
    setLoading(true);
    try {
      const res = await axios.post(`http://127.0.0.1:5500/stock/train/${selected}`, { period: '2y' });
      if (res.data.success) {
        alert('Model trained!'); fetchStock(selected);
      } else setError(res.data.message);
    } catch {
      setError('Failed to train model');
    }
    setLoading(false);
  };

  const signalColor = (s) => s.includes('Bullish') ? 'green' : s.includes('Bearish') ? 'red' : 'blue';
  const changeColor = (v) => v >= 0 ? 'green' : 'red';

  return (
    <div className="sp-container">
      <h1>Stock Predictor</h1>

      <div className="sp-select">
        {popular.map(stock => (
          <button
            key={stock.symbol}
            className={selected === stock.symbol ? 'sp-btn active' : 'sp-btn'}
            onClick={() => fetchStock(stock.symbol)}
          >
            <div>{stock.symbol}</div>
            <div>{stock.name}</div>
          </button>
        ))}
      </div>

      {error && <div className="sp-error">{error}</div>}
      {loading && <div className="sp-loading">Loading...</div>}

      {analysis && (
        <div className="sp-analysis">
          <h2>{analysis.symbol}</h2>
          <div className="sp-grid">
            <div>Price: <span className="blue">{analysis.current_price.toFixed(2)}</span></div>
            <div>RSI: <span className={changeColor(analysis.rsi-50)}>{analysis.rsi.toFixed(1)}</span></div>
            <div>Vol: { (analysis.volatility*100).toFixed(2) }%</div>
          </div>

          <div className="sp-grid">
            <div>1d: <span className={changeColor(analysis.price_change_1d)}>{analysis.price_change_1d.toFixed(2)}%</span></div>
            <div>5d: <span className={changeColor(analysis.price_change_5d)}>{analysis.price_change_5d.toFixed(2)}%</span></div>
            <div>20d: <span className={changeColor(analysis.price_change_20d)}>{analysis.price_change_20d.toFixed(2)}%</span></div>
          </div>

          <div className="sp-signals">
            {analysis.signals.map((s,i) => <div key={i} className={signalColor(s)}>{s}</div>)}
          </div>
        </div>
      )}

      {prediction && (
        <div className="sp-pred">
          <div>Current: <span className="blue">${prediction.current_price.toFixed(2)}</span></div>
          <div>Predicted ({prediction.days_ahead}d): <span className="green">${prediction.predicted_price.toFixed(2)}</span></div>
          <div>Change: <span className={changeColor(prediction.price_change)}>${prediction.price_change.toFixed(2)}</span></div>
          <div>Change %: <span className={changeColor(prediction.price_change_pct)}>{prediction.price_change_pct.toFixed(2)}%</span></div>
        </div>
      )}

      <div className="sp-actions">
        <button onClick={() => fetchStock(selected)}>Refresh</button>
        <button onClick={trainModel}>Train</button>
      </div>
    </div>
  );
};

export default StockPredictor;
