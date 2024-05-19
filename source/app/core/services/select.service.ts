import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
    providedIn: 'root',
})
export class SelectService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getPostDetails(providerId: string, itemId: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/select`, {
            context: {
                domain: 'onest:learning-experiences',
                action: 'select',
                version: '1.1.0',
                bap_id: 'kahani-bap.tekdinext.com',
                bap_uri: 'https://kahani-bap.tekdinext.com/',
                bpp_id: 'kahani-bpp.tekdinext.com',
                bpp_uri: 'https://kahani-bpp.tekdinext.com/',
                transaction_id: 'b2e2c51d-d29a-4873-87f8-d7a81bbba283',
                message_id: '781cb49a-64a9-487e-82f9-f939705e1f3d',
                timestamp: '2024-05-14T11:39:17.721Z',
            },
            message: {
                order: {
                    provider: {
                        id: providerId,
                    },
                    items: [
                        {
                            id: itemId,
                        },
                    ],
                },
            },
        });
    }
}
