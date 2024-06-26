import React from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { usePager } from "../context/pagerContext";

const ArrowAnimation = keyframes`
  0% {
    transform: translateY(-50%)
  }
  50% {
    transform: translateY(-30%)
  }
  100% {
    transform: translateY(-50%)
  }
`;

const RightArrow = styled(motion.div)`
  position: fixed;
  right: 5%;
  top: 50%;
  transform: translateY(-50%);
  width: 80px;
  height: 80px;
  border-radius: 100%;
  background-color: #fff;
  color: #000;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
  font-size: 2rem;
  font-weight: bold;
  animation: ${ArrowAnimation} 3s infinite linear;
  &:hover {
    scale: 1.1;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  }
`;

const MoveToRight = ({ onClick }) => {
  return <RightArrow onClick={onClick}>&rang;</RightArrow>;
};

export default MoveToRight;
