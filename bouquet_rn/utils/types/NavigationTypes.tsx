import { StackScreenProps } from '@react-navigation/stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

// welcome
export type WelcomeStackParam = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  Tab: undefined;
  CharacterGeneration: undefined;
  SettingAccountDeletion2: undefined;
  WritingStack: undefined;
  DocumentScreen: undefined;
};
export type WelcomeProps = StackScreenProps<WelcomeStackParam, 'Welcome'>;

export type TabParam = {
  Home: undefined;
  Search: undefined;
  Notification: undefined;
  Profile: undefined;
};
export type TabProps = BottomTabScreenProps<TabParam, 'Home'>;

// writing - fab
export type WritingStackParam = {
  PostWriting: undefined;
  SelectTemplate: undefined;
  PostStack: undefined;
  AlbumLyric: undefined;
};
export type WritingProps = StackScreenProps<WritingStackParam, 'PostWriting'>;
// post item
export type PostStackParam = {
  PostDetail: undefined;
  ProfileDetailStack: undefined;
};
export type PostStackProps = StackScreenProps<PostStackParam, 'PostDetail'>;
// profile item - profileoverview, character item
export type ProfileDetailStackParam = {
  ProfileDetail: undefined;
  ProfileDeletion: undefined;
  PostStack: undefined;
  AccountStack: undefined;
};
export type ProfileDetailStackProps = StackScreenProps<
  ProfileDetailStackParam,
  'ProfileDetail'
>;
// setting
export type SettingStackParam = {
  Setting: undefined;
  SettingAlarm: undefined;
  SettingAlarmCustom: undefined;
  SettingProfile: undefined;
  AccountStack: undefined;
  SettingAccountDeletion1: undefined;
};
export type SettingProps = StackScreenProps<SettingStackParam, 'Setting'>;
// character generation
export type CharacterGenerationStackParam = {
  CharacterGeneration: undefined;
};
export type CharacterGenerationProps = StackScreenProps<
  CharacterGenerationStackParam,
  'CharacterGeneration'
>;
// account
export type AccountStackParam = {
  Account: undefined;
  ProfileDetailStack: undefined;
};
export type AccountProps = StackScreenProps<AccountStackParam, 'Account'>;

// home
export type HomeStackParam = {
  Home: undefined;
  HomeTabProfileDetailStack: undefined;
  HomeTabPostStack: undefined;
  HomeTabAccountStack: undefined;
};
export type HomeProps = StackScreenProps<HomeStackParam, 'Home'>;
// search
export type SearchStackParam = {
  Search: undefined;
  SearchTabProfileDetailStack: undefined;
  SearchTabPostStack: undefined;
  SearchTabAccountStack: undefined;
};
export type SearchProps = StackScreenProps<SearchStackParam, 'Search'>;
// noti
export type NotificationStackParam = {
  Notification: undefined;
  NotiTabProfileDetailStack: undefined;
  NotiTabPostStack: undefined;
  NotiTabAccountStack: undefined;
};
export type NotificationProps = StackScreenProps<
  NotificationStackParam,
  'Notification'
>;
// profile
export type ProfileStackParam = {
  ProfileOverview: undefined;
  ProfileTabProfileDetailStack: undefined;
  ProfileTabPostStack: undefined;
  SettingStack: undefined;
  ProfileTabAccountStack: undefined;
};
export type ProfileProps = StackScreenProps<
  ProfileStackParam,
  'ProfileOverview'
>;

// crew
export type CrewStackParam = {
  Crew: undefined;
};
export type CrewProps = StackScreenProps<CrewStackParam, 'Crew'>;
