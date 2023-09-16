function theme() {
  return {
    ioShadow: {
      shadowColor: 'black',
      shadowOpacity: 0.25,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
    },
    // pressableIOSRiple: {
    //   button: {
    //     flex: 1,
    //   },
    //   buttonPressed: {
    //     opacity: 0.5,
    //   },
    // },
    colors: {
      primary50: '#cfeffd',
      primary100: '#a0defb',
      primary200: '#77cff8',
      primary400: '#44bdf5',
      primary500: '#1aacf0',
      primary700: '#0570c9',
      primary800: '#003b88',
      secondary500: '#e6b30b',
      gray700: '#221c30',
      error100: '#fcdcbf',
      error500: '#f37c13',
    },
  };
}
export default theme;
