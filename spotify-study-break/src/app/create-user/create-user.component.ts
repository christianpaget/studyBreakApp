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
  accountModel = new Account("", "");
  accounts: Account[];
  responseData;

  ngOnInit() {

  }

  redirectSuccess(){
    this.router.navigate(['/homepage'])
  }

  submitAccount(form: any): void{
    if(this.validateAccount()){
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
/*
  usernameAlert(){
    document.getElementById("usernameAlert").innerHTML = "Please enter a username";
  }
  pwdAlert(){
    document.getElementById("pwdAlert").innerHTML = "Please enter a password";
  }
  pwd2Alert(){
    document.getElementById("pwd2Alert").innerHTML = "Please enter your password again";
  }
  */
    validateAccount() {
      var fail = true
      if(this.accountModel.user == ""){
  //      this.usernameAlert();
        fail = false;
        console.log('failed username');
      }
      else{
        //document.getElementById("usernameAlert").innerHTML = ""
        console.log('username worked');
      }
      if(this.accountModel.pwd == "" ){
  //      this.pwdAlert();
        fail = false;
        console.log('failed pwd1');
      }
      else{
        //document.getElementById("pwdAlert").innerHTML = ""
        console.log('password worked');
      }
      return fail;
    }
}





