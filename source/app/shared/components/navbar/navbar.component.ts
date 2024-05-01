import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [RouterModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
})
export class NavbarComponent {
    @Input() hero!: boolean;
    isScrolled: boolean = false;

    constructor(private router: Router) {}

    @HostListener('window:scroll', [])
    onWindowScroll() {
        // If the navbar is in hero mode, don't change the background color
        this.isScrolled = window.pageYOffset >= window.innerHeight;
        // Detect if the user has scrolled down 100vh
    }

    goBack() {
        this.router.navigate(['../']); // Go back one level in the route hierarchy
    }
}
