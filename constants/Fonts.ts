import { Dimensions } from "react-native";

const { width } = Dimensions.get('window');
export default {
  "raleway": "raleway",
  "raleway-italic": "raleway-italic",
};

export const HeaderHomeFont = {
  "fontWeight": 'bold',
  "fontSize": width * 0.07,
  "color": '#5E259B',
  "fontFamily": "raleway",
};