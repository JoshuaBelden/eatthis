import { Component, OnInit } from '@angular/core';
import { GroceryService } from '../services/grocery.service';
import { Grocery } from '../models/grocery';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { GroceryItem } from '../models/groceryItem';

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.css']
})
export class GroceryListComponent implements OnInit {

  groceries: Array<Grocery>;
  selectedGrocery: Grocery;

  constructor(private groceryService: GroceryService) { }

  async ngOnInit() {
    this.groceries = await this.groceryService.getForUserAsync();
  }

  onSelectGrocery(grocery: Grocery) {
    this.selectedGrocery = grocery;
  }

  async onDelete(groceryId: string) {
    await this.groceryService.deleteAsync(groceryId);
    this.selectedGrocery = null;
    this.groceries = await this.groceryService.getForUserAsync();
  }

  async onCreateGroceryItem(groceryId: string, line: string) {
    const groceryItem = await this.groceryService.createGroceryItemAsync(groceryId, line);
    this.selectedGrocery.items.push(groceryItem);
  }

  async onPickGroceryItem(groceryId: string, groceryItem: GroceryItem, picked: boolean) {
    groceryItem.picked = picked;
    await this.groceryService.updateGroceryItemAsync(groceryId, groceryItem);
  }

  async onDeleteGroceryItem(groceryId: string, groceryItemId: string) {
    await this.groceryService.deleteGroceryItemAsync(groceryId, groceryItemId);
    this.selectedGrocery.items = this.selectedGrocery.items.filter(groceryItem => groceryItem.id !== groceryItemId);
  }
}
