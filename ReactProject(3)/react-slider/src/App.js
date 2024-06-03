import React, { useState, useEffect } from "react";
import styled from "styled-components";
import reset from "./reset.css";
import { motion, AnimatePresence } from "framer-motion";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  gap: 50px;
  position: relative;
`;

const SliderContainer = styled.div`
  width: 400px;
  background: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  overflow: hidden;
`;

const SliderContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  position: relative;
`;

const Sliders = styled.div`
  position: absoute;
  transform: translateX(0px);
  transition: all 0.3s;
`;

const Name = styled.h1``;

const CarImg = styled.div`
  width: 400px;
  transition: all 0.5s;
  & img {
    width: 100%;
  }
`;

const ProgressBar = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 20px;
  background: rgba(125, 125, 125, 0.4);
  border-radius: 0px, 0px, 5px, 5px;
  zindex: 1;
`;

const Progress = styled.div`
  background: #1b1b1b;
  height: 20px;
  transition: all 0.3s;
  border-radius: 0px 20px 20px 0px;
`;

const Total = styled.span`
  width: 100px;
  padding: 10px;
  border: 1px solid #eee;
  text-align: center;
  color: #999;
`;

const Detail = styled.span`
  padding: 10px;
  width: 120px;
  text-align: center;
  color: #171036;
  transition: all 0.3s;
  &:hover {
    box-shadow: inset 0px 0px 15px rgba(125, 125, 125, 0.5);
    background-color: #171036;
    color: #fff;
  }
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  const [data, setData] = useState([]);
  const [sliderHandler, setSliderHandler] = useState(0);
  const [imgChange, setimgChange] = useState(false);
  const [isOpen, setIsOpen] = useState(null);

  useEffect(() => {
    fetch("./db.json")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const sliderEvent = () => {
    setSliderHandler((prevIndex) => {
      return prevIndex < data.length - 1 ? prevIndex + 1 : 0;
    });
  };

  const imgHandler = () => {
    setimgChange((imgChange) => !imgChange);
  };

  console.log(isOpen);

  return (
    <Container>
      <ProgressBar>
        <Progress
          style={{ width: `${sliderHandler * (100 / (data.length - 1))}%` }}
        />
      </ProgressBar>

      <video
        controls
        autoPlay
        muted
        loop
        style={{
          position: "absolute",
          zIndex: "-1",
          top: "0",
          width: "auto",
          height: "auto",
        }}
      >
        <source
          src="https://worldwide.kia.com/kr/image/video/our-design/intro-full-kr.mp4"
          controls="controls"
        />
      </video>

      <SliderContainer>
        <Sliders
          style={{
            width: "300px",
            height: "450px",
            display: "flex",
            transform: `translateX(-${sliderHandler * 400}px)`,
          }}
        >
          {data.map((data, idx) => (
            <SliderContents key={idx} onClick={sliderEvent} layoutId={idx + ""}>
              <CarImg onMouseEnter={imgHandler} onMouseLeave={imgHandler}>
                <img
                  src={imgChange ? data.imgsrc2 : data.imgsrc}
                  alt="{data.name}"
                />
              </CarImg>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: "30px",
                }}
              >
                <Name>{data.name}</Name>
                <span>{data.price.toLocaleString()}원</span>
                <Detail onClick={() => setIsOpen(idx + "")}>자세히보기</Detail>
              </div>
            </SliderContents>
          ))}
        </Sliders>
      </SliderContainer>

      <AnimatePresence>
        {isOpen ? (
          <Overlay
            onClick={() => setIsOpen(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {data.map((data, idx) => (
              <div
                style={{ width: 1200, height: 650, background: "#fff" }}
                layoutId={isOpen}
                key={data.name}
              >
                <h1 key={data.name}>{data.name}</h1>
              </div>
            ))}
          </Overlay>
        ) : null}
      </AnimatePresence>

      <Total>
        {sliderHandler + 1}/{data.length}
      </Total>
    </Container>
  );
}

export default App;
