import React, { Component } from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { AiFillPlayCircle } from "react-icons/ai";
import Slicker from "react-slick";
import Loader from "react-loader-spinner";
import "./Slides.css";

export default class slides extends Component {
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
      <Wrapper>
        <div>
          <h4
            style={{
              // borderBottom: "#00BFFF solid 5px ",
              display: "inline-block",
              padding: 3,
            }}
          >
            {this.props.title}
          </h4>
        </div>
        {this.props.data.length !== 0 ? (
          <Slicker {...settings}>
            {this.props.data.map((ob, i) => (
              <CardWrapper key={i}>
                <div className="wrapper popular">
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
                        <Img src={ob.imgurl} alt="" />
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
        ) : (
          <LoadWrapper>
            <Loader type="Audio" color="#ec407a" height={80} width={80} />
          </LoadWrapper>
        )}
      </Wrapper>
    );
  }
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

const Wrapper = styled.div`
  margin: 0 2rem;
`;

const Img = styled.img`
  width: 15rem;
`;

const CardWrapper = styled.div`
  width: 20rem;
`;

const LoadWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
