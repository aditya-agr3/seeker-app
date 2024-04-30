import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClipTextPipe } from '../../shared/pipes/clip-text.pipe';

import { FooterComponent } from '../../shared/components/footer/footer.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

import { SearchService } from '../../core/services/search.service';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [NavbarComponent, FooterComponent, CommonModule, ClipTextPipe],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent {
    posts: any = [];

    constructor(private searchService: SearchService) {}

    ngOnInit() {
        // this.fetchPost();
        this.fetchPostCache();
    }

    fetchPost() {
        this.searchService.getInformation().subscribe((data) => {
            for (let response of data.responses) {
                // console.log('Provider : ', response.message.catalog.providers);
                for (let provider of response.message.catalog.providers) {
                    // console.log('items : ', provider.items);
                    for (let item of provider.items) {
                        // console.log('item descriptor : ', item.descriptor);
                        this.posts.push(item.descriptor);
                    }
                }
            }
        });
    }

    fetchPostCache() {
        this.searchService.getInformationCache().subscribe((data) => {
            this.posts = data?.data?.vistaar_cache_db;
            console.log('Cache : ', this.posts);
        });
    }
}
