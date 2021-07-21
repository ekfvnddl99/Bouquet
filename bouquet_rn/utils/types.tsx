import { StackScreenProps } from '@react-navigation/stack';

// welcome
export type WelcomeStackParam = {
  Welcome : undefined,
  Login : undefined,
  Tab : undefined,
}
export type WelcomeProps = StackScreenProps<WelcomeStackParam, "Welcome">;


// TAB
// home
export type HomeStackParam = {
  Home : undefined,
}
export type HomeProps = StackScreenProps<HomeStackParam, "Home">;

// search
export type SearchStackParam = {
  Search : undefined,
}
export type SearchProps = StackScreenProps<SearchStackParam, "Search">;

// crew
export type CrewStackParam = {
  Crew : undefined,
}
export type CrewProps = StackScreenProps<CrewStackParam, "Crew">;

// notification
export type NotificationStackParam = {
  Notification : undefined,
}
export type NotificationProps = StackScreenProps<NotificationStackParam, "Notification">;

// profile
export type ProfileStackParam = {
  Profile : undefined,
}
export type ProfileProps = StackScreenProps<ProfileStackParam, "Profile">;