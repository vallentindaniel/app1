import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  
  public prd_id: any;
  constructor(private _Activatedroute:ActivatedRoute) { 
    this.prd_id = _Activatedroute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
  }

}
