import {
  Box,
  Center,
  SimpleGrid,
  Text,
  VStack,
  Wrap,
  WrapItem,
  HStack,
} from "@chakra-ui/layout";
("@iconify/react");

import React from "react";
import Winner from "./Winner";
import Server from "./Server";
import Buttons from "./Buttons";
import UserBox from "./UserBox";
import { useSnapshot } from "valtio";
import state from "../store";
import { useEffect } from "react";

export function getRandomNumber(min, max) {
  const number = Math.floor(Math.random() * (max - min) + min);

  return number;
}

export default function Main() {
  const snap = useSnapshot(state);
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      state.w = window.innerWidth;
    }

    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Center mt="2%">
        <Winner />
      </Center>

      <Box
        bg="green.300"
        right={snap.w - 50}
        rounded="full"
        w={3}
        boxShadow="0px 0px 5px green"
        h={["15rem", "20rem", "30rem", "40rem"]}
        position={"fixed"}
        textAlign={"center"}
        verticalAlign={"middle"}
      ></Box>
      <VStack
        p={[2, 3, 4, 5]}
        m={[1, 2, 3, 4]}
        spacing={[1, 3, 6, 8]}
        align="flex-end"
      >
        <Server />

        <UserBox />
      </VStack>

      <Buttons />
    </>
  );
}
