import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";
import Carousel from "react-material-ui-carousel";
import Item from "./Item";
import jsonData from "../../../utils/data.json";
import { makeStyles } from "@material-ui/core/styles";
import { useService } from "@xstate/react";
import { Button } from "@material-ui/core";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { MachineContext } from "../../../contexts/machineContext";

const data = jsonData.sliderArticles;

const useStyles = makeStyles(() => ({
  root: {},
}));
function CustomCarousel() {
  const classes = useStyles();
  const [showNavButton, setShowNavButton] = useState(false);
  const { machine } = useContext(MachineContext);
  const [state] = useService(machine.createdMachine);
  const sizeOfWindow = () => {
    if (window.innerWidth >= 400) setShowNavButton(false);
    else setShowNavButton(true);
  };
  const ref = useRef(null);
  const leftBtnRef = useRef(null);
  const rightBtnRef = useRef(null);

  const nxtImg = useCallback((isLeft) => {
    const elm = isLeft ? leftBtnRef.current : rightBtnRef.current;
    elm.click();
  }, []);

  const isFocused = state.matches("slider");
  useEffect(() => {
    if (ref && isFocused)
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    machine.setExternalActions("sliderLeft", () => nxtImg(true));
    machine.setExternalActions("sliderRight", () => nxtImg(false));
  }, [isFocused, nxtImg, machine]);

  useEffect(() => {
    if (window.innerWidth >= 400) setShowNavButton(false);
    else setShowNavButton(true);
    window.addEventListener("resize", sizeOfWindow);
    return () => {
      window.removeEventListener("resize", sizeOfWindow);
    };
  }, [showNavButton]);

  return (
    <div ref={ref}>
      <Carousel
        className={classes.root}
        autoPlay={false}
        animation="slide"
        navButtonsAlwaysInvisible={showNavButton}
        stopAutoPlayOnHover="true"
        navButtonsProps={{
          style: {
            backgroundColor: `var(--${isFocused ? "focused" : "primary"})`,
            opacity: ".6",
          },
        }}
        swipe
        activeIndicatorIconButtonProps={{
          style: {
            color: "var(--primary)",
            backgroundColor: "var(--primary)",
            opacity: ".6",
          },
        }}
        indicatorIconButtonProps={{
          style: {
            margin: "5px",
            color: "rgba(0,0,0,0)",
            border: "2px solid var(--primary)",

            opacity: ".6",
          },
        }}
        indicatorContainerProps={{
          style: {
            position: "relative",
            bottom: "60px",
          },
        }}
        NavButton={({ onClick, className, style, next, prev }) => {
          // Other logic
          return (
            <Button
              onClick={onClick}
              className={className}
              style={style}
              ref={next ? rightBtnRef : leftBtnRef}
            >
              {next && <ArrowRightIcon />}
              {prev && <ArrowLeftIcon />}
            </Button>
          );
        }}
      >
        {data.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </Carousel>
    </div>
  );
}

export default CustomCarousel;
