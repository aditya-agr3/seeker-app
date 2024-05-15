import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

import { SelectService } from '../../core/services/select.service';

@Component({
    selector: 'app-about-us',
    standalone: true,
    imports: [NavbarComponent, FooterComponent],
    templateUrl: './content-detail.component.html',
    styleUrl: './content-detail.component.css',
})
export class ContentDetailComponent {
    id!: number;
    postDetails: any = {};

    constructor(
        private activatedRoute: ActivatedRoute,
        private selectService: SelectService
    ) {
        this.activatedRoute.params.subscribe((params) => {
            this.id = params?.['id'];
        });
    }

    ngOnInit() {
        this.fetchPostDetailsCache();
    }

    fetchPostDetailsCache() {
        this.selectService.getPostDetailsCache(this.id).subscribe((data) => {
            console.dir(data?.data?.vistaar_cache_db);
            this.postDetails = data?.data?.vistaar_cache_db;
        });
    }
}
