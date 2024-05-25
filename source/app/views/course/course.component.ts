import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

import { RouterModule } from '@angular/router';
import { ConfirmService } from '../../core/services/confirm.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-course',
    standalone: true,
    imports: [FooterComponent, NavbarComponent],
    templateUrl: './course.component.html',
    styleUrl: './course.component.css',
})
export class CourseComponent {
    isLoading = false;
    postDetails: any = {};
    providerId!: string;
    itemId!: string;
    userDetails!: any;

    constructor(
        private activatedRoute: ActivatedRoute,
        private confirmService: ConfirmService
    ) {
        this.activatedRoute.queryParams.subscribe((params) => {
            this.providerId = params['provider_id'];
            this.itemId = params['item_id'];
        });

        let user = localStorage.getItem('userDetails');
        if (user) {
            this.userDetails = JSON.parse(user);
        }
    }

    ngOnInit() {
        this.fetchCourse();
    }

    fetchCourse() {
        this.isLoading = true;
        this.confirmService
            .getCourseDetails(this.providerId, this.itemId, this.userDetails)
            .subscribe((data) => {
                console.log('data ', data);
                this.isLoading = false;
            });
    }
}
