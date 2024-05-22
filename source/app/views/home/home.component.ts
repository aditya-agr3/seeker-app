import { Component, ChangeDetectorRef } from '@angular/core';
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
    styleUrls: ['./home.component.css'],
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

    constructor(
        private searchService: SearchService, 
        private cdr: ChangeDetectorRef 
    ) {}

    ngOnInit() {
        this.fetchPosts();  
    }

    // Fetch posts from the API with optional search query
    fetchPosts(searchQuery?: string) {
        this.isLoading = true;  
        this.searchService.getPosts(searchQuery).subscribe((data) => {
            this.posts = data?.data?.kahani_cache_dev; 
            this.isLoading = false; 
            this.updatePagination();  
        });
    }

    // Update pagination details
    updatePagination() {
        this.totalPages = Math.ceil(this.posts.length / this.postsPerPage); 
        this.paginatePosts();
    }

    // Slice posts array to get posts for the current page
    paginatePosts() {
        const startIndex = (this.currentPage - 1) * this.postsPerPage;
        const endIndex = startIndex + this.postsPerPage;
        this.paginatedPosts = this.posts.slice(startIndex, endIndex);  
    }

    // Move to the next page of posts
    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.paginatePosts();
        }
    }

    // Move to the previous page of posts
    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.paginatePosts();
        }
    }

    // Handle search button click or Enter key press
    handlerSearch() {
        this.isSearched = true;  
        if (this.searchQuery) {
            this.isLoading = true;  
            this.fetchPosts(this.searchQuery);  

            this.searchQueryDelayed = this.searchQuery;  

            this.cdr.detectChanges(); 

            this.toSearchResult();
        }
    }

    // Clear search and reset posts
    handlerClear() {
        this.isSearched = false;  
        this.searchQuery = '';  
        this.fetchPosts();  
    }

    // Handle changes to the search query input
    handleQueryChange() {
        if (!this.searchQuery) {
            this.handlerClear();  
        }
    }

    // Handle Enter key press event for the search input
    handleKeyPress(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            this.handlerSearch();  
        }
    }

    // Scroll to the search result section smoothly
    toSearchResult() {
        const searchResultElement = document.getElementById('search-result');
        if (searchResultElement) {
            searchResultElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'nearest',
            });
        }
    }
}
