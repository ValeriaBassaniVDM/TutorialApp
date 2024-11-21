import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { unsetUser } from '../auth/reducer/auth.actions';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  @Input({required:true})message!:string
  @Output() close = new EventEmitter<void>() 
  store: any;

  constructor(private authService: AuthService, private router: Router) { }

  closeAlert(){
    this.close.emit()
  }

  logout() {
   // this.store.dispatch(unsetUser())
    this.authService.setUser(undefined)
    this.router.navigate(['/'])
    this.close.emit()
  }
}
