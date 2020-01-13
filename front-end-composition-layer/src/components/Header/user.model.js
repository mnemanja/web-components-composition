import * as Keycloak from "keycloak-js/dist/keycloak";

const initialState = {
  keycloak: Keycloak,
};


const keycloak = Keycloak({
  url: 'https://auth.test.ce.kiwigrid.com/auth',
  realm: 'Envia',
  clientId: 'connect-enlight-ui',
});


export default {
  state: { ...initialState },
  reducers: {
    keycloakLoadedAction(state, payload) {
      return {
        ...state,
        keycloak: payload,
      };
    },
  },
  effects: {
    fetchUser() {
      keycloak
        .init({
          onLoad: 'login-required',
          checkLoginIframe: false
        })
        .success(() => {
          this.keycloakLoadedAction(keycloak)
        })
        .error(() => {
          keycloak.login();
        });
    }
  }
};
