import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import List from "../VideoList/VideoList";
import "./Header.css";
import { getSearchData } from "../API/Youtube";

export default () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchSongData, setSearchSongData] = useState([]);

  const searchSong = async () => {
    const songData = [];

    if (searchValue) {
      var data = await getSearchData(searchValue);

      await data.map((ob) => {
        songData.push({
          id: ob.id,
          title: ob.title,
          imgUrl: ob.thumbnails.high.url,
        });
      });
    }

    await setSearchSongData(songData);
  };

  return (
    <>
      <ContentWrapper>
        <Head>
          <Icon>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="heart"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 496 512"
            >
              <path
                fill="white"
                d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zM88 256H56c0-105.9 86.1-192 192-192v32c-88.2 0-160 71.8-160 160zm160 96c-53 0-96-43-96-96s43-96 96-96 96 43 96 96-43 96-96 96zm0-128c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32z"
              ></path>
            </svg>
          </Icon>
        </Head>

        <FormWrapper>
          <div onSubmit="event.preventDefault()" className="search-form">
            <input
              id="search"
              type="search"
              className="search-input"
              placeholder="Search Melo..."
              onChange={(e) => {
                setSearchValue(e.target.value);
                if (e.target.value === "") {
                  setSearchSongData([]);
                }
              }}
            />
            <button className="search-button" onClick={() => searchSong()}>
              Search
            </button>
          </div>
        </FormWrapper>
      </ContentWrapper>
      <List searchSongData={searchSongData} />
    </>
  );
};

const heart = keyframes`
0% {
        transform: scale(1);
      }
      25% {
        transform: scale(1.05);
      }
      50% {
        transform: scale(1) rotate(360deg);
      }
      75% {
        transform: scale(1.05);
      }
      100% {
        transform: scale(1);
      } 
`;

const Icon = styled.div`
  margin-top: 3px;
  margin-left: 0.7rem;
  width: 3.3rem;
  animation: ${heart} 3s infinite;
`;

const ContentWrapper = styled.div`
  display: flex;
  height: 7.5vh;
  flex-direction: row;
  justify-content: space-between;
  background-color: #ec407a;
`;

const Head = styled.div``;

const FormWrapper = styled.div`
  margin-right: 0.7rem;
`;
