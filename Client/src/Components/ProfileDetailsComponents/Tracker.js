import moment from "moment";

function getStep(data) {
  if (data?.id) {
    if (data.status === "pending") return 0;
    if (data.status === "delivered") return 4;

    if (data.status === "ok") {
      if (moment().isSameOrAfter(data.departureDate)) {
        if (moment().isSameOrAfter(data.distributionDate)) return 3;
        else return 2;
      } else {
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
          textColor: "black",
        };
      } else {
        return {
          color: "primary",
          text: "Transport en cours",
          textColor: "black",
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
