import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {

  @Input() name: String;
  @Input() weight: Number;
  @Input() imageName = 1;
  

  private imagePath;

  constructor() { }

  ngOnInit() {
    this.imagePath = "../assets/images/products/" + this.imageName + ".png";
    console.log(this);
  }

}
