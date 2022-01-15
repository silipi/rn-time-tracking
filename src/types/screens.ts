import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  HomeTabs: undefined;
  Auth: undefined;
};

type Props<screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  screen
>;

export default Props;
