import { StyleSheet } from 'react-native';
import AppResource from './AppResource';

const GlobalStyle = {
  // MARK: --- View ---
  View: StyleSheet.create({
    horizontal: {
      flexDirection: 'row',
    },

    vertical: {
      flexDirection: 'column',
    },
  }),

  ViewSize: StyleSheet.create({
    fullWidth: {
      width: '100%',
    },

    fullHeight: {
      height: '100%',
    },

    full: {
      width: '100%',
      height: '100%',
    },
  }),

  ViewAlignment: StyleSheet.create({
    center: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),

  // MARK: --- Text ---
  // TextAlignment
  TextAlignment: StyleSheet.create({
    center: {
      textAlign: 'center',
    },

    left: {
      textAlign: 'left',
    },

    right: {
      textAlign: 'right',
    },

    justify: {
      textAlign: 'justify',
    },
  }),

  // TextVerticalAlignment
  TextVerticalAlignment: StyleSheet.create({
    center: {
      textAlignVertical: 'center',
    },
  }),

  // TextDecoration
  TextDecoration: StyleSheet.create({
    lineThrough: {
      textDecorationLine: 'line-through',
    },

    underline: {
      textDecorationLine: 'underline',
    },
  }),

  // Margin
  Margin: StyleSheet.create({
    all: (multiply = 1) => {
      const margin = AppResource.Dimensions.base * multiply;
      return {
        margin: margin,
      };
    },

    top: (multiply = 1) => {
      const marginTop = AppResource.Dimensions.base * multiply;
      return {
        marginTop: marginTop,
      };
    },

    right: (multiply = 1) => {
      const marginRight = AppResource.Dimensions.base * multiply;
      return {
        marginRight: marginRight,
      };
    },

    left: (multiply = 1) => {
      const marginLeft = AppResource.Dimensions.base * multiply;
      return {
        marginLeft: marginLeft,
      };
    },

    bottom: (multiply = 1) => {
      const marginBottom = AppResource.Dimensions.base * multiply;
      return {
        marginBottom: marginBottom,
      };
    },

    horizontal: (multiply = 1) => {
      const marginHorizontal = AppResource.Dimensions.base * multiply;
      return {
        marginHorizontal: marginHorizontal,
      };
    },

    vertical: (multiply = 1) => {
      const marginVertical = AppResource.Dimensions.base * multiply;
      return {
        marginVertical: marginVertical,
      };
    },
  }),

  // Padding
  Padding: StyleSheet.create({
    all: (multiply = 1) => {
      const padding = AppResource.Dimensions.base * multiply;
      return {
        padding: padding,
      };
    },

    top: (multiply = 1) => {
      const paddingTop = AppResource.Dimensions.base * multiply;
      return {
        paddingTop: paddingTop,
      };
    },

    right: (multiply = 1) => {
      const paddingRight = AppResource.Dimensions.base * multiply;
      return {
        paddingRight: paddingRight,
      };
    },

    left: (multiply = 1) => {
      const paddingLeft = AppResource.Dimensions.base * multiply;
      return {
        paddingLeft: paddingLeft,
      };
    },

    bottom: (multiply = 1) => {
      const paddingBottom = AppResource.Dimensions.base * multiply;
      return {
        paddingBottom: paddingBottom,
      };
    },

    horizontal: (multiply = 1) => {
      const paddingHorizontal = AppResource.Dimensions.base * multiply;
      return {
        paddingHorizontal: paddingHorizontal,
      };
    },

    vertical: (multiply = 1) => {
      const paddingVertical = AppResource.Dimensions.base * multiply;
      return {
        paddingVertical: paddingVertical,
      };
    },
  }),
};

export default GlobalStyle;
