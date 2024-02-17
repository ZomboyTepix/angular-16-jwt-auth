import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  content: any;
  userName: any;
  constructor(userService: UserService) { 
    this.content = userService.getAdminBoard();
  }


  
  ngOnInit(): void {
    this.content.subscribe({
      next: (data: any) => {
        this.content = JSON.parse(data);
        console.log( this.content);
        this.userName = this.content[0].name;
        console.log(this.userName);
        
      },
      error: (err: { error: string; }) => {
        this.content = JSON.parse(err.error).message;
      }
    });
  }
}
