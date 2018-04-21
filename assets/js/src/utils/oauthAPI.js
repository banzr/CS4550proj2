const doPost = ({ data, endpoint, ...rest }) =>
  $.ajax(`/oauth/v1/${endpoint}`, {
    contentType: "application/json; charset=UTF-8",
    data: JSON.stringify(data),
    dataType: "json",
    method: "post",
    ...rest
  });

const getProfile = (token, onSuccess) =>
  doPost({
    data: { token },
    endpoint: "profile",
    success: ({ profile }) => onSuccess(profile)
  });

const verifyUser = (userId, amazonUserId, onVerify) => {
  doPost({
    data: { user_id: userId, amazon_user_id: amazonUserId },
    endpoint: "verify",
    success: ({ verified }) => onVerify(verified)
  });
};

const getAccessToken = onLogin => {
  if (!amazon) return;

  amazon.Login.authorize({ scope: "profile" }, ({ access_token, error }) => {
    if (error) {
      console.log("oauth error " + error);
      return;
    }

    onLogin(access_token);
  });
};

export default { getProfile, getAccessToken };
