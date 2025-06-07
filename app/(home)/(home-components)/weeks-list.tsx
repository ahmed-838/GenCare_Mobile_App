import { 
  SafeAreaView, 
  ScrollView, 
  View, 
  Text, 
  StyleSheet,
  TouchableOpacity,
  Image 
} from "react-native";
import React from "react";
import { router } from 'expo-router';
import Spacing from "../../../constants/Spacing";
import { NewsList } from "../../../data/pregnancyweeks";
import FontSize from "../../../constants/FontSize";
import { theme } from "../../../constants/Colors1";
import { bgColors } from "@/constants/Colors";
import { HeaderHomeFont } from "@/constants/Fonts";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.headerText}>
          Pregnancy Weeks
        </Text>

        <View style={styles.sliderContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}
          >
            {NewsList.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => {
                  router.push({
                    pathname: "/(home)/(home-components)/(pages-components)/pregnancyPage",
                    params: { news: JSON.stringify(item) }
                  });
                }}
                style={styles.weekCard}
              >
                <View style={styles.cardContainer}>
                  {/* Top half circle */}
                  <View style={styles.topHalfCircle} />

                  <Text style={styles.weekNumber}>
                    {item.id}
                  </Text>
                  
                  <Text style={styles.weekText}>
                    Weeks{'\n'}Pregnant
                  </Text>

                  <Image
                    source={item.image}
                    style={styles.weekImage}
                    resizeMode="contain"
                  />

                  {/* Bottom half circle */}
                  <View style={styles.bottomHalfCircle} />
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: bgColors.light.background,
    padding: Spacing.padding.base,
  },
  headerText: {
    fontFamily: HeaderHomeFont.fontFamily,
    color: HeaderHomeFont.color,
    fontSize: HeaderHomeFont.fontSize,
    fontWeight: '900',
  },
  sliderContainer: {
    marginTop: Spacing.margin.lg,
  },
  scrollViewContent: {
    gap: Spacing.margin.base,
  },
  weekCard: {
    width: 150,
    alignItems: 'center',
    overflow: 'hidden',
  },
  cardContainer: {
    width: "100%",
    height: 250,
    position: 'relative',
    backgroundColor: '#efefef',
    borderRadius: Spacing.borderRadius.lg,
    padding: Spacing.padding.sm,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    overflow: 'hidden',
  },
  topHalfCircle: {
    position: 'absolute',
    top: -40,
    left: -60,
    width: '90%',
    height: 60,
    backgroundColor: '#95cae4',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    transform: [{ scale: 2 }],
    zIndex: 1,
  },
  bottomHalfCircle: {
    position: 'absolute',
    bottom: -40,
    right: -60,
    width: '90%',
    height: 60,
    backgroundColor: '#ffb9cc',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    transform: [{ scale: 2 }],
    zIndex: 1,
  },
  weekNumber: {
    fontSize: FontSize.xl,
    color: theme.colors.text,
    marginTop: Spacing.margin.lg,
    marginBottom: Spacing.margin.sm,
    zIndex: 2,
  },
  weekText: {
    fontSize: FontSize.sm,
    color: theme.colors.secondary,
    textAlign: 'center',
    marginBottom: Spacing.margin.sm,
    zIndex: 2,
  },
  weekImage: {
    height: 120,
    width: "90%",
    marginTop: 'auto',
    zIndex: 2,
  },
});

export default HomeScreen;
