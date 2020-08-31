import React, { useState, useLayoutEffect, useRef } from "react";
import { AnimateOnChange } from "react-animation";
import styled from "styled-components";

import "./Animation.scss";

export default () => {
  const words = [
    "Maniac",
    "Techno",
    "Trance",
    "Ciraz",
    "Pryda",
    "Anna",
    "Tech",
    "Minimal",
    "House",
    "EDM",
    "Hip Hop",
    "Boris Brejcha",
    "Adam Bayer",
    "Armin V Burren",
    "Above and Beyond",
  ];

  const [current, setCurrent] = useState(0);
  const [currentWidth, setCurrentWidth] = useState(0);
  const [currentTextStyle, setCurrentTextStyle] = useState({});
  const currentTextRef = useRef();
  const nextTextRef = useRef();

  const nextItem = (current) => {
    if (current === words.length - 1) {
      return 0;
    } else {
      return current + 1;
    }
  };

  useLayoutEffect(() => {
    const interval = setInterval(() => {
      setCurrent(nextItem(current));
      nextTextRef.current.innerText = words[nextItem(current)];
      const nextTextSize = nextTextRef.current.offsetWidth;
      setCurrentWidth(nextTextRef.current.offsetWidth);
      setCurrentTextStyle({
        opacity: 0,
      });
      setTimeout(() => {
        setCurrentTextStyle({
          opacity: 1,
        });
      }, 500);
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div>
      <h1>
        <Head>Melo </Head>

        <AnimateOnChange className="foo" durationOut={500}>
          <div
            className="container"
            style={{ width: currentWidth ? currentWidth + "px" : "auto" }}
          >
            <div
              className="text-width-wrapper"
              style={currentTextStyle}
              ref={currentTextRef}
            >
              {words[current]}
            </div>
          </div>
        </AnimateOnChange>
      </h1>
      <h1 className="hidden-text" ref={nextTextRef} />
    </div>
  );
};

const Head = styled.span`
  color: white;
`;
