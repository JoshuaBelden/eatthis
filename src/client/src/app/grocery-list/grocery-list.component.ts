import { Component, OnInit } from '@angular/core';
import { GroceryService } from '../services/grocery.service';

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.css']
})
export class GroceryListComponent implements OnInit {

  groceries: Array<any>;

  constructor(private groceryService: GroceryService) { }

  async ngOnInit() {
    this.groceries = await this.groceryService.getForUserAsync();
  }
}
