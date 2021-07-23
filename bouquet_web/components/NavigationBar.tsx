import React, { useCallback, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import { colors } from '../styles/Colors';
import { Button1B } from '../styles/TextStyles';
import Icon from './Icons';

import { pageState } from '../features/atoms';
import { useEffect } from 'react';

const Wrap = styled.div`
  display: flex;
  flex: 0 0;

  background-color: ${colors.grayscale.white};

  @media (min-width: 320px) and (max-width: 519px) {
    width: 100%;
    height: 60px;

    justify-content: center;
    align-items: center;
    flex-basis: 60px;
  }

  @media (min-width: 520px) and (max-width: 729px) {
    width: 60px;
    height: 100%;

    justify-content: center;
    flex-basis: 60px;
  }

  @media (min-width: 730px) {
    width: 170px;
    height: 100%;

    flex-basis: 170px;
  }
`;

const IconWrap = styled.div`
  display: flex;

  @media (min-width: 320px) and (max-width: 519px) {
    width: 320px;
    height: 100%;

    align-items: center;
  }

  @media (min-width: 520px) and (max-width: 729px) {
    width: 100%;
    height: 300px;
    margin-top: 18px;

    flex-direction: column;
  }

  @media (min-width: 730px) {
    width: 100%;
    height: 300px;
    margin-top: 18px;

    flex-direction: column;
  }
`;

const MenuFrame = styled.div<{active: boolean}>`
  width: 100%;
  height: 100%;

  transition: 0.3s;

  display: flex;
  align-items: center;

  span {
    color: ${props => (props.active ? colors.primary.normal : colors.grayscale.gray5)};
  }

  &:hover {
    background-color: ${colors.grayscale.gray1};
    transition: 0.3s;
  }

  &:active {
    background-color: ${colors.grayscale.gray2};

    span {
      color: ${props => (props.active ? colors.primary.pressed : colors.grayscale.gray6)};
    }
  }

  @media (min-width: 320px) and (max-width: 519px) {
    justify-content: center;
  }

  @media (min-width: 520px) and (max-width: 729px) {
    justify-content: center;
  }

  @media (min-width: 730px) {
    justify-content: flex-start;
    padding-left: 18px;
  }
`;

const IconFrame = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LinkTextFrame = styled.div`
  @media (max-width: 729px) {
    display: none;
  }

  @media (min-width: 730px) {
    height: 100%;
    margin-left: 10px;

    display: flex;
    align-items: center;
  }
`;

const CustomA = styled.a`
  display: flex;
  align-items: center;

  @media (min-width: 320px) and (max-width: 519px) {
    width: 20%;
    height: 100%;
  }

  @media (min-width: 520px) and (max-width: 729px) {
    width: 100%;
    height: 20%;
  }

  @media (min-width: 730px) {
    width: 100%;
    height: 20%;
  }
`;


type MenuProps = {
  name: string;
  korName: string;
}

const Menu = function Menu({ name, korName }: MenuProps) {
  const [active, setActive] = useRecoilState(pageState);
  const getActivated = useCallback(() => (active === name), [active, name]);
  const activated = useMemo(() => getActivated(), [getActivated]);

  const getVarient = useCallback(() => {
    return activated ? "filled" : "outline";
  }, [activated]);

  const varient = useMemo(() => getVarient(), [getVarient]);

  return (
    <Link href={{pathname: `/${name === 'home' ? '' : name}`}} passHref>
      <CustomA>
        <MenuFrame onClick={() => setActive(name)} active={activated}>
          <IconFrame>
            <Icon
              name={name}
              varient={varient}
              width={24}
              height={24}
              color={activated ? colors.primary.normal : colors.grayscale.gray5}
            />
          </IconFrame>
          <LinkTextFrame>
            <Button1B>{korName}</Button1B>
          </LinkTextFrame>
        </MenuFrame>
      </CustomA>
    </Link>
  );
};

export default function NavigationBar() {
  const [active, setActive] = useRecoilState(pageState);
  const router = useRouter();

  useEffect(() => {
    const path = router.pathname;
    if (path === '/') setActive('home');
    else setActive(path.slice(1));
  }, [router.pathname, setActive]);

  return (
    <Wrap>
      <IconWrap>
        <Menu name="home" korName="홈" />
        <Menu name="search" korName="검색" />
        <Menu name="crew" korName="크루" />
        <Menu name="notifications" korName="알림" />
        <Menu name="profile" korName="프로필" />
      </IconWrap>
    </Wrap>
  )
}