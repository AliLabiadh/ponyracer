import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {UserModel} from '../models/user.model';
import {concat, EMPTY, Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {catchError, shareReplay, switchMap} from 'rxjs/operators';

@Component({
  selector: 'pr-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})

export class MenuComponent implements OnInit {
  navbarCollapsed = true;
  user: UserModel;
  userEvents: Observable<UserModel>;

  constructor(private userService: UserService,
              private router: Router) {}

  ngOnInit(): void {
    this.userEvents = this.userService.userEvents.pipe(
      switchMap(user => (user ? concat(of(user), this.userService.scoreUpdates(user.id).pipe(catchError(() => EMPTY))) : of(null))),
      shareReplay()
    );
  }

  toggleNavbar(): void{
    this.navbarCollapsed = !this.navbarCollapsed;
  }

  logout(event: Event): void {
    this.userService.logout();
    this.router.navigate(['/']);
    event.preventDefault();
  }
}
