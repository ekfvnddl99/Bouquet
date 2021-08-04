import { StackScreenProps } from '@react-navigation/stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type TabParam = {
  Home: undefined,
  Search: undefined,
  Notification: undefined,
  Profile: undefined,
}
export type TabProps = BottomTabScreenProps<TabParam, "Home">

//// basics
// writing - fab
export type WritingStackParam = {
  PostWriting : undefined,
  PostItem : undefined,
}
export type WritingProps = StackScreenProps<WritingStackParam, "PostWriting">;
// post item
export type PostItemStackParam = {
  PostDetail : undefined,
  ProfileItem : undefined,
}
export type PostItemProps = StackScreenProps<PostItemStackParam, "PostDetail">;
// profile item - profileoverview, character item
export type ProfileItemStackParam = {
  ProfileDetail : undefined,
  ProfileModification : undefined,
  ProfileDeletion : undefined,
  PostItem : undefined,
}
export type ProfileItemProps = StackScreenProps<ProfileItemStackParam, "ProfileDetail">;
// setting
export type SettingStackParam = {
  Setting : undefined,
  SettingAlarm : undefined,
  SettingAlarmCustom : object,
  SettingProfile : undefined,
  SettingAccountDeletionOne : undefined,
  SettingAccountDeletionTwo : undefined,
}
export type SettingProps = StackScreenProps<SettingStackParam, "Setting">;
// character generation
export type ChaGenerationStackParam = {
  ChaGeneration:undefined
}
export type ChaGenerationProps = StackScreenProps<ChaGenerationStackParam, "ChaGeneration">;


//// tab screens
// home
export type HomeStackParam = {
  Home : undefined,
  PostItem : undefined,
  Floating : undefined,
  ChaGeneration : undefined,
}
export type HomeProps = StackScreenProps<HomeStackParam, "Home">;
// search
export type SearchStackParam = {
  Search : undefined,
  ProfileItem : undefined,
  PostItem  :undefined,
  Floating : undefined,
}
export type SearchProps = StackScreenProps<SearchStackParam, "Search">;
// noti
export type NotificationStackParam = {
  Notification : undefined,
  ProfileItem : undefined,
  PostItem : undefined,
  ChaGeneration : undefined,
}
export type NotificationProps = StackScreenProps<NotificationStackParam, "Notification">;
// profile
export type ProfileStackParam = {
  ProfileOverview : undefined,
  ProfileItem : undefined,
  Account : undefined,
  Setting : undefined,
  Floating : undefined,
}
export type ProfileProps = StackScreenProps<ProfileStackParam, "ProfileOverview">;
// welcome
export type WelcomeStackParam = {
  Welcome : undefined,
  Login : undefined,
  Register : undefined,
  Tab : undefined,
}
export type WelcomeProps = StackScreenProps<WelcomeStackParam, "Welcome">;


