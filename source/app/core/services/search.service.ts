import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SearchService {
    private apiUrl = 'https://vistaar-api.tekdinext.com/search';
    private apiUrlCache = 'https://vistaar-api.tekdinext.com/cache/search';

    constructor(private http: HttpClient) {}

    getInformation(): Observable<any> {
        return this.http.post(this.apiUrl, {
            context: {
                domain: 'vistaar:content',
                action: 'search',
                version: '1.1.0',
                bap_id: 'vistaar-bap.tekdinext.com',
                bap_uri: 'https://vistaar-bap.tekdinext.com/',
                transaction_id: 'a9aaecca-10b7-4d19-b640-b047a7c60088',
                message_id: 'a9aaecca-10b7-4d19-b640-b047a7c60088',
                timestamp: '2023-02-06T09:55:41.161Z',
            },
            message: {
                intent: {
                    item: {
                        descriptor: {
                            name: 'fertilizer for rice',
                        },
                    },
                },
            },
        });
    }

    getInformationCache(searchQuery?: string): Observable<any> {
        return this.http.post(this.apiUrlCache, { title: searchQuery });
    }
}
