import React, { useState } from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

// styles
import colors from '../../styles/colors';
import * as text from '../../styles/styled-components/text';
import * as area from '../../styles/styled-components/area';
import * as elses from '../../styles/styled-components/elses';

// logics
import { refImageAsync } from '../../logics/server/UploadImage';

// assets
import Svg from '../../assets/Icon';
import LineButton from '../../components/button/LineButton';

// types
import { MyCharacter } from '../../utils/types/UserTypes';
import BackgroundButton from '../../components/button/BackgroundButton';

// components
import ChooseButton from '../../components/button/ChooseButton';

type CharacterGenerationModalProps = {
  modalVisible: boolean;
  setModalVisible: (input: boolean) => void;
  newCharacter: MyCharacter;
  setNewCharacter: (param: MyCharacter) => void;
};
export default function CharacterGenerationModal({
  modalVisible,
  setModalVisible,
  newCharacter,
  setNewCharacter,
}: CharacterGenerationModalProps): React.ReactElement {
  const [baseImg, setBaseImg] = useState('');
  const [styleImg, setStyleImg] = useState('');
  const [resultImg, setResultImg] = useState('');
  const [isMan, setIsMan] = useState(true);
  const [isSelectImg, setIsSelectImg] = useState(false);
  /**
   * 이미지 가져오는 함수
   */
  async function setImage(isBase: boolean) {
    setIsSelectImg(true);
    const imgResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!imgResult.cancelled) {
      const manipResult = await ImageManipulator.manipulateAsync(
        imgResult.uri,
        [{ resize: { width: 1024, height: 1024 } }],
      );
      const realUri = manipResult.uri;
      if (isBase) setBaseImg(realUri);
      else setStyleImg(realUri);
    }
    setIsSelectImg(false);
  }

  /**
   * 이미지 합성한 결과 가져오는 함수
   */
  const [loading, setLoading] = useState(false);
  async function refImage() {
    setResultImg('');
    if (loading) return;
    setLoading(true);
    const serverResult = await refImageAsync(baseImg, styleImg, isMan ? 1 : 0);
    if (serverResult.isSuccess) {
      setResultImg(`${serverResult.result}?random=${new Date()}`);
    } else alert(serverResult.result.errorMsg);
    setLoading(false);
  }

  /**
   * 모달을 껐을 때 초기화 하는 함수
   */
  function setInitialize() {
    setBaseImg('');
    setStyleImg('');
    setResultImg('');
    setIsMan(true);
    setModalVisible(false);
  }

  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
      transparent
    >
      <Container>
        <ModalContainer>
          <area.RowArea>
            <text.Subtitle1 textColor={colors.black}>
              캐릭터 모습 만들기
            </text.Subtitle1>
            <View style={{ flex: 1 }} />
            <TouchableOpacity activeOpacity={1} onPress={() => setInitialize()}>
              <Svg icon="x" size={40} />
            </TouchableOpacity>
          </area.RowArea>
          <text.Body3 textColor={colors.gray6} style={{ marginBottom: 12 }}>
            캐릭터를 대표하는 모습 2개를 넣어 주세요.
          </text.Body3>

          <ChooseButton
            isLeft={isMan}
            onPress={() => setIsMan(!isMan)}
            leftContent="남성"
            rightContent="여성"
            buttonColor={colors.gray6}
          />

          <area.RowArea
            style={{
              marginBottom: 20,
              marginTop: 24,
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity
              style={{ marginRight: 32, alignItems: 'center' }}
              onPress={() => (isSelectImg ? {} : setImage(true))}
            >
              {baseImg ? (
                <elses.CircleImg diameter={100} source={{ uri: baseImg }} />
              ) : (
                <elses.Circle diameter={100} backgroundColor={colors.gray0}>
                  <Svg icon="gallery" size={24} />
                </elses.Circle>
              )}
              <text.Body2R textColor={colors.black} style={{ marginTop: 8 }}>
                베이스
              </text.Body2R>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ alignItems: 'center' }}
              onPress={() => (isSelectImg ? {} : setImage(false))}
            >
              {styleImg ? (
                <elses.CircleImg diameter={100} source={{ uri: styleImg }} />
              ) : (
                <elses.Circle diameter={100} backgroundColor={colors.gray0}>
                  <Svg icon="gallery" size={24} />
                </elses.Circle>
              )}
              <text.Body2R textColor={colors.black} style={{ marginTop: 8 }}>
                스타일
              </text.Body2R>
            </TouchableOpacity>
          </area.RowArea>

          <View style={{ marginBottom: 24, alignItems: 'center' }}>
            <BackgroundButton
              onPress={() => refImage()}
              content="모습 만들기"
              height={22}
              isActive
              paddingH={12}
              paddingV={4}
            />
          </View>

          <View style={{ marginBottom: 42, alignItems: 'center' }}>
            {resultImg ? (
              <elses.CircleImg diameter={160} source={{ uri: resultImg }} />
            ) : (
              <elses.Circle diameter={160} backgroundColor={colors.gray0}>
                {loading ? (
                  <text.Subtitle3 textColor={colors.gray6}>
                    Loading...
                  </text.Subtitle3>
                ) : (
                  <Svg icon="questionMark" size={24} />
                )}
              </elses.Circle>
            )}
          </View>

          <View style={{ alignItems: 'center' }}>
            <LineButton
              onPress={() => [
                setNewCharacter({ ...newCharacter, profile_img: resultImg }),
                setInitialize(),
              ]}
              content="만든 모습 사용"
              borderColor={colors.primary}
            />
          </View>

          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setInitialize()}
            style={{ marginTop: 8, alignItems: 'center' }}
          >
            <text.Button3 textColor={colors.gray6}>취소</text.Button3>
          </TouchableOpacity>
        </ModalContainer>
      </Container>
    </Modal>
  );
}

const ModalContainer = styled.View`
  background-color: ${colors.white};
  border-top-left-radius: 10;
  border-top-right-radius: 10;
  border-bottom-left-radius: 10;
  border-bottom-right-radius: 10;
  padding-horizontal: 32;
  padding-vertical: 24;
  margin-horizontal: 30;
`;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${'#000000B3'};
`;
