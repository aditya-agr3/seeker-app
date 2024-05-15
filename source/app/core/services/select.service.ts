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

    getPostDetailsCache(id?: number): Observable<any> {
        return this.http.post(`${this.apiUrl}/cache/select`, {
            id,
        });
    }
}
