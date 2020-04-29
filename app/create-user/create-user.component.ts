import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Account} from './account';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router){}
  user;
  accountModel = new Account("", "", "");
  accounts: Account[];
  responseData;

  ngOnInit() {

  }

  redirectSuccess(){
    this.router.navigate(['/homepage'])
  }

  submitAccount(form: any): void{
    if(this.validateAccount()){
      window.localStorage.setItem('user', this.accountModel.user);
      let params = JSON.stringify(this.accountModel);
      console.log(params);
      this.http.post<Account>('http://localhost/api/createAccount.php', params).subscribe((data) =>{
        console.log('Response: ', data);
      },(error) =>{
        if(error==201){
          //this.redirectSuccess();
        }
        this.redirectSuccess();


        console.log('Error: ', error);
      });
    }
  }

  usernameAlert(){
    document.getElementById("usernameAlert").innerHTML = "Please enter a username";
  }
  pwdAlert(){
    document.getElementById("pwdAlert").innerHTML = "Please enter a password";
  }
  pwd2Alert(){
    document.getElementById("pwd2Alert").innerHTML = "Please enter your password again";
  }
  
    validateAccount() {
      var fail = true
      if(this.accountModel.user == ""){
        this.usernameAlert();
        fail = false;
      }
      else{
        document.getElementById("usernameAlert").innerHTML = ""
      }
      if(this.accountModel.pwd == "" ){
        this.pwdAlert();
        fail = false;
      }
      else{
        document.getElementById("pwdAlert").innerHTML = ""
      }
      if(this.accountModel.pwd2 == "" ){
        this.pwd2Alert();
        fail = false;
      }
      else{
        document.getElementById("pwd2Alert").innerHTML = ""
      }
      if(this.accountModel.pwd2 != this.accountModel.pwd) {
        console.log(this.accountModel.pwd2);
        console.log(this.accountModel.pwd);
        document.getElementById("pwd2Alert").innerHTML = "Passwords do not match"
        fail = false;
      }
      else {
        document.getElementById("pwd2Alert").innerHTML = ""
      }
      return fail;
    }
}





