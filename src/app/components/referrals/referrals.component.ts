import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { DetailService } from '../../services/detail.service';
import API_URL from '../../config/URL';

@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.css']
})
export class ReferralsComponent implements OnInit {
url='';
usersArray=[];
refnumber;
credits;
refcode;
  constructor(private detailService: DetailService,private authService:AuthService,private snackBar: MatSnackBar) {

  }

  ngOnInit() {
  	this.authService.isUserLoggedIn('/referrals','/referrals');
  	this.detailService.getDetails().subscribe(result => {
  		console.log(result);
      this.refnumber = result.numberofref;
      this.credits = result.credits;
      this.refcode = result.refcode;
      this.usersArray = result.referrals
      this.url = 'https://refsystemtask.herokuapp.com/register/'+this.refcode;
  	},err => {
    		console.log(err);
          
    	})
  	
  	console.log(this.url)
  }
  logout(){
    this.authService.logout();
  }

}
