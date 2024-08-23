import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [user, setUser] = useState("");
  const [legacy, setLegacy] = useState(false);
  const [size, setSize] = useState("300");
  const [background, setBackground] = useState("");
  const [autobackgroundcolor, setAutobackgroundcolor] = useState(false);
  const [showurl, setShowurl] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(
    "https://api.legendnation.net/miniavatar/ItxCrazy/300.png?autocolor"
  );

  useEffect(() => {
    const randomPlayers = ["ItxCrazy", "ld338_", "HerobrineHater15", ".ld338"];
    const randomPlayer =
      randomPlayers[Math.floor(Math.random() * randomPlayers.length)];
    setAvatarUrl(
      `https://api.legendnation.net/miniavatar/${randomPlayer}/300.png?autocolor`
    );
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      alert("Please enter a username.");
      return;
    }

    if (background && autobackgroundcolor) {
      alert("You can't use both background and auto background color.");
      return;
    }

    let url = `https://api.legendnation.net/${
      legacy ? "avatar" : "miniavatar"
    }/${user}/${size}.png`;

    if (background) {
      url += `?background=${encodeURIComponent(background)}`;
    }

    if (autobackgroundcolor) {
      url += (background ? "&" : "?") + "autocolor=true";
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Image not found");
      }
      setAvatarUrl(url);
    } catch (error) {
      alert("Error: Unable to generate avatar. Please try again.");
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        handleSubmit(event);
      }
    };

    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [user, legacy, size, background, autobackgroundcolor]);

  return (
    <div className="container">
      <h1>Avatar Generator</h1>
      <div id="result">
        <img id="avatarImage" alt="Avatar" src={avatarUrl} />
        {showurl && (
          <p className="normal-front" id="avatarUrl">
            {avatarUrl}
          </p>
        )}
      </div>
      <form id="avatarForm" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="user">User</label>
          <input
            type="text"
            id="user"
            name="user"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="legacy">Legacy Avatar</label>
          <input
            type="checkbox"
            id="legacy"
            name="legacy"
            checked={legacy}
            onChange={(e) => setLegacy(e.target.checked)}
          />
        </div>
        <div>
          <label htmlFor="size">Size</label>
          <input
            type="text"
            id="size"
            name="size"
            placeholder="e.g., 128, 256, 512"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="background">Background Color</label>
          <input
            type="text"
            id="background"
            name="background"
            placeholder="e.g., red, #ff0000"
            value={background}
            onChange={(e) => setBackground(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="autobackgroundcolor">Auto Background Color</label>
          <input
            type="checkbox"
            id="autobackgroundcolor"
            name="autobackgroundcolor"
            checked={autobackgroundcolor}
            onChange={(e) => setAutobackgroundcolor(e.target.checked)}
          />
        </div>
        <div>
          <label htmlFor="showurl">Show URL</label>
          <input
            type="checkbox"
            id="showurl"
            name="showurl"
            checked={showurl}
            onChange={(e) => setShowurl(e.target.checked)}
          />
        </div>
        <button type="submit">
          <div className="minecraft-front">Generate Avatar</div>
        </button>
      </form>
    </div>
  );
}

export default App;
