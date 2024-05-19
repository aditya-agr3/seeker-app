import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { ClipTextPipe } from '../../shared/pipes/clip-text.pipe';
import { RemoveHtmlPipe } from '../../shared/pipes/remove-html.pipe';

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
        RemoveHtmlPipe,
        FormsModule,
        MatIconModule,
        RouterModule,
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent {
    posts: any = [];
    searchQuery: string = '';
    searchQueryDelayed: any;
    isLoading: boolean = false;
    isSearched: boolean = false;

    paginatedPosts: any[] = [];
    currentPage: number = 1;
    totalPages: number = 1;
    postsPerPage: number = 6;

    constructor(private searchService: SearchService) {}

    ngOnInit() {
        this.fetchPosts();
    }

    fetchPosts(searchQuery?: string) {
        this.isLoading = true;
        this.searchService.getPosts(searchQuery).subscribe((data) => {
            this.posts = data?.data?.kahani_cache_dev;
            this.isLoading = false;
            this.updatePagination();
        });
    }

    updatePagination() {
        this.totalPages = Math.ceil(this.posts.length / this.postsPerPage);
        this.paginatePosts();
    }

    paginatePosts() {
        const startIndex = (this.currentPage - 1) * this.postsPerPage;
        const endIndex = startIndex + this.postsPerPage;
        this.paginatedPosts = this.posts.slice(startIndex, endIndex);
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.paginatePosts();
        }
    }

    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.paginatePosts();
        }
    }

    handlerSearch() {
        this.isSearched = true;
        if (this.searchQuery) {
            this.isLoading = true;
            this.fetchPosts(this.searchQuery);

            this.searchQueryDelayed = this.searchQuery;

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
        this.fetchPosts();
    }

    handleQueryChange() {
        if (!this.searchQuery) {
            this.handlerClear();
        }
    }
    handleKeyPress($event: any) {
        if ($event.key === 'Enter') {
            this.handlerSearch();
        }
    }
}
