import { autoinject } from 'aurelia-framework';
import { AuthService } from 'services/auth-service';
import { Router } from 'aurelia-router';

@autoinject
export class Logout {

  constructor(private auth: AuthService, private router:Router) {
    auth.logout();
    router.navigate("/");
  }
}
