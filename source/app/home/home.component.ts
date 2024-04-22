import { Component } from '@angular/core';
import { FooterComponent } from '../shared/footer/footer.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [NavbarComponent, FooterComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent {}
