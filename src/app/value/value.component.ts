import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {

  values: any;
   private url = 'http://localhost:51446/Values';

  constructor(private http: HttpClient) { }
  

  ngOnInit() {
    this.getValues();
  }


  getValues() {
    this.http.get(this.url).subscribe(data => {
      this.values = data;
    }, error => {
      console.log(error)
    });
  }
}
