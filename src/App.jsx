import React, { useState, useEffect, useRef } from "react";

export default function App() {
  const containerRef = useRef(null);

  const [noPosition, setNoPosition] = useState({ top: 60, left: 55 });
  const [noTries, setNoTries] = useState(0);
  const [showAngryCat, setShowAngryCat] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [openedEnvelope, setOpenedEnvelope] = useState(false);
  const [emojiStep, setEmojiStep] = useState(0);
  const [yesScale, setYesScale] = useState(1);

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
  }, []);

  const moveNoButton = () => {
    if (!containerRef.current) return;
    const container = containerRef.current.getBoundingClientRect();
    const buttonWidth = 120;
    const buttonHeight = 50;
    const maxTop = container.height - buttonHeight;
    const maxLeft = container.width - buttonWidth;

    const randomTop = Math.random() * maxTop;
    const randomLeft = Math.random() * maxLeft;

    setNoPosition({
      top: (randomTop / container.height) * 100,
      left: (randomLeft / container.width) * 100,
    });

    setNoTries((prev) => prev + 1);
    setYesScale((prev) => Math.min(prev + 0.15, 3));

    if (noTries + 1 >= 4) {
      setShowAngryCat(true);
    }
  };

  const emojiMessages = [
    {
      emoji: "🌸",
      text: "Here is a flower because my life got lovie dovie after you entered it 💕",
    },
    {
      emoji: "🍫",
      text: "Chocolate because you are so sweet and I melt for you 😩❤️",
    },
    { emoji: "🌍", text: "The world because you became my whole universe 😭" },
  ];

  const containerStyle = {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
    background: accepted
      ? "linear-gradient(135deg, #ffb6e6, #ff66cc)"
      : "linear-gradient(135deg, #ffe6f0, #ffd6eb)",
    fontFamily: "'Arial', sans-serif",
    color: "#333", // FORCING TEXT TO BE DARK GREY
  };

  if (accepted) {
    return (
      <div ref={containerRef} style={containerStyle}>
        {!openedEnvelope ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src="https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif"
              alt="Dancing Cat"
              style={{
                width: "180px",
                borderRadius: "20px",
                marginBottom: "20px",
              }}
            />
            <button
              onClick={() => setOpenedEnvelope(true)}
              style={{
                background: "white",
                padding: "15px 25px",
                borderRadius: "20px",
                border: "none",
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                color: "#ff4da6",
                fontSize: "18px",
              }}
            >
              ✉️ Open your letter
            </button>
          </div>
        ) : (
          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "25px",
              maxWidth: "80%",
              width: "350px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              color: "#444",
            }}
          >
            {emojiStep < emojiMessages.length ? (
              <div
                onClick={() => setEmojiStep(emojiStep + 1)}
                style={{ cursor: "pointer" }}
              >
                <div style={{ fontSize: "60px", marginBottom: "15px" }}>
                  {emojiMessages[emojiStep].emoji}
                </div>
                <p style={{ fontWeight: "bold" }}>
                  {emojiMessages[emojiStep].text}
                </p>
                <small style={{ color: "#999" }}>Tap to continue...</small>
              </div>
            ) : (
              <div style={{ direction: "rtl" }}>
                <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
                  كل فلانتين واحنا مع بعض يا حبيبتي ان شاء الله الفلانتين الي
                  جاي مخطوبين. ربنا العالم قد ايه انا بحبك وقد ايه انت مالية
                  عليا حياتي رغم انك فرعونة صغيرة و مربياني بس بحبك و بموت فيكي
                  ❤️
                </p>
                <h3 style={{ direction: "ltr", color: "#ff4da6" }}>
                  Happy Valentines to my favorite diva 💖
                </h3>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={containerRef} style={containerStyle}>
      <h1 style={{ color: "#d63384", marginBottom: "40px", padding: "0 20px" }}>
        Will you be my Valentine? 💘
      </h1>

      <button
        style={{
          padding: "12px 30px",
          fontSize: "20px",
          borderRadius: "50px",
          border: "none",
          cursor: "pointer",
          backgroundColor: "#ff4da6",
          color: "white",
          zIndex: 10,
          transform: `scale(${yesScale})`,
          transition: "transform 0.2s ease",
          boxShadow: "0 4px 15px rgba(255, 77, 166, 0.4)",
        }}
        onClick={() => setAccepted(true)}
      >
        Yes!
      </button>

      <button
        style={{
          width: "100px",
          height: "45px",
          borderRadius: "50px",
          border: "none",
          cursor: "pointer",
          backgroundColor: "#555",
          color: "white",
          position: "absolute",
          top: `${noPosition.top}%`,
          left: `${noPosition.left}%`,
          transition: "all 0.2s ease",
        }}
        onMouseEnter={moveNoButton}
        onClick={moveNoButton}
      >
        No
      </button>

      {showAngryCat && (
        <div style={{ position: "absolute", bottom: "30px", color: "#d63384" }}>
          <img
            src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif"
            alt="Angry Cat"
            style={{ width: "100px", borderRadius: "10px" }}
          />
          <p>Kokyy stop messing with meee 😭</p>
        </div>
      )}
    </div>
  );
}
