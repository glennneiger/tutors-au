import { WebAuth, Auth0DecodedHash } from "auth0-js";
import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { EventEmitter } from "events";
import env from "../environment";

@autoinject
export class AuthService {
  private accessToken: string;
  private id_token: string;
  private expires_at: string;

  authNotifier = new EventEmitter();

  auth0 = new WebAuth({
    domain: env.auth0.domain,
    clientID: env.auth0.clientId,
    //redirectUri: "http://localhost:8080/#callback",
    redirectUri: "https://tutors.design/callback",
    audience: `https://${env.auth0.domain}/userinfo`,
    responseType: "token id_token",
    scope: "openid"
  });

  constructor(private router: Router) {
    this.authNotifier.setMaxListeners(21);
  }

  handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);

        const url = localStorage.getItem('course_url')
        this.router.navigate(`/course/${url}`);

        this.authNotifier.emit("authChange", { authenticated: true });
      } else if (err) {
        console.log(err);
      }
    });
  }

  login() {
    this.auth0.authorize();
  }

  setSession(authResult) {
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.router.navigate('home');
    this.authNotifier.emit('authChange', false);
  }

  isAuthenticated() {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
