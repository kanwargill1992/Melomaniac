import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import MusicNoteSharpIcon from "@material-ui/icons/MusicNoteSharp";

import Animation from "./Animation";
import List from "../VideoList/VideoList";

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
    <Wrapper>
      <HeadWrapper>
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
                  fill="red"
                  d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zM88 256H56c0-105.9 86.1-192 192-192v32c-88.2 0-160 71.8-160 160zm160 96c-53 0-96-43-96-96s43-96 96-96 96 43 96 96-43 96-96 96zm0-128c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32z"
                ></path>
              </svg>
            </Icon>
          </Head>
          <Animation />
          <div>
            <SearchBox>
              <InputBox
                className=" "
                type="text"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  if (e.target.value === "") {
                    setSearchSongData([]);
                  }
                }}
              />

              <Button id="basic-text1" onClick={() => searchSong()}>
                Search
              </Button>
            </SearchBox>
          </div>
        </ContentWrapper>
      </HeadWrapper>

      <List searchSongData={searchSongData} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
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
  width: 4rem;
  animation: ${heart} 1.8s infinite;
`;
const HeadWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #92fe9d;
  justify-content: space-evenly;
`;

const Head = styled.div`
  font-size: 2rem;
  padding-top: 1rem;
  /* display: flex; */
  /* flex-direction: row; */
`;

const SearchBox = styled.div`
  display: flex;
  margin-top: 0.5rem;
  width: 10rem;
`;

const InputBox = styled.input`
  height: 3rem;
  width: 10rem;
  border-radius: 1rem;
  margin-top: 0.7rem;
`;

const Button = styled.button`
  background-color: lightblue;
  font-size: 1rem;
  padding-left: -10px;
`;
