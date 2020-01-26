import { Component, OnInit , Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService : AuthService,private router : Router,private snackBar: MatSnackBar,public dialogRef: MatDialogRef<LoginComponent>,@Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
  }
  onNoClick(): void {
      this.dialogRef.close();
    }
  onLogin(form : NgForm)
    {
    	console.log(form.value);
    	this.authService.loginUser(form.value.email,form.value.password).subscribe(data => {
            this.snackBar.open(data.message , "close",{duration: 5000});
            // this.chatService.joinRoom(data);
            if(data.token!=="")
            {
            this.authService.setUserTokenToCookie(data.token);
            this.router.navigate(['/referrals']);
           }
    	},err => {
    		console.log(err);
        this.snackBar.open(err.error.message , "close",{duration: 5000});
            
    	})
    }
}
