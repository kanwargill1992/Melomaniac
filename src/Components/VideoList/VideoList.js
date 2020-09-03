import React, { Component } from "react";
import axios from "axios";
import {
  getTechnoList,
  getEricSongs,
  getBorisSongs,
  getHouseList,
} from "../API/Youtube";
import { AiFillPlayCircle } from "react-icons/ai";
import Slide from "../Slides/Slides";
import styled from "styled-components";
import ReactPlayer from "react-jinke-music-player";
import Loader from "react-loader-spinner";
import "./Videos.css";
import "react-jinke-music-player/assets/index.css";
import Slicker from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class videolist extends Component {
  state = {
    techno: [],
    eric: [],
    boris: [],
    house: [],
    playerSongUrl: "",
    playerSongTitle: "",
    playsong: false,
    loading: false,
  };

  componentDidMount = async () => {
    try {
      await this.getPopularList();
      await this.getBollywoodBunchSongs();
      await this.getHollywoodSongs();
      await this.getGazals();
    } catch (e) {
      setTimeout(() => {
        window.location.reload();
        clearTimeout();
      }, 200000);
    }
  };

  getPopularList = async () => {
    var trendingList = await getTechnoList();
    console.log(trendingList);
    const data = [];

    await trendingList.map((ob) => {
      data.push({
        id: ob.id,
        title: ob.title,
        imgurl: ob.thumbnails.high.url,
      });
    });

    await this.setState({ techno: data });
  };

  getBollywoodBunchSongs = async () => {
    const list = await getEricSongs();
    console.log(list);
    const data = [];

    await list.map((ob) => {
      data.push({
        id: ob.id,
        title: ob.title,
        imgurl: ob.thumbnails.high.url,
      });
    });

    await this.setState({ eric: data });
  };

  getHollywoodSongs = async () => {
    const list = await getBorisSongs();

    const data = [];

    await list.map((ob) => {
      data.push({
        id: ob.id,
        title: ob.title,
        imgurl: ob.thumbnails.high.url,
      });
    });

    await this.setState({ boris: data });
  };

  getGazals = async () => {
    var list = await getHouseList();

    const data = [];

    await list.map((ob) => {
      data.push({
        id: ob.id,
        title: ob.title,
        imgurl: ob.thumbnails.high.url,
      });
    });

    await this.setState({ house: data });
  };

  getSongData = async (songId, title) => {
    try {
      await this.setState({
        playsong: false,
        playerSongTitle: "",
        playerSongUrl: "",
        loading: true,
      });

      var songUrl = await axios(`http://localhost:5000/download?URL=${songId}`);

      await this.setState({
        playerSongUrl: songUrl.data,
        playerSongTitle: title,
        playsong: true,
        loading: false,
      });
    } catch (e) {
      alert("Sorry Something Want Wrong Please Try Again");

      this.setState({ loading: false });
    }
  };

  customDownloader = () => {
    const link = document.createElement("a");
    link.href = this.state.playerSongUrl;
    link.download = "test";
    document.body.appendChild(link);
    link.click();
  };

  render() {
    var settings = {
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      speed: 500,
      autoplaySpeed: 7000,
      cssEase: "linear",
      pauseOnHover: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            initialSlide: 1,
          },
        },
        {
          breakpoint: 700,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };

    return (
      <div>
        <div>
          {this.props.searchSongData.length !== 0 ? (
            <div>
              <h4
                style={{
                  display: "inline-block",
                  padding: 3,
                }}
              >
                Search Result
              </h4>
              <Wrapper>
                <Slicker {...settings}>
                  {this.props.searchSongData.map((ob, i) => (
                    <CardWrapper key={i}>
                      {console.log("object", ob)}
                      <div className="wrapper">
                        <div className="main_card">
                          <div className="card_left">
                            <div className="card_datails">
                              <h3>{ob.title}</h3>

                              <div className="social-btn">
                                <button
                                  className="btn "
                                  onClick={() =>
                                    this.props.fetchSongId(ob.id, ob.title)
                                  }
                                >
                                  Play
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="card_right">
                            <div className="img_container">
                              <Img src={ob.imgUrl} alt="" />
                            </div>
                            <div className="play_btn">
                              <AiFillPlayCircle
                                size={60}
                                className="fa-play-circle"
                                onClick={() =>
                                  this.props.fetchSongId(ob.id, ob.title)
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardWrapper>
                  ))}
                </Slicker>
              </Wrapper>
            </div>
          ) : (
            <div></div>
          )}
          <Slide
            fetchSongId={this.getSongData}
            data={this.state.techno}
            title={"Techno"}
          />

          <br></br>
          <br></br>
          <Slide
            fetchSongId={this.getSongData}
            data={this.state.eric}
            title={"Eric Prydz"}
          />

          <br></br>
          <br></br>

          <Slide
            fetchSongId={this.getSongData}
            data={this.state.boris}
            title={"Boris Brejcha"}
          />

          <br></br>
          <br></br>

          <Slide
            fetchSongId={this.getSongData}
            data={this.state.house}
            title={"Tech House"}
          />

          {this.state.playsong === true ? (
            <ReactPlayer
              audioLists={[
                {
                  musicSrc: this.state.playerSongUrl,
                  name: this.state.playerSongTitle,
                  cover:
                    "https://cdn.pixabay.com/photo/2012/04/13/20/45/record-33583_960_720.png",
                  singer: "Kanwar",
                },
              ]}
              customDownloader={this.customDownloader}
              remove={true}
            />
          ) : (
            <div></div>
          )}
        </div>
        {this.state.loading === true ? (
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
            }}
          >
            <Loader type="audio" color="#ec407a" height={80} width={80} />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "none" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "none" }}
      onClick={onClick}
    />
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1;
  overflow: hidden;
`;

const CardWrapper = styled.div`
  width: 20rem;
  display: grid;
`;
const Img = styled.img`
  width: 15rem;
`;
