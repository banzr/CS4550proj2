import { createReducer } from "../../utils/redux";
import { LOGIN } from "./actions";

// placeholder state and actions for example purposes, to be filled in later
const initialState = {
  token: "not set"
};

export default createReducer(initialState, {
  [LOGIN]: state => {
    console.log("login action fired");
    const options = { scope: "profile" };
    amazon.Login.authorize(options,
        function(response) {
            if ( response.error ) {
                alert('oauth error ' + response.error);
                return;
            }
            amazon.Login.retrieveProfile(response.access_token, function(response) {
                console.log(response);

            });
        });
    return state;
  }
});
