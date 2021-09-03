import { StackScreenProps } from '@react-navigation/stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type TabParam = {
  HomeStack: undefined;
  SearchStack: undefined;
  NotificationStack: undefined;
  ProfileStack: undefined;
};
export type TabProps = BottomTabScreenProps<TabParam, 'HomeStack'>;

//// basics
// writing - fab
export type WritingStackParam = {
  PostWriting: undefined;
  SelectTemplate: undefined;
  PostStack: undefined;
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
  ProfileModification: undefined;
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
  SettingAccountDeletion2: undefined;
};
export type SettingProps = StackScreenProps<SettingStackParam, 'Setting'>;
// character generation
export type ChaGenerationStackParam = {
  ChaGeneration: undefined;
};
export type ChaGenerationProps = StackScreenProps<
  ChaGenerationStackParam,
  'ChaGeneration'
>;
// account
export type AccountStackParam = {
  Account: undefined;
  ProfileDetailStack: undefined;
};
export type AccountProps = StackScreenProps<AccountStackParam, 'Account'>;

//// tab screens
// home
export type HomeStackParam = {
  Home: undefined;
  ProfileDetailStack: undefined;
  PostStack: undefined;
  WritingStack: undefined;
  CharacterGeneration: undefined;
};
export type HomeProps = StackScreenProps<HomeStackParam, 'Home'>;
// search
export type SearchStackParam = {
  Search: undefined;
  ProfileDetailStack: undefined;
  PostStack: undefined;
  WritingStack: undefined;
};
export type SearchProps = StackScreenProps<SearchStackParam, 'Search'>;
// noti
export type NotificationStackParam = {
  Notification: undefined;
  ProfileDetailStack: undefined;
  PostStack: undefined;
  CharacterGeneration: undefined;
};
export type NotificationProps = StackScreenProps<
  NotificationStackParam,
  'Notification'
>;
// profile
export type ProfileStackParam = {
  ProfileOverview: undefined;
  ProfileDetailStack: undefined;
  SettingStack: undefined;
  WritingStack: undefined;
  CharacterGeneration: undefined;
};
export type ProfileProps = StackScreenProps<
  ProfileStackParam,
  'ProfileOverview'
>;
// welcome
export type WelcomeStackParam = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  Tab: undefined;
};
export type WelcomeProps = StackScreenProps<WelcomeStackParam, 'Welcome'>;

// crew
export type CrewStackParam = {
  Crew: undefined;
};
export type CrewProps = StackScreenProps<CrewStackParam, 'Crew'>;
