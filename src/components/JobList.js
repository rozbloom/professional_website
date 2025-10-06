import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import FadeInSection from "./FadeInSection";
import { HelpRounded } from "@material-ui/icons";

const isHorizontal = window.innerWidth < 600;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  if (isHorizontal) {
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  } else {
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  if (isHorizontal) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`
    };
  } else {
    return {
      id: `vertical-tab-${index}`
    };
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "theme.palette.background.paper",
    display: "flex",
    height: 300
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}));

const JobList = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const experienceItems = {
    Tanamed: {
      jobTitle: "Software Backend Development Engineer @",
      duration: "MARCH 2025 - PRESENT",
      desc: [
        "Spearheaded the development of dynamic web platforms for medical institutions using the Python Django framework to digitize and manage day-to-day administrative activities, significantly improving operational efficiency. ",
        "Collaboratively engineered and deployed a dental clinic website featuring robust, role-based authentication and authorization to secure patient and doctor data, ensuring HIPAA-compliant privacy standards across all user interactions.",
        "Contributed within an Agile collaborative team environment to design, build, and test full-stack web solutions, demonstrating proficiency in source control management and best practices for the entire software development lifecycle to deliver secure, high-utility applications."
      ]
    },
    SOS_HERMANN_GMEINER: {
      jobTitle: "Scouts Club Secretary @",
      duration: "SEPT 2021 - JUL 2022",
      desc: [
        "Managed and streamlined all administrative operations for the school's Scouts Club, directly supporting a team of 10 senior leaders and coordinating activities for 100+ members (the massive scale of the club).",
        "Developed and maintained critical documentation (e.g., meeting minutes, activity calendars, member records) to ensure seamless communication and successful execution of 8-10 major annual events impacting the entire school community (the iteratively built web experiences).",
        "Collaborated cross-functionally with the school administration, faculty advisors, and junior members, strictly following governance protocols (the full software development life cycle) for planning, resource allocation, and reporting to uphold national scouting standards."
      ]
    },
    "Bahir Dar University": {
      jobTitle: "innovator Engineer @",
      duration: "SEPT 2024 - NOV 2024",
      desc: [
        "Designed and implemented a full-stack, two-sided skill exchange platform leveraging a microservices architecture to facilitate peer-to-peer learning and community growth.",
        " Developed a user-centric resource matching engine for career orientation and student support, utilizing database schemas and algorithm design to connect users with relevant learning paths and mentorship opportunities.",
        "Engineered and deployed community-fostering features (e.g., reputation systems and skill verification badges) to enhance user engagement and trust in the platform's educational exchange, resulting in a measurable increase in active users."
      ]
    },
    
};

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation={!isHorizontal ? "vertical" : null}
        variant={isHorizontal ? "fullWidth" : "scrollable"}
        value={value}
        onChange={handleChange}
        className={classes.tabs}
      >
        {Object.keys(experienceItems).map((key, i) => (
          <Tab label={isHorizontal ? `0${i}.` : key} {...a11yProps(i)} />
        ))}
      </Tabs>
      {Object.keys(experienceItems).map((key, i) => (
        <TabPanel value={value} index={i}>
          <span className="joblist-job-title">
            {experienceItems[key]["jobTitle"] + " "}
          </span>
          <span className="joblist-job-company">{key}</span>
          <div className="joblist-duration">
            {experienceItems[key]["duration"]}
          </div>
          <ul className="job-description">
            {experienceItems[key]["desc"].map(function (descItem, i) {
              return (
                <FadeInSection delay={`${i + 1}00ms`}>
                  <li key={i}>{descItem}</li>
                </FadeInSection>
              );
            })}
          </ul>
        </TabPanel>
      ))}
    </div>
  );
};

export default JobList;
