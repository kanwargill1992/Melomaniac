import React, { Component } from "react";
import axios from "axios";
import {
  getPopularList,
  getBollywoodLongSongs,
  getHollywoodSongs,
  getGhazalList,
} from "../API/Youtube";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import Slide from "../Slides/Slides";
import styled from "styled-components";
import ReactPlayer from "react-jinke-music-player";
import Loader from "react-loader-spinner";
import "./Videos.css";
import "react-jinke-music-player/assets/index.css";

export default class videolist extends Component {
  state = {
    popular: [],
    bollywood: [],
    hollywood: [],
    gazal: [],
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
      //window.location.reload();
      setTimeout(() => {
        window.location.reload();
        clearTimeout();
      }, 200000);
    }
  };

  getPopularList = async () => {
    var trendingList = await getPopularList();
    console.log(trendingList);
    const data = [];

    await trendingList.map((ob) => {
      data.push({
        id: ob.id,
        title: ob.title,
        imgurl: ob.thumbnails.high.url,
      });
    });

    await this.setState({ popular: data });
  };

  getBollywoodBunchSongs = async () => {
    const list = await getBollywoodLongSongs();
    console.log(list);
    const data = [];

    await list.map((ob) => {
      data.push({
        id: ob.id,
        title: ob.title,
        imgurl: ob.thumbnails.high.url,
      });
    });

    await this.setState({ bollywood: data });
  };

  getHollywoodSongs = async () => {
    const list = await getHollywoodSongs();

    const data = [];

    await list.map((ob) => {
      data.push({
        id: ob.id,
        title: ob.title,
        imgurl: ob.thumbnails.high.url,
      });
    });

    await this.setState({ hollywood: data });
  };

  getGazals = async () => {
    var list = await getGhazalList();

    const data = [];

    await list.map((ob) => {
      data.push({
        id: ob.id,
        title: ob.title,
        imgurl: ob.thumbnails.high.url,
      });
    });

    await this.setState({ gazal: data });
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
    link.href = this.state.playerSongUrl; // a.mp3
    link.download = "test";
    document.body.appendChild(link);
    link.click();
  };

  render() {
    return (
      <div>
        <div>
          {this.props.searchSongData.length !== 0 ? (
            <div>
              <h4
                style={{
                  borderBottom: "#00BFFF solid 5px ",
                  display: "inline-block",
                  padding: 3,
                }}
              >
                Search Result
              </h4>
              <div>
                {this.props.searchSongData.map((ob, i) => (
                  <CardWrapper key={i}>
                    <div className="wrapper">
                      <div className="main_card">
                        <div className="card_left">
                          <div className="card_datails">
                            <h1>{ob.title}</h1>

                            <div className="card_cat"></div>
                            <p className="disc"></p>

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
                            <Img src={ob.imgurl} alt="" />
                          </div>
                          <div className="play_btn">
                            <PlayCircleFilledWhiteIcon
                              className="fa-play-circle"
                              onClick={() =>
                                this.props.fetchSongId(ob.id, ob.title)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="wrapper">
                      
                      <div className="main_card">
                        <img src={ob.imgUrl} className="card-img-top" />
                      </div>

                      
                      <div className="card-body">
                        
                        <h6 className="card-title" style={{ fontWeight: 600 }}>
                          {ob.title}
                        </h6>
                       
                      </div>

                      <button
                        className="btn "
                        style={{
                          width: "50%",
                          alignSelf: "center",
                          backgroundColor: "#3F51B5",
                          color: "#fff",
                        }}
                        onClick={() => this.getSongData(ob.id, ob.title)}
                      >
                        Play
                      </button>
                    </div> */}
                  </CardWrapper>
                ))}
              </div>
            </div>
          ) : (
            <div></div>
          )}
          <Slide
            fetchSongId={this.getSongData}
            data={this.state.popular}
            title={"Techno"}
          />

          <br></br>
          <br></br>
          <Slide
            fetchSongId={this.getSongData}
            data={this.state.bollywood}
            title={"Eric Prydz"}
          />

          <br></br>
          <br></br>

          <Slide
            fetchSongId={this.getSongData}
            data={this.state.hollywood}
            title={"Boris Brejha"}
          />

          <br></br>
          <br></br>

          <Slide
            fetchSongId={this.getSongData}
            data={this.state.gazal}
            title={"Babbu Maan"}
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
            {/* <div
              class="spinner-border"
              role="status"
              style={{ height: "2em", width: "2em" }}
            ></div> */}
            <Loader type="audio" color="#00BFFF" height={80} width={80} />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

// export default () => {
//   const [popular, setPopular] = useState([]);
//   const [bollywood, setBollywood] = useState([]);
//   const [hollywood, setHollywood] = useState([]);
//   const [gazal, setGazal] = useState([]);
//   const [playerSongUrl, setPlayerSongUrl] = useState("");
//   const [playerSongTitle, setPlayerSongTitle] = useState("");
//   const [playsong, setPlaysong] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const getPopular = async () => {
//     let trendingList = await getPopularList();
//     console.log(trendingList);
//     const data = [];
//     await trendingList.map((ob) => {
//       data.push({
//         id: ob.id,
//         title: ob.title,
//         imgurl: ob.thumbnails.high.url,
//       });
//     });
//     await setPopular(data);
//   };
//   getPopular();
//   return <div>Hello</div>;
// };
const CardWrapper = styled.div`
  width: 20rem;
  display: grid;
`;
const Img = styled.img`
  width: 15rem;
`;
