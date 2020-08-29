import React, { useState } from "react";
import styled from "styled-components";
import MusicNoteSharpIcon from "@material-ui/icons/MusicNoteSharp";
// import "./header.css";

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
            Melo
            <MusicNoteSharpIcon />
          </Head>
          <div className="">
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
