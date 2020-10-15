import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  getAllMenus() {
    return this.http.get("http://localhost:9091/item/getAllItems");
  }
}
