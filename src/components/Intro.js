import React from "react";

import "../styles/Intro.css";
import Typist from "react-typist";
import "react-typist/dist/Typist.css";
import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import FadeInSection from "./FadeInSection";
import FractalTree from "./FractalTree";

class Intro extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: true,
      activeKey: "1",
      visible: true,
    };
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(eventKey) {
    this.setState({
      activeKey: eventKey,
    });
  }
  render() {
    return (
      <div id="intro">
        <FractalTree></FractalTree>
        <Typist avgTypingDelay={100}>
          <span className="intro-title">
            {"Hello World, "}
            {"meet "}
            <span className="intro-name">{"ROZA"}</span>
          </span>
        </Typist>
        <FadeInSection>
          <div className="intro-subtitle"> welcome to my corner of the web.</div>
          <div> </div>
          <div className="intro-subtitle"> where creativity meets Engineering  </div>
          <div className="intro-desc">
            I'm a software engineer from BahirDar, Ethiopia. I'm fascinated by big ideas and 
            large-scale, high-impact projects and love to contribute to major features . I have 
            experience in building products from scratch and working on existing ones .
           </div>
          <div className="intro-contact" style={{ position: "relative", display: "inline-block" }}>
            <button
              onClick={() => this.setState({ showDropdown: !this.state.showDropdown })}
              style={{
                background: "var(--accent-color, #64ffda)",
                border: "none",
                cursor: "pointer",
                color: "#0a192f",
                fontWeight: "bold",
                fontSize: "1.1rem",
                padding: "0.5em 1.2em",
                borderRadius: "30px",
                boxShadow: "0 2px 8px rgba(100,255,218,0.15)",
                display: "flex",
                alignItems: "center",
                transition: "background 0.2s"
              }}
              onMouseOver={e => e.currentTarget.style.background = "#52e0c4"}
              onMouseOut={e => e.currentTarget.style.background = "var(--accent-color, #64ffda)"}
            >
              <EmailRoundedIcon style={{ marginRight: "0.5em" }} /> Say hi!
            </button>
            {this.state.showDropdown && (
              <div className="intro-dropdown">
                  <ul style={{ listStyle: "none", margin: 0, padding: "0.5em 1em" }}>
                    {[
                      { label: "Gmail", url: 'https://mail.google.com/mail/?view=cm&fs=1&to=getachewroza2@gmail.com' },
                      { label: "Instagram", url: 'https://www.instagram.com/blooming_roza/' },
                      { label: "X", url: 'https://x.com/rozagetachew6' },
                      { label: "GitHub", url: 'https://github.com/rozbloom' },
                      { label: "LeetCode", url: 'https://leetcode.com/roziose/' }
                    ].map((item, idx) => (
                      <li key={item.label}>
                        <button
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "var(--lightest-slate)",
                            width: "100%",
                            textAlign: "left",
                            padding: "0.3em 0.7em",
                            borderRadius: "5px",
                            transition: "background 0.2s, color 0.2s"
                          }}
                          onMouseOver={e => {
                            e.currentTarget.style.background = "var(--accent-color, #64ffda)";
                            e.currentTarget.style.color = "#0a192f";
                          }}
                          onMouseOut={e => {
                            e.currentTarget.style.background = "none";
                            e.currentTarget.style.color = "var(--lightest-slate)";
                          }}
                          onClick={() => window.open(item.url, '_blank')}
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
              </div>
            )}
          </div>
        </FadeInSection>
      </div>
    );
  }
}

export default Intro;
