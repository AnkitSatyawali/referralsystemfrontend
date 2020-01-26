import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService,public dialog: MatDialog) { }

  ngOnInit() {
    this.authService.isUserLoggedIn('/referrals','/home');
  }
  openDialog(e): void {
     const dialogRef = this.dialog.open(LoginComponent, {
      data:e 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }
}
