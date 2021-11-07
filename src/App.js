import React, {useEffect, useState} from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const TEST_GIFS = [
  'https://media.giphy.com/media/RfdknH1TGh7j6zXzR8/giphy.gif',
  'https://media.giphy.com/media/VG2AZJD5rseaEeX2t6/giphy.gif',
  'https://media.giphy.com/media/QsbdmCbBPiMZ2yIiSZ/giphy.gif',
  'https://media.giphy.com/media/wZ5kPbU0TXScE/giphy.gif',
  'https://media.giphy.com/media/gLd4D8BDMMQR4Gm9E7/giphy.gif',
  'https://media.giphy.com/media/0LNOkuw3tH9VOq7yAF/giphy.gif',
  'https://media.giphy.com/media/1zgdzxUvJ54bUjmUdu/giphy-downsized.gif',
  'https://media.giphy.com/media/PWhlBLhEdqX5u/giphy.gif',
  'https://media.giphy.com/media/26n6XsLU5UQ63c7V6/giphy-downsized.gif'

]

const App = () => {
  // State
  const [walletAddress, setWalletAddress] = useState(null);

  // Actions
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom wallet found!');
          const response = await solana.connect({ onlyIfTrusted: true });
          console.log(
            'Connected with Public Key:',
            response.publicKey.toString()
          );

          /*
           * Set the user's publicKey in state to be used later!
           */
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert('Solana object not found! Get a Phantom Wallet');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    const { solana } = window;
  
    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

  const renderConnectedContainer = () => (
    <div className="connected-container">
      <div className="gif-grid">
        {TEST_GIFS.map(gif => (
          <div className="gif-item" key={gif}>
            <img src={gif} alt={gif} />
          </div>
        ))}
      </div>
    </div>
  );

  // UseEffects
  useEffect(() => {
    window.addEventListener('load', async (event) => {
      await checkIfWalletIsConnected();
    });
  }, []);

  return (
    <div className="App">
			{/* This was solely added for some styling fanciness */}
			<div className={walletAddress ? 'authed-container' : 'container'}>
        <div className="header-container">
          <div className="header">A Wall of Octopuses</div>
          <div className="sub-text">
            So many brains. So many arms.
          </div>
          <hr className="top" />
          {!walletAddress && renderNotConnectedContainer()}
          {walletAddress && renderConnectedContainer()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noopener noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
