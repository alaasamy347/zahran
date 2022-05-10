// Main Imports
import Slider from "react-slick";
// Styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const SlickButtonFix = ({ currentSlide, slideCount, children, ...props }) => (
  <span {...props}>{children}</span>
);

const nextArrow = (
  <SlickButtonFix>
    <FontAwesomeIcon icon={faChevronRight} />
  </SlickButtonFix>
);

const prevArrow = (
  <SlickButtonFix>
    <FontAwesomeIcon icon={faChevronLeft} />
  </SlickButtonFix>
);

const SlickSlider = (props) => {
  const { children, customSettings } = props;

  const settings = {
    speed: 700,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnFocus: true,
    nextArrow,
    prevArrow,
    ...customSettings,
  };

  return <Slider {...settings}>{children}</Slider>;
};

export default SlickSlider;
