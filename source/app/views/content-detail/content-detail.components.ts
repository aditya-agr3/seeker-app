import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
    selector: 'app-about-us',
    standalone: true,
    imports: [NavbarComponent, FooterComponent],
    templateUrl: './content-detail.component.html',
    styleUrl: './content-detail.component.css',
})
export class ContentDetailComponent {}
