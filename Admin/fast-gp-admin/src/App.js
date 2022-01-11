import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import moment from "moment";

import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdaptater from "@mui/lab/AdapterMoment";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./Components/AuthProvider";
import Create from "./Components/Pages/Create";
import Layout from "./Components/Layout";
import Home from "./Components/Pages/Home";
import LoginDialog from "./Components/LoginDialog";
import Manage from "./Components/Pages/Manage";
import Packages from "./Components/Pages/Packages";
import Users from "./Components/Pages/Users";

function App() {
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
      yellow: { main: "#ffaf47" },
    },
  });

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

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={DateAdaptater}>
          <AuthProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/packages" element={<Packages />} />
                <Route path="/users" element={<Users />} />
                <Route path="/manage" element={<Manage />} />
                <Route path="/create" element={<Create />} />
              </Routes>
              <LoginDialog />
            </Layout>
          </AuthProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
