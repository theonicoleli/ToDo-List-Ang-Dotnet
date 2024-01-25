import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DoListService {
  private apiUrl = 'http://localhost:5039/api/Do';

  constructor(private http: HttpClient) {}

  deleteDo(personId: number, doId: number): Observable<void> {
    const url = `${this.apiUrl}/${personId}/${doId}`;
    return this.http.delete<void>(url);
  }
}
