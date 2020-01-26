import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
flag=false;
code;
  constructor(private route: ActivatedRoute,private authService : AuthService,private router : Router,private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.code = this.route.snapshot.paramMap.get('code');
    console.log(this.code);
    if(this.code)
    {
      console.log('entering');
      this.authService.isUserLoggedIn('/referrals','/register/'+this.code);
      this.flag=true;
    }
    else
    this.authService.isUserLoggedIn('/referrals','/register');
  }
email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
  onSignup(form : NgForm)
    {
       console.log(form.value);
       console.log(this.code);
       console.log(this.email.value);
       const obj = {
         username : form.value.username,
         email : this.email.value,
         refcode : this.code,
         password : form.value.password
       }
       this.authService.signupUser(obj).subscribe(data => {
       	   const message = "You have been registered successfully now login to get your refferal code and link";
           this.snackBar.open(message , "close",{duration: 10000});
       		this.router.navigate(['/home']);
       },err => {
         console.log(err);
           const message = "Sorry for inconvience this error is due to some internal problem";
           this.snackBar.open(err.error.message , "close",{duration: 5000});
       });
    }

}
