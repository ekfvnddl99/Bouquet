import React from 'react';
import { View, FlatList, Animated } from 'react-native';

// logics
import { MyCharacter } from '../../../utils/types/UserTypes';
import useCharacter from '../../../logics/hooks/useCharacter';

// components
import GridCharacterItem from '../../../components/item/GridCharacterItem';

export default function ProfileGridScreen({
  scroll,
  characterList,
}: {
  scroll: any;
  characterList: MyCharacter[];
}): React.ReactElement {
  const [, setCharacter] = useCharacter();

  function onPress(name: string) {
    if (characterList.length > 0) {
      characterList.map((obj) => {
        if (obj.name === name) return setCharacter(obj);
        return undefined;
      });
    }
  }

  return (
    <Animated.ScrollView
      contentContainerStyle={{ marginHorizontal: 30 }}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={1}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scroll } } }],
        { useNativeDriver: true },
      )}
    >
      <View style={{ paddingTop: 30 }} />
      <FlatList
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ justifyContent: 'center' }}
        data={characterList}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        renderItem={(obj) => (
          <View style={{ flex: 0.5, marginBottom: 13, marginHorizontal: 8 }}>
            {obj.item.name === '' ? (
              <View />
            ) : (
              <GridCharacterItem
                characterInfo={obj.item}
                onPress={() => onPress}
                isAccount={false}
                routePrefix="ProfileTab"
              />
            )}
          </View>
        )}
      />
    </Animated.ScrollView>
  );
}
