export const removeAccessToken = () => {
  localStorage.removeItem("access_token");
};

export const storeAccessToken = (tokenType) => (access_token) => {
  localStorage.setItem("access_token", `${tokenType} ${access_token}`);
};
