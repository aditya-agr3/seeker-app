import { Component } from '@angular/core';

import { FooterComponent } from '../../shared/components/footer/footer.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
    selector: 'app-enroll-form',
    standalone: true,
    imports: [FooterComponent, NavbarComponent],
    templateUrl: './enroll-form.component.html',
    styleUrl: './enroll-form.component.css',
})
export class EnrollFormComponent {}
