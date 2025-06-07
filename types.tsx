/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { News } from "./data/pregnancyweeks";

export type RootStackType = {
  HomeTabs: undefined;
  PregnancyWeek: { news: News };
};

export type TabNavigatorType = {
  HomeNavigator: undefined;
  NewsNavigator: undefined;
  SettingsScreen: undefined;
};
