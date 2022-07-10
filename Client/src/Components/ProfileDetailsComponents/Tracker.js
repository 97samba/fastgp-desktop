import moment from "moment";
import COLORS from "../../colors";

/**
 *
 * @param {*} data la reservatioon
 * @returns {Number}
 * 0 si en attente --
 * 1 si en colis en livraison --
 * 2 si colis arrivé mais avant date de livraison --
 * 3 si aprés date de livraison --
 * 4 si livré
 */

function getStep(data) {
  if (data?.id) {
    if (data.status === "pending") return 0;
    if (data.status === "delivered") return 4;

    if (data.status === "ok") {
      //aprés date d'arrivée
      if (moment().isSameOrAfter(data.departureDate)) {
        //apres date de distribution
        if (moment().isSameOrAfter(data.distributionDate)) return 3;
        //avant date de distribution
        else return 2;
      } else {
        //avant date d'arrivée
        return 1;
      }
    }
  }
  return 0;
}

function getStatus(data) {
  if (data.status === "ok")
    if (moment().isSameOrAfter(data.departureDate)) {
      if (moment().isSameOrAfter(data.distributionDate)) {
        return {
          color: "primary",
          text: "Colis à récupérer",
          textColor: COLORS.black,
        };
      } else {
        return {
          color: "primary",
          text: "Transport en cours",
          textColor: COLORS.black,
        };
      }
    } else {
      return {
        color: "success",
        text: "Réservation validée",
        textColor: "green",
      };
    }
  if (data.status === "ko")
    return {
      color: "error",
      text: "Réservation annulée",
      textColor: "red",
    };
  if (data.status === "pending")
    return {
      color: "warning",
      text: "Validation en cours",
      textColor: "orange",
    };
  if (data.status === "delivered") {
    return {
      color: "success",
      text: "Colis récupéré",
      textColor: "green",
    };
  }
}
export const Tracker = {
  getStep: getStep,
  getStatus: getStatus,
};
