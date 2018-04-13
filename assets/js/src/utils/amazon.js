export const getAccessToken = onLogin => {
  if (!amazon) return;

  amazon.Login.authorize({ scope: "profile" }, ({ access_token, error }) => {
    if (error) {
      console.log("oauth error " + error);
      return;
    }

    onLogin(access_token);
  });
};
