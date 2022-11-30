import React, { useRef, useState } from "react";
import styled from "styled-components";
import {
  contentHeight,
  contentWidth,
  prioriseVerticalScrollView,
} from "./Constant";
import { Text, View, ScrollView } from "react-native";

export default function FlatListContent({ indexH, item }) {
  const isDelayerActive = useRef(true);
  const [isScrollEnabled, setIsScrollEnabled] = useState(true);
  const onVerticalScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const scrollMax =
      event.nativeEvent.contentSize.height -
      event.nativeEvent.layoutMeasurement.height -
      1;

    if (!isScrollEnabled) return;

    if (isDelayerActive.current) {
      isDelayerActive.current = false;
      setTimeout(() => {
        isDelayerActive.current = true;
      }, 3000);

      return;
    }

    if (scrollY >= scrollMax) {
      setIsScrollEnabled(false);
      setTimeout(() => {
        setIsScrollEnabled(true);
      }, 1000);
    }

    if (scrollY <= 1) {
      setIsScrollEnabled(false);
      setTimeout(() => {
        setIsScrollEnabled(true);
      }, 1000);
    }
  };

  return (
    <Container>
      <FlatListInfo>Vertical scrollView</FlatListInfo>
      <FlatListScrollView
        scrollEnabled={isScrollEnabled}
        onScroll={onVerticalScroll}
      >
        <FlatListTitle>{`${indexH}: ${item.title}`}</FlatListTitle>

        <FlatListText>
          Open up App.js to start working on your app!
        </FlatListText>
      </FlatListScrollView>

      <Spacer />

      <FlatListInfo>Horizontal scrollView</FlatListInfo>
      <FlatListScrollView horizontal>
        <FlatListTitle>{`${indexH}: ${item.title}`}</FlatListTitle>

        <FlatListText>
          Open up App.js to start working on your app!
        </FlatListText>
      </FlatListScrollView>
    </Container>
  );
}

// Vertical
const Container = styled(View)`
  flex: 1;
  height: ${contentHeight}px;
  padding: 90px 30px;
  width: ${!prioriseVerticalScrollView ? "100%" : `${contentWidth}px`};
  border: 1px solid black;
  background-color: white;
`;

const FlatListScrollView = styled(ScrollView)`
  background-color: yellow;
  max-height: 200px;
  max-width: ${contentWidth - 60}px;
`;

const FlatListInfo = styled(Text)`
  font-size: 25px;
`;

const FlatListTitle = styled(Text)`
  font-size: 80px;
`;

const FlatListText = styled(Text)`
  font-size: 50px;
  margin-top: auto;
`;

const Spacer = styled(Text)`
  width: 100%;
  height: 30px;
`;
