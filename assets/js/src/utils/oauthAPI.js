const doPost = ({ data, endpoint, ...rest }) =>
  $.ajax(`/oauth/v1/${endpoint}`, {
    contentType: "application/json; charset=UTF-8",
    data: JSON.stringify(data),
    dataType: "json",
    method: "post",
    ...rest
  });

const getProfile = (userId, token, onSuccess) =>
  doPost({
    data: { token, user_id: userId },
    endpoint: "profile",
    success: ({ profile }) => onSuccess(profile)
  });

export default { getProfile };
