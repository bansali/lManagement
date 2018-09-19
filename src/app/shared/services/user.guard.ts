import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AppstoreService } from './appstore.service';
import swal from 'sweetalert2';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private appStore:AppstoreService,private route:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      console.log('in user guard');
      console.log(this.appStore.userLoginStatus);
      console.log(this.appStore.adminLoginStatus);
      if (this.appStore.userLoginStatus || this.appStore.adminLoginStatus){
        return true;
      }else {
        swal({
          type:'warning',
          title:'Oops...',
          text:'Login to Perform this Action',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, LogIn!'

        }).then(result=>{
          console.log(result)
          if(result.value === true){
            this.appStore.loginSubject.next('from issue');
          }
        });
        // alert('Login To perform further action');
        // this.route.navigate(['']);

        return false;
      }
    
  }
}
