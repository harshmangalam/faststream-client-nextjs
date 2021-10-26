export const removeAccessToken = () => {
  localStorage.removeItem("access-token");
};

export const storeAccessToken = (tokenType) => (access_token) => {
  localStorage.setItem("access-token", `${tokenType} ${access_token}`);
};
