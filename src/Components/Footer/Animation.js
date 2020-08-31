import React, { useState, useLayoutEffect, useRef } from "react";
import { AnimateOnChange } from "react-animation";
import styled from "styled-components";
import "./Animation.css";

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
      <Head>
        Melo{" "}
        <AnimateOnChange durationOut={500}>
          <Wrapper
            className="container"
            style={{ width: currentWidth ? currentWidth + "px" : "auto" }}
          >
            <WordWrapper
              className="text-width-wrapper"
              style={currentTextStyle}
              ref={currentTextRef}
            >
              {words[current]}
            </WordWrapper>
          </Wrapper>
        </AnimateOnChange>
      </Head>
      <h1 className="hidden-text" ref={nextTextRef} />
    </div>
  );
};

const Wrapper = styled.div`
  color: white;
  font-size: 1.3rem;

  .container {
    display: inline-block;
    position: relative;
    padding: 5px 8px;
    transition: all 200ms cubic-bezier(0.2, 1, 0.2, 1);

    &:after {
      background-color: #fff;
      content: "";
      position: absolute;
      top: 2px;
      right: 100%;
      bottom: 2px;
      left: 0;
      transition: all cubic-bezier(0.2, 1, 0.2, 1) 500ms 250ms;
    }
  }

  &.foo-out {
    .container:after {
      right: 0;
      transition: all cubic-bezier(0.5, -0.5, 0.25, 1.5) 500ms;
    }
  }
`;

const WordWrapper = styled.div`
  display: inline-block;
`;

const Head = styled.h1`
  color: white;
`;
