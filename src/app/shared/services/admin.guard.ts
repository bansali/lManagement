import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AppstoreService } from './appstore.service';
import swal from 'sweetalert2';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private appStore:AppstoreService,private route :Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      console.log(this.appStore.adminLoginStatus)
      if(this.appStore.adminLoginStatus !== true){
        swal({
          type:'warning',
          title:'Oops... U R not Admin',
          text:'Login As User',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, LogIn!'

        }).then(result=>{
          console.log(result)
          if(result.value === true){
            this.appStore.loginSubject.next('from issue');
          }else{
            this.route.navigate(['']);
          }
        });
        return false;
      }
    return true;
  }
}
