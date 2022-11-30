import React from "react";
import styled from "styled-components";
import FlatListContent from "./FlatListContent";
import {
  contentHeight,
  contentWidth,
  prioriseVerticalScrollView,
} from "./Constant";
import { View, FlatList } from "react-native";

const data = [
  { title: "Title Text 1", key: "item1" },
  { title: "Title Text 2", key: "item2" },
  { title: "Title Text 3", key: "item3" },
  { title: "Title Text 4", key: "item4" },
  { title: "Title Text 5", key: "item5" },
  { title: "Title Text 6", key: "item6" },
  { title: "Title Text 7", key: "item7" },
];

export default function App() {
  return (
    <Main>
      <FlatList
        snapToAlignment="center"
        decelerationRate="fast"
        snapToInterval={
          prioriseVerticalScrollView ? contentWidth : contentHeight
        }
        horizontal={prioriseVerticalScrollView}
        data={data}
        renderItem={({ index: indexH }) => (
          <FlatListContentHorizontal>
            <FlatList
              snapToAlignment="center"
              decelerationRate="fast"
              snapToInterval={
                !prioriseVerticalScrollView ? contentWidth : contentHeight
              }
              horizontal={!prioriseVerticalScrollView}
              data={data}
              renderItem={({ item, index, separators }) => (
                <FlatListContent item={item} indexH={indexH} />
              )}
            />
          </FlatListContentHorizontal>
        )}
      />
    </Main>
  );
}

const Main = styled(View)`
  width: 100%;
  height: 100%;
`;

// Horizontal
const FlatListContentHorizontal = styled(View)`
  flex: 1;
  width: ${!prioriseVerticalScrollView ? "100%" : `${contentWidth}px`};
  border: 1px solid black;
  background-color: white;
`;
