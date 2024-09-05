import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';

export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  roleId: number;
  role: string; 
} 

export interface Applicant {
  applicantId: number;
  vendorId: number;
  applicant1: string;
  email: string;
  phone: number;
  dateOfBirth: Date;
  gender: string;
  maritalStatus: string;
  occupationType: string;
  houseNo: string;
  city: string;
  district: string;
  state: string;
  landmark: string;
  pincode: number;
  country: string;
  loanAmount: number;
  loanTerm: number;
  interestRate: number;
  monthlyPayment: number;
  applicantDate: Date;
  status: string;
  lastUpdate: Date;
  loanType: string;
  loanDescription: string;
  maxLoanAmount: number;
}

@Injectable({
  providedIn: 'root'
})


export class AppService {
  getApplicantsByVendorIdToShowAll(arg0: number) {
    throw new Error('Method not implemented.');
  }
  private vendorIdSource = new BehaviorSubject<string | null>(null);
  currentVendorId = this.vendorIdSource.asObservable();

  private VendorNameSource = new BehaviorSubject<string | null>(null);
  currentVendorName = this.VendorNameSource.asObservable();

  private baseUrl = environment.apiUrlforgettingstatus;

  constructor(private http:HttpClient ) { }

  changeVendorName(vendorName: string) {
    debugger;
    this.VendorNameSource.next(vendorName);
  }
  setVendorId(vendorId: string) {
    this.vendorIdSource.next(vendorId); 

  }
  changeVendorId(vendorId: string) {
    this.vendorIdSource.next(vendorId);
  }
  checkVendorExists(vendorId: number): Observable<boolean> {
    const url = `${environment.apiUrlcheckVendorExists}/${vendorId}`;
    return this.http.get<boolean>(url);
  }
  login(user:any){
    return this.http.post(`${environment.apiUrlLogin}`, user);
  } 
  clearUserData() {
    // Clear any relevant data
    this.VendorNameSource.next(null);
    this.vendorIdSource.next(null);
    sessionStorage.clear();
    localStorage.clear();
  }

 
  getVendorName(vendorId: string): Observable<string> {
    
    return this.http.get<any>(`${environment.apiUrlforGet}/${vendorId}`).pipe(
      map(response => response.vendorName));
  }
  getAllDeals(){
    return this.http.get<any[]>(`${environment.apiUrlforGetAll}`);
  }
  // searchDatabyIDorName(query:any): Observable<any[]> {
    
  //   return this.http.get<any[]>(`${environment.apiUrlforGetApplicationsByNameId}/${query}`);
  // }
  searchDatabyIDorName(searchTerm: string): Observable<any> {
    const params = new HttpParams().set('searchTerm', searchTerm);
    return this.http.get<any>(`${environment.apiUrlforGetApplicationsByNameId}`, { params });
}
// getDataForDate(date:string): Observable<any>{
//   //const params = new HttpParams().set('searchTerm', date);
//   const formattedDate  = this.datePipe.transform(date, 'yyyy-MM-dd');
//   // const params = new HttpParams().set('date', formattedDate );
//   let params = new HttpParams();
//   if (formattedDate) {
//     params = params.set('date', formattedDate);
//   }
  
//   return this.http.get<any>(`${environment.apiUrlforGetApplicationsByDate}`, {params});
// }
addUser(user: any): Observable<any> {
  return this.http.post<any>(`${environment.apiUrlforAddUser}`, user);
}
deleteUser(userId: number): Observable<void> {
  return this.http.delete<void>(`${environment.apiUrlforDeleteUser}/${userId}`);
}
getAllUsers(): Observable<User[]> {
  return this.http.get<User[]>(`${environment.apiUrlforGetAllProfile}`);
}
updateUser(user: User): Observable<User> {
  return this.http.put<User>(`${environment.apiUrlUpdateProfile}/${user.userId}`, user);
}
addApplicant(applicant: any): Observable<any> {
  console.log('api',environment.apiUrlAddApplicant)
  console.log('data',applicant)
  return this.http.post<any>(`${environment.apiUrlAddApplicant}`, applicant);
}
getVendors(vendorId: string): Observable<any[]> {
  return this.http.get<any[]>(`${environment.apiUrlGetAllVendor}`);
}
getAllApplicants(): Observable<Applicant[]>{
  return this.http.get<Applicant[]>(`${environment.apiUrlGetAllApplicantsOnly}`);
}
deleteApplicant(applicantId: number): Observable<void> {
  return this.http.delete<void>(`${environment.apiUrlforDeleteApplicant}/${applicantId}`);
}
updateApplicant(applicantId: number, applicantData: any): Observable<void> {
  return this.http.put<void>(`${environment.apiUrlforUpdateApplicant}/${applicantId}`, applicantData);
}
getApplicantsByStatus(status: string): Observable<any[]> {
  const encodedStatus = encodeURIComponent(status);
  const apiUrl = `${this.baseUrl}/${encodedStatus}`;
  return this.http.get<any[]>(apiUrl);
}
getApplicantsByVendorIdToViewAllApplicantDetails(vendorId: any): Observable<Applicant[]> {
  return this.http.get<Applicant[]>(`${environment.apiUrlforgettingviewallapplicants}/${vendorId}`);
}
// addApplicantByVendorId(vendorId: string, applicant: Applicant): Observable<any> {
//   const url = `${environment.apiUrlToAddNewApplicantByUsingParticularVendorId}/AddApplicantByVendorId/${vendorId}`;
//   return this.http.post<any>(url, applicant);
// }
getDeals(vendorId: string): Observable<any[]> {
    
  return this.http.get<any[]>(`${environment.apiUrlforGet}/${vendorId}`);
}

}
  