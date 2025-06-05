import { useState, useEffect } from 'react';
// import styles from './quotegenerator.css';

const QuoteGenerator = () => {
  const [quotes, setQuotes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch('https://dummyjson.com/quotes');
        if (!response.ok) throw new Error('Failed to fetch quotes');
        const data = await response.json();
        setQuotes(data.quotes);
        setCurrentIndex(Math.floor(Math.random() * data.quotes.length));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQuotes();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
       (prevIndex - 1 + quotes.length) % quotes.length
    );
  };

  if (loading) return <div className="loading">Loading quotes...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!quotes.length) return <div className="empty">No quotes found</div>;

  const currentQuote = quotes[currentIndex];

  return (
    <div className="container">
      <h1>Quote Generator</h1>
      
      <blockquote className="quote">
        "{currentQuote.quote}"
      </blockquote>
      
      <p className="author">— {currentQuote.author}</p>
      
      <div className="buttons">
        <button onClick={handlePrev} className="button">
          Previous
        </button>
        <button onClick={handleNext} className="button">
          Next
        </button>
      </div>
      
      <p className="counter">
        Quote {currentIndex + 1} of {quotes.length}
      </p>
    </div>
  );
};

export default QuoteGenerator;