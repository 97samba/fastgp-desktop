export const Authenticate = (history) => {
  if (localStorage.getItem("AuthToken") === null) {
    history.push("/");
  }
};
