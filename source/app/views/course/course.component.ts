import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { RouterModule } from '@angular/router';
import { ConfirmService } from '../../core/services/confirm.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-course',
    standalone: true,
    imports: [FooterComponent, NavbarComponent, CommonModule],
    templateUrl: './course.component.html',
    styleUrl: './course.component.css',
})
export class CourseComponent {
    isLoading = false;
    courseDetails: any = {};
    providerId!: string;
    itemId!: string;
    userDetails!: any;
    courseUrl: any =
        'https://trial.vowel.work/Onestcontent/course-library/how-to-look-for-better-opportunities-as-a-blue-collar-worker-hindi';
    @ViewChild('courseIframe', { static: false })
    courseIframe!: ElementRef<HTMLIFrameElement>;

    constructor(
        private activatedRoute: ActivatedRoute,
        private confirmService: ConfirmService,
        private sanitizer: DomSanitizer
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
        this.courseUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            this.courseUrl
        );
    }

    fetchCourse() {
        this.isLoading = true;
        this.confirmService
            .getCourseDetails(this.providerId, this.itemId, this.userDetails)
            .subscribe((data) => {
                this.courseDetails = data?.responses?.[0]?.message?.order;
                this.isLoading = false;

                console.log(this.courseDetails);

                if (
                    this.courseDetails?.fulfillments?.[0]?.stops?.[0]
                        ?.instructions?.media?.[0]?.url
                ) {
                    this.courseUrl =
                        this.sanitizer.bypassSecurityTrustResourceUrl(
                            this.courseDetails?.fulfillments?.[0]?.stops?.[0]
                                ?.instructions?.media?.[0]?.url
                        );
                }

                if (
                    this.courseDetails?.items[0]?.['add-ons']?.[0]?.descriptor
                        ?.media?.[0]?.url
                ) {
                    this.courseUrl =
                        this.sanitizer.bypassSecurityTrustResourceUrl(
                            this.courseDetails?.items[0]?.['add-ons']?.[0]
                                ?.descriptor?.media?.[0]?.url
                        );
                }
            });
    }

    ngAfterViewInit() {
        if (!this.courseIframe) return;
        this.courseIframe.nativeElement.onload = () => {
            this.adjustIframeHeight();
        };
    }

    adjustIframeHeight() {
        const iframe = this.courseIframe.nativeElement;
        const iframeDocument =
            iframe.contentDocument || iframe.contentWindow?.document;
        if (iframeDocument) {
            iframe.style.height = iframeDocument.body.scrollHeight + 'px';
        }
    }
}
