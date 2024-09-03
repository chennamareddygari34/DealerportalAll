// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { AppService } from './services/app.service';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss']
// })
// export class AppComponent {
//   title = 'Dealerportal';

//   vendorId: any = '';
//   // vendorName:  any[] = [];
//   vendorName:any='';
//   isLoggedIn: boolean = false;

// roleID:any;
 
//   username = '';
 
 
//   loginCredentials = { username: '', password: '' };

//   userRole:any;

//   constructor(private router:Router,private appService:AppService){}
 
//   ngOnInit(){
  
//     this.appService.currentVendorName.subscribe(
//       name=>this.vendorName=name);
    
//   }
//   login() {

//     this.appService.login(this.loginCredentials).subscribe(
//       (response:any) => {
//         console.log('res',response.roleId)
//         //this.roleID=response.roleId.toString();
//          this.isLoggedIn = true;
//          this.username = this.loginCredentials.username;
//          sessionStorage.setItem('UserRole', response.roleId);
//          this.userRole = sessionStorage.getItem('UserRole');
//         // console.log('ss',  sessionStorage.setItem('UserRole',response.roleId))

//       },
//       error => {
//         alert('Invalid credentials');
//       }
//     );
//   }

//   logout() {

//     this.isLoggedIn = false;
//     this.username = '';
//     this.vendorName = '';
//     this.vendorId = '';
//   }
//   profile(){
//     this.router.navigate(['/profile']);
//   }
 

//   updateVendorId() {
//     this.appService.changeVendorId(this.vendorId);
   
//   }
//   switchVendor() {
//     this.appService.setVendorId(this.vendorId);
//     debugger
//     this.appService.getVendorName(this.vendorId).subscribe(
//       vendorName => {
//         debugger
//         this.vendorName = vendorName;
//       },
//       error => {
//         console.error('Error fetching vendor name', error);
//         this.vendorName = null;
//       }
//     );
//   }
// }
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Dealerportal';

  vendorId: string = '';
  vendorName: string | null = ''; // Update to allow string or null
  isLoggedIn: boolean = false;
  username: string = '';
  loginCredentials = { username: '', password: '' };
  userRole: any;

  constructor(private router: Router, private appService: AppService) {}

  ngOnInit() {
    this.appService.currentVendorName.subscribe(
      name => this.vendorName = name || '' // Handle null case
    );
  }

  login() {
    this.appService.login(this.loginCredentials).subscribe(
      (response: any) => {
        this.isLoggedIn = true;
        this.username = this.loginCredentials.username;
        sessionStorage.setItem('UserRole', response.roleId);
        this.userRole = sessionStorage.getItem('UserRole');
        this.router.navigate(['/dashboard']);
      },
      error => {
        alert('Invalid credentials');
      }
    );
  }

  logout() {
    this.appService.clearUserData();
    this.isLoggedIn = false;
    this.username = '';
    this.vendorName = ''; // Set to an empty string
    this.vendorId = '';
    this.router.navigate(['/login']);
  }

  profile() {
    this.router.navigate(['/profile']);
  }

  updateVendorId() {
    this.appService.changeVendorId(this.vendorId);
  }

  switchVendor() {
    this.appService.setVendorId(this.vendorId);
    this.appService.getVendorName(this.vendorId).subscribe(
      vendorName => {
        this.vendorName = vendorName || ''; // Handle null case
      },
      error => {
        console.error('Error fetching vendor name', error);
        this.vendorName = ''; // Set to an empty string
      }
    );
  }
}
