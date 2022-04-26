import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AlertService } from "./alert.service";
import { ApiService } from "./api.service";

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(
        public apiService:ApiService,
        public alert:AlertService,
        public router:Router
    ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        var roles = route.data["roles"] as Array<string>;
        var backUrl = route.data["back"] as string;

        if(!this.apiService.checkLogin() || !roles || !roles.length){
            this.router.navigate([backUrl]);
            return false;
        }

        var resp:boolean = false;

        resp = this.apiService.checkRoles(roles);

        if(!resp){
            this.router.navigate([backUrl]);
        }

        return resp;
    }
}