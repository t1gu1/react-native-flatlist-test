import React from "react";
import styled from "styled-components";

import { Text, View, FlatList, ScrollView } from "react-native";

const contentHeight = 700;
const contentWidth = 320;
const data = [
  { title: "Title Text 1", key: "item1" },
  { title: "Title Text 2", key: "item2" },
  { title: "Title Text 3", key: "item3" },
  { title: "Title Text 4", key: "item4" },
  { title: "Title Text 5", key: "item5" },
  { title: "Title Text 6", key: "item6" },
  { title: "Title Text 7", key: "item7" },
];

// Change this Boolean to invert the FlatList vertical with the Horizontal
const prioriseVerticalScrollView = true;

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
                <FlatListContent>
                  <FlatListInfo>Vertical scrollView</FlatListInfo>
                  <FlatListScrollView>
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
                </FlatListContent>
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

// Vertical
const FlatListContent = styled(View)`
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

// Horizontal
const FlatListContentHorizontal = styled(View)`
  flex: 1;
  width: ${!prioriseVerticalScrollView ? "100%" : `${contentWidth}px`};
  border: 1px solid black;
  background-color: white;
`;
