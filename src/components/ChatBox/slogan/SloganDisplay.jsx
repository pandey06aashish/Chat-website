import React, { useState, useEffect } from 'react';

const SloganDisplay = () => {
  const slogans = [
    "Chat, Smile, Repeat!",
    "Where Conversations Spark Joy!",
    "Connecting You with Happiness.",
    "Talk Happy, Stay Happy!",
    "Bringing Smiles, One Chat at a Time.",
    "Chatting Made Cheerful.",
    "Feel Good Conversations, Every Time.",
    "Your Happy Place to Chat.",
    "Brighten Your Day with a Chat.",
    "Happiness Starts with a Conversation.",
    "Chat Your Way to Happiness.",
    "Every Message Brings a Smile.",
    "Where Words Create Joy.",
    "Conversations That Light You Up.",
    "Happy Moments, One Chat at a Time.",
    "Talk, Laugh, Connect.",
    "Spread Joy Through Every Chat.",
    "Bright Conversations, Brighter Days.",
     "Connecting Hearts, One Chat at a Time.",
     "Where Smiles and Conversations Meet."
  ];

  const [slogan, setSlogan] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * slogans.length);
    setSlogan(slogans[randomIndex]);
  }, []);

  return (
    <div>
      {slogan}
    </div>
  );
};

export default SloganDisplay;
