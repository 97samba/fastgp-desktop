import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./Components/NavBar";
import DateAdaptater from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
import moment from "moment";
import Creation from "./Components/Pages/Creation";
import Account from "./Components/Pages/Account";
import Search from "./Components/Pages/Search";
import Home from "./Components/Pages/Home";
import View from "./Components/Pages/View";
import Footer from "./Components/Footer";
import GPViewer from "./Components/Pages/GPViewer";
moment.locale("fr", {
  months:
    "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split(
      "_"
    ),
  monthsShort: "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
  monthsParseExact: true,
  weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
  weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
  weekdaysMin: "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD/MM/YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY HH:mm",
    LLLL: "dddd D MMMM YYYY HH:mm",
  },
  calendar: {
    sameDay: "[Aujourd’hui à] LT",
    nextDay: "[Demain à] LT",
    nextWeek: "dddd [à] LT",
    lastDay: "[Hier à] LT",
    lastWeek: "dddd [dernier à] LT",
    sameElse: "L",
  },
  relativeTime: {
    future: "dans %s",
    past: "il y a %s",
    s: "quelques secondes",
    m: "une minute",
    mm: "%d minutes",
    h: "une heure",
    hh: "%d heures",
    d: "un jour",
    dd: "%d jours",
    M: "un mois",
    MM: "%d mois",
    y: "un an",
    yy: "%d ans",
  },
  dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
  ordinal: function (number) {
    return number + (number === 1 ? "er" : "e");
  },
  meridiemParse: /PD|MD/,
  isPM: function (input) {
    return input.charAt(0) === "M";
  },
  // In case the meridiem units are not separated around 12, then implement
  // this function (look at locale/id.js for an example).
  // meridiemHour : function (hour, meridiem) {
  //     return /* 0-23 hour, given meridiem token and hour 1-12 */ ;
  // },
  meridiem: function (hours, minutes, isLower) {
    return hours < 12 ? "PD" : "MD";
  },
  week: {
    dow: 1, // Monday is the first day of the week.
    doy: 4, // Used to determine first week of the year.
  },
});

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        // main: "#494aa2",
        main: "#535591",
      },
      secondary: {
        main: "#535591",
      },
      info: {
        main: "#f4a261",
      },
      warning: {
        main: "#e76f51",
      },
    },
    typography: {
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Inter"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
  });
  return (
    // <div style={{ background: "#F6F6F9", minWidth: "100%" }}>
    <div style={{ minWidth: "100%" }}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={DateAdaptater}>
          <NavBar />
          <Router>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/search">
                <Search />
              </Route>
              <Route path="/create">
                <Creation />
              </Route>
              <Route path="/view">
                <View />
              </Route>
              <Route path="/account">
                <Account />
              </Route>
              <Route path="/GPprofile">
                <GPViewer />
              </Route>
            </Switch>
          </Router>
          <Footer />
        </LocalizationProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;
