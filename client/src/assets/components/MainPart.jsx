import React from 'react';
import { Link } from 'react-router-dom';
import './../Styles/style-starter.css'; 

const MainPart = () => {
  
  return (
    <section className="w3l-main-slider position-relative" id="home">
      <div className="companies20-content">
        <div className="owl-one owl-carousel owl-theme">
          <div className="item">
            <li>
              <div className="slider-info banner-view bg bg2">
                <div className="banner-info">
                  <div className="container">
                    <div className="banner-info-bg">
                      <h5>We are qualified &amp; <br /> professional.</h5>
                      <div className="banner-buttons">
                        <a className="btn btn-style btn-primary" href="about.html">Read More</a>
                        <a href="#small-dialog" className="popup-with-zoom-anim play-view">
                          <span className="video-play-icon">
                            <span className="fa fa-play"></span>
                          </span>
                          <h6>How We Works</h6>
                        </a>
                        {/* dialog itself, mfp-hide class is required to make dialog hidden */}
                        <div id="small-dialog" className="zoom-anim-dialog mfp-hide">
                          <iframe src="https://player.vimeo.com/video/425349644" allow="autoplay; fullscreen"
                            allowFullScreen=""></iframe>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </div>
          <div className="item">
            <li>
              <div className="slider-info banner-view banner-top1 bg bg2">
                <div className="banner-info">
                  <div className="container">
                    <div className="banner-info-bg">
                      <h5>Honest Service For You Car Care.</h5>
                      <div className="banner-buttons">
                        <a className="btn btn-style btn-primary" href="about.html">Read More</a>
                        <a href="#small-dialog" className="popup-with-zoom-anim play-view">
                          <span className="video-play-icon">
                            <span className="fa fa-play"></span>
                          </span>
                          <h6>How We Works</h6>
                        </a>
                        {/* dialog itself, mfp-hide class is required to make dialog hidden */}
                        <div id="small-dialog" className="zoom-anim-dialog mfp-hide">
                          <iframe src="https://player.vimeo.com/video/425349644" allow="autoplay; fullscreen"
                            allowFullScreen=""></iframe>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </div>
          <div className="item">
            <li>
              <div className="slider-info banner-view banner-top2 bg bg2">
                <div className="banner-info">
                  <div className="container">
                    <div className="banner-info-bg">
                      <h5>We are qualified &amp; <br /> professional</h5>
                      <div className="banner-buttons">
                        <a className="btn btn-style btn-primary" href="about.html">Read More</a>
                        <a href="#small-dialog1" className="popup-with-zoom-anim play-view">
                          <span className="video-play-icon">
                            <span className="fa fa-play"></span>
                          </span>
                          <h6>How We Works</h6>
                        </a>
                        {/* dialog itself, mfp-hide class is required to make dialog hidden */}
                        <div id="small-dialog1" className="zoom-anim-dialog mfp-hide">
                          <iframe src="https://player.vimeo.com/video/425349644" allow="autoplay; fullscreen"
                            allowFullScreen=""></iframe>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </div>
          <div className="item">
            <li>
              <div className="slider-info banner-view banner-top3 bg bg2">
                <div className="banner-info">
                  <div className="container">
                    <div className="banner-info-bg">
                      <h5>Honest Service For You Car Care.</h5>
                      <div className="banner-buttons">
                        <a className="btn btn-style btn-primary" href="about.html">Read More</a>
                        <a href="#small-dialog3" className="popup-with-zoom-anim play-view">
                          <span className="video-play-icon">
                            <span className="fa fa-play"></span>
                          </span>
                          <h6>How We Works</h6>
                        </a>
                        {/* dialog itself, mfp-hide class is required to make dialog hidden */}
                        <div id="small-dialog3" className="zoom-anim-dialog mfp-hide">
                          <iframe src="https://player.vimeo.com/video/425349644" allow="autoplay; fullscreen"
                            allowFullScreen=""></iframe>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainPart;
