import React from "react";
import "../styles/About.css";
import FadeInSection from "./FadeInSection";

class About extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: true,
      activeKey: "1"
    };
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(eventKey) {
    this.setState({
      activeKey: eventKey
    });
  }
  render() {
    const one = (
      <p>
        I am currently a <b>4<sup>th</sup> year Software Engineering student at BahiDar University </b>
        <a href="https://www.bdu.edu.et"> BahirDar University</a>.
        I am also working as a <b>backend developer</b> at tanamed technology solutions 
        under the website development team. At the same time, I am undertaking a
        part-time <b> Business managment </b> bachelor of science <b>degree </b>at{" "}
        <a href="https://www.alphauc.edu.et">Alpha university college</a>.
      </p>
    );
    const two = (
      <p>
        Outside of work, I'm interested in following the developments of
        science, I'm interested in exploring newly released technologies
         and experimenting with them. I also really enjoy spending time 
         with family and social gatherings.
          I like to engage 
        in brainstorming questions and intellectual discussions.
  
      </p>
    );

    const tech_stack = [
    
      "Python",
      "django",
      "Java",
      "Javascript ",
      "C++"
    ];

    return (
      <div id="about">
        <FadeInSection>
          <div className="section-header ">
            <span className="section-title">/ about me</span>
          </div>
          <div className="about-content">
            <div className="about-description">
              {[one]}
              {"Here are some technologies I have been working with:"}
              <ul className="tech-stack">
                {tech_stack.map(function (tech_item, i) {
                  return (
                    <FadeInSection delay={`${i + 1}00ms`}>
                      <li>{tech_item}</li>
                    </FadeInSection>
                  );
                })}
              </ul>
              {[two]}
            </div>
            <div className="about-image">
              <img alt="Roza Getachew" src={"/assets/rosa_profile.jpg"} />
            </div>
          </div>
        </FadeInSection>
      </div>
    );
  }
}

export default About;
