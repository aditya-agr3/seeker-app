import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { ClipTextPipe } from '../../shared/pipes/clip-text.pipe';

import { FooterComponent } from '../../shared/components/footer/footer.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

import { SearchService } from '../../core/services/search.service';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        NavbarComponent,
        FooterComponent,
        CommonModule,
        ClipTextPipe,
        FormsModule,
        MatIconModule,
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent {
    posts: any = [];
    searchQuery: string = '';
    isLoading: boolean = false;
    isSearched: boolean = false;

    constructor(private searchService: SearchService) {}

    ngOnInit() {
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
        this.isLoading = true;
        this.searchService.getInformationCache().subscribe((data) => {
            console.log('API Response : ', data?.data?.vistaar_cache_db);
            this.posts = data?.data?.vistaar_cache_db;
            this.isLoading = false;
        });
    }

    handlerSearch() {
        this.isSearched = true;
        if (this.searchQuery) {
            this.isLoading = true;
            this.searchService
                .getInformationCache(this.searchQuery)
                .subscribe((data) => {
                    console.log(
                        'API Response : ',
                        data?.data?.vistaar_cache_db
                    );
                    this.posts = data?.data?.vistaar_cache_db;
                    this.isLoading = false;
                });
            const searchResultElement =
                document.getElementById('search-result');
            if (searchResultElement) {
                searchResultElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'nearest',
                });
            }
        }
    }

    handlerClear() {
        this.isSearched = false;
        this.searchQuery = '';
        this.fetchPostCache();
    }
}
