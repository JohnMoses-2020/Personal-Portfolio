import marinersLogo from './seattle-mariners.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [nextGame, setNextGame] = useState(null);
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    // This would normally fetch from MLB API
    // Mocked data for example
    const gameInfo = {
      opponent: "Oakland Athletics",
      date: "March 27, 2025",
      time: "7:10 PM PT",
      location: "T-Mobile Park"
    };
    
    setNextGame(gameInfo);
    
    // Create a Date object for the game time
    // Parse date string properly to avoid timezone issues
    const parseGameDate = () => {
      // Parse date components
      const dateParts = gameInfo.date.split(" ");
      const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].indexOf(dateParts[0]);
      const day = parseInt(dateParts[1].replace(",", ""));
      const year = parseInt(dateParts[2]);
      
      // Parse time components
      const timeParts = gameInfo.time.split(" ");
      const timeValue = timeParts[0].split(":");
      const hours = parseInt(timeValue[0]);
      const minutes = parseInt(timeValue[1]);
      const isPM = timeParts[1] === "PM";
      
      // Create date object (adjust for PM)
      const date = new Date(year, month, day);
      date.setHours(isPM && hours < 12 ? hours + 12 : hours);
      date.setMinutes(minutes);
      date.setSeconds(0);
      
      return date;
    };
    
    const gameDate = parseGameDate();
    
    // Set up the countdown timer
    const timer = setInterval(() => {
      const now = new Date();
      const difference = gameDate - now;
      
      // If the game date is in the past, clear the interval
      if (difference < 0) {
        clearInterval(timer);
        setCountdown("Game has already started!");
        return;
      }
      
      // Calculate time units
      const weeks = Math.floor(difference / (1000 * 60 * 60 * 24 * 7));
      const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      // Format the countdown
      setCountdown({
        weeks,
        days,
        hours,
        minutes,
        seconds
      });
    }, 1000);
    
    // Clean up the interval on component unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="App" style={{ backgroundColor: '#0C2C56' }}>
      <header className="App-header" style={{ backgroundColor: '#005C5C' }}>
        <img 
          src={marinersLogo} 
          className="App-logo" 
          alt="Seattle Mariners logo"
          style={{ height: '200px' }}
        />
        <h1 style={{ color: '#C4CED4' }}>
          Welcome to John's Mariners Fan Portfolio!
        </h1>
        <p style={{ color: '#C4CED4' }}>
          Passionate Seattle Mariners Fan & Web Developer
        </p>
        {nextGame && (
          <div style={{ 
            backgroundColor: '#0C2C56', 
            padding: '20px', 
            borderRadius: '10px',
            margin: '20px'
          }}>
            <h2 style={{ color: '#C4CED4' }}>Next Game:</h2>
            <p style={{ color: '#C4CED4' }}>
              {nextGame.opponent}<br/>
              {typeof countdown === 'string' ? countdown : (
                countdown ? (
                  <>
                    <span style={{ fontWeight: 'bold' }}>Countdown: </span>
                    {countdown.weeks > 0 && `${countdown.weeks} week${countdown.weeks !== 1 ? 's' : ''}, `}
                    {countdown.days > 0 && `${countdown.days} day${countdown.days !== 1 ? 's' : ''}, `}
                    {countdown.hours.toString().padStart(2, '0')}:
                    {countdown.minutes.toString().padStart(2, '0')}:
                    {countdown.seconds.toString().padStart(2, '0')}
                  </>
                ) : "Calculating..."
              )}<br/>
              {nextGame.date} at {nextGame.time}<br/>
              {nextGame.location}
            </p>
          </div>
        )}
        <a
          className="App-link"
          href="https://www.mlb.com/mariners"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#005C5C', backgroundColor: '#C4CED4', padding: '10px', borderRadius: '5px' }}
        >
          Visit Official Mariners Site
        </a>
      </header>
    </div>
  );
}

export default App;
