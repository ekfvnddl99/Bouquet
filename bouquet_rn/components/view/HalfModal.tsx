import React from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

// styles
import colors from '../../styles/colors';
import * as text from '../../styles/styled-components/text';

type ModalElementType = {
  name: string;
  function: any;
  isShow: boolean;
};

type HalfModalProps = {
  modalVisible: boolean;
  setModalVisible: (input: boolean) => void;
  elementArray: ModalElementType[];
};
export default function HalfModal({
  modalVisible,
  setModalVisible,
  elementArray,
}: HalfModalProps): React.ReactElement {
  const insets = useSafeAreaInsets();
  return (
    <Modal
      animationType="none"
      visible={modalVisible}
      transparent
      onRequestClose={() => setModalVisible(false)}
    >
      <Container
        activeOpacity={1}
        style={{ flexGrow: 1 }}
        onPress={() => setModalVisible(false)}
      >
        <ModalArea>
          {elementArray.map((obj) => (
            <>
              {obj.isShow ? (
                <>
                  <ModalItem
                    onPress={obj.function}
                    onPressOut={() => setModalVisible(false)}
                  >
                    <text.Subtitle2R textColor={colors.black}>
                      {obj.name}
                    </text.Subtitle2R>
                  </ModalItem>
                  <MiddleLine />
                </>
              ) : null}
            </>
          ))}

          <View style={{ paddingBottom: insets.bottom }} />
        </ModalArea>
      </Container>
    </Modal>
  );
}

const ModalArea = styled.View`
  flex-wrap: wrap;
  margin-top: auto;
  align-items: center;
  justify-content: center;
  background-color: ${colors.gray0};
  border-top-left-radius: 30;
  border-top-right-radius: 30;
`;

const ModalItem = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  padding-vertical: 15;
`;

const MiddleLine = styled.View`
  border-width: 0.3;
  border-color: ${colors.gray5};
  width: 100%;
`;

const Container = styled.TouchableOpacity`
  flex-grow: 1;
  background-color: ${'#000000B3'};
`;
