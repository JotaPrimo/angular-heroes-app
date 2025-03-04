import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.css']
})
export class HeroCardComponent implements OnInit {

  @Input()
  public hero!: Hero;

  constructor() { }

  ngOnInit() {
    if( !this.hero ) throw new Error("Hero property is required");
  }

  

}
