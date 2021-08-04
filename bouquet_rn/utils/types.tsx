import { StackScreenProps } from '@react-navigation/stack';

// welcome
export type WelcomeStackParam = {
  Welcome : undefined,
  Login : undefined,
  Register : undefined,
  Tab : undefined,
}
export type WelcomeProps = StackScreenProps<WelcomeStackParam, "Welcome">;

export type ChaGenerationStackParam = {
  ChaGeneration : undefined,
  Profile : undefined,
}
export type ChaGenerationProps = StackScreenProps<ChaGenerationStackParam, "ChaGeneration">;

export type WritingStackParam = {
  PostWriting : undefined,
}
export type WritingProps = StackScreenProps<WritingStackParam, "PostWriting">;

export type PostingStackParam = {
  Posting : undefined,
  ProfileDetail : undefined,
}
export type PostingProps = StackScreenProps<PostingStackParam, "Posting">;

export type SettingStackParam = {
  Setting : undefined,
  SettingAlarm : undefined,
  SettingAlarmCustom : object,
  SettingProfile : undefined,
  SettingAccountDeletionOne : undefined,
  SettingAccountDeletionTwo : undefined,
}
export type SettingProps = StackScreenProps<SettingStackParam, "Setting">;

// TAB
// home
export type HomeStackParam = {
  Home : undefined,
  Generation : {id : number},
  PostingItem : undefined,
}
export type HomeProps = StackScreenProps<HomeStackParam, "Home">;

// search
export type SearchStackParam = {
  Search : undefined,
  Episode : undefined,
  PostingItem  :undefined
}
export type SearchProps = StackScreenProps<SearchStackParam, "Search">;

// notification
export type NotificationStackParam = {
  Notification : undefined,
  Generation : object,
}
export type NotificationProps = StackScreenProps<NotificationStackParam, "Notification">;

// profile
export type ProfileStackParam = {
  ProfileOverview : undefined,
  ProfileDetail : undefined,
  Account : undefined,
  ProfileDeletion : undefined,
  ProfileModification : undefined,
  Setting : undefined
}
export type ProfileProps = StackScreenProps<ProfileStackParam, "ProfileOverview">;

// crew
export type CrewStackParam = {
  Crew : undefined,
}
export type CrewProps = StackScreenProps<CrewStackParam, "Crew">;

// infos
export type User = {
  isLogined: boolean;
  id: number;
  email: string;
  name: string;
  profileImg: string;
  snsType: string;
}