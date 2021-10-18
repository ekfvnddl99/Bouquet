import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import i18n from 'i18n-js';

// assets
import Svg from '../../assets/Icon';

// styles
import colors from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';

// utils
import { Post, AllTemplates } from '../../utils/types/PostTypes';

//  logics
import useUser from '../../logics/hooks/useUser';
import useCharacter from '../../logics/hooks/useCharacter';
import { reportPostAsync } from '../../logics/server/Post';
import { blockCharacterAsync } from '../../logics/server/Character';
import { blockUserAsync } from '../../logics/server/User';

// components
import ProfileButton from '../../components/button/ProfileButton';
import SunButton from '../../components/button/SunButton';
import LineButton from '../../components/button/LineButton';
import HalfModal from '../../components/view/HalfModal';

// templates
import TextTemplate from '../template/TextTemplate';

type PostDetailTopViewProps = {
  viewPost: Post<AllTemplates>;
  routePrefix: string;
  postOwner: boolean;
  template: true | JSX.Element | null;
  onDelete: () => void;
  onPressSun: () => void;
};
/**
 * TODO 댓글 삭제
 * TODO 햇님 누르기
 * @returns
 */
export default function PostDetailTopView({
  viewPost,
  routePrefix,
  postOwner,
  template,
  onDelete,
  onPressSun,
}: PostDetailTopViewProps): React.ReactElement {
  const user = useUser();
  const [myCharacter] = useCharacter();
  const [modalVisible, setModalVisible] = useState(false);

  async function reportPost() {
    const serverResult = await reportPostAsync(viewPost.id);
    if (serverResult.isSuccess) {
      alert('신고가 접수되었습니다.');
    } else alert(serverResult.result.errorMsg);
  }

  const blockSomeone = async (what: string) => {
    let serverResult;
    if (what === 'user') serverResult = await blockUserAsync(user.id);
    else serverResult = await blockCharacterAsync(myCharacter.id);
    if (serverResult.isSuccess) {
      alert('차단되었습니다.');
    } else alert(serverResult.result.errorMsg);
  };

  return (
    <View>
      <HalfModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onReport={() => reportPost()}
        onStop={blockSomeone}
        onDelete={() => onDelete()}
        isCanDelete={postOwner}
      />
      <View style={{ paddingTop: 20 }} />

      <area.RowArea>
        <View style={{ flex: 1 }}>
          <ProfileButton
            diameter={30}
            isAccount={false}
            isJustImg={false}
            isPress
            name={viewPost?.character_info.name}
            profileImg={viewPost?.character_info.profile_img}
            routePrefix={routePrefix}
          />
        </View>
        {user.name !== '' ? (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setModalVisible(true)}
          >
            <Svg icon="moreOption" size={25} />
          </TouchableOpacity>
        ) : null}
      </area.RowArea>
      <View style={{ marginBottom: 12 }} />
      {template}
      {viewPost?.template && viewPost.text ? (
        <TextTemplate mode="detail" post={viewPost.text} />
      ) : null}
      <View style={{ alignItems: 'flex-start' }}>
        <SunButton
          sunNumber={viewPost?.num_sunshines}
          active={viewPost?.liked}
          onPress={() => onPressSun()}
        />
      </View>
      <text.Subtitle3 textColor={colors.black} style={{ marginTop: 36 }}>
        {i18n.t('반응')}
      </text.Subtitle3>

      <View style={{ paddingTop: 12 }} />
    </View>
  );
}
