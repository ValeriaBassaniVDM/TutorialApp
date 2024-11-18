import { Component, DestroyRef, inject, Input, OnInit, output } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { User } from '../app.component';
import { AuthService } from '../auth/auth.service';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, RouterLinkActive, AlertComponent, NgClass],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {

  //@Input() user!:User

  categories: string[] = ["Home", "Work", "School"];
  users: User[] = []
  user: User | undefined;
  constructor(private authService: AuthService) { }
  ngOnInit() {
    this.authService.getUserObservable().subscribe(user => {
      this.user = user;
    });
  }
  categoryCount(category: string): number {

    if (this.user) {
      this.users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
      let count = 0;
      const i = this.users.findIndex(u => u.id === this.user!.id);
      this.users[i].tasks.forEach(task => {
        if (task.category === category) {
          count++;
        }
      });
      return count;
    }
    return 0
  }

  message:string | null = null

  setAlert(){
    this.message="Sure to logout?"
  }

  handleAlert(){
    this.message=null
  }
}
