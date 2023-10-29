import { Avatar, Button, Typography } from "@mui/material";
import "./aboutSection.css";
import { Instagram, YouTube } from "@mui/icons-material";

const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/aftababu54";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/tripleayt/image/upload/v1631555947/products/jpyibarlaxawvcvqjv5b.png"
              alt="Founder"
            />
            <Typography>Mohammad Abu Aftab Wasih</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a sample wesbite codded by me while learning mern stack in 6 pack proggammer channel
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a
              href="https://www.youtube.com/"
              target="blank"
            >
              <YouTube className="youtubeSvgIcon" />
            </a>

            <a href="https://instagram.com/aftababu54" target="blank">
              <Instagram className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
