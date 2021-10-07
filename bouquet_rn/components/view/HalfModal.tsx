import React from 'react';
import {
  Modal,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import styled from 'styled-components/native';

// styles
import colors from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';

type HalfModalProps = {
  modalVisible: boolean;
  setModalVisible: (input: boolean) => void;
  onReport: () => void;
  onDelete?: () => void;
  isCanDelete?: boolean;
};
export default function HalfModal({
  modalVisible,
  setModalVisible,
  onReport,
  onDelete,
  isCanDelete,
}: HalfModalProps): React.ReactElement {
  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      transparent
      onRequestClose={() => setModalVisible(false)}
    >
      <TouchableOpacity
        activeOpacity={1}
        style={{ flexGrow: 1 }}
        onPress={() => setModalVisible(false)}
      />
      <ModalArea activeOpacity={1} onPress={() => setModalVisible(false)}>
        <TouchableOpacity onPress={() => onReport()}>
          <ModalItem>
            <text.Subtitle2R textColor={colors.black}>신고</text.Subtitle2R>
          </ModalItem>
        </TouchableOpacity>
        <MiddleLine />

        {isCanDelete && onDelete ? (
          <>
            <TouchableOpacity onPress={() => onDelete()}>
              <ModalItem>
                <text.Subtitle2R textColor={colors.black}>삭제</text.Subtitle2R>
              </ModalItem>
            </TouchableOpacity>
            <MiddleLine />
          </>
        ) : null}
      </ModalArea>
    </Modal>
  );
}

const ModalArea = styled.TouchableOpacity`
  flex-wrap: wrap;
  margin-top: auto;
  align-items: center;
  justify-content: center;
  background-color: ${colors.gray0};
  border-top-left-radius: 30;
  border-top-right-radius: 30;
`;

const ModalItem = styled.View`
  align-items: center;
  margin-vertical: 15;
`;

const MiddleLine = styled.View`
  border-width: 0.3;
  border-color: ${colors.gray5};
  width: 100%;
`;
