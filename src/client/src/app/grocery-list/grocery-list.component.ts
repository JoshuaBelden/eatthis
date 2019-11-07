import { Component, OnInit } from '@angular/core';
import { GroceryService } from '../services/grocery.service';
import { Grocery } from '../models/grocery';
import { GroceryItem } from '../models/groceryItem';
import * as _ from 'lodash';

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.css']
})
export class GroceryListComponent implements OnInit {

  groceries: Array<Grocery>;
  selectedGrocery: Grocery;
  departments: string[];
  groupedItems: _.Dictionary<GroceryItem[]>;
  showPickedItems = false;

  constructor(private groceryService: GroceryService) { }

  async ngOnInit() {
    this.groceries = await this.groceryService.getForUserAsync();
  }

  onSelectGrocery(grocery: Grocery) {
    this.selectedGrocery = grocery;
    this.groupedItems = _.groupBy(grocery.items, item => item.department);
    this.departments = _.keys(this.groupedItems);
  }

  async onDelete(groceryId: string) {
    await this.groceryService.deleteAsync(groceryId);
    this.selectedGrocery = null;
    this.groceries = await this.groceryService.getForUserAsync();
  }

  async onCreateGroceryItem(groceryId: string, line: string) {
    const grocery = await this.groceryService.createGroceryItemAsync(groceryId, line);
    this.onSelectGrocery(grocery);
  }

  async onPickGroceryItem(groceryId: string, groceryItem: GroceryItem, picked: boolean) {
    groceryItem.picked = picked;
    await this.groceryService.updateGroceryItemAsync(groceryId, groceryItem);
  }

  async onDeleteGroceryItem(groceryId: string, groceryItemId: string) {
    await this.groceryService.deleteGroceryItemAsync(groceryId, groceryItemId);
    this.selectedGrocery.items = this.selectedGrocery.items.filter(item => item.id !== groceryItemId);
    this.onSelectGrocery(this.selectedGrocery);
  }

  getGroceryItems(department: string) {
    return _.get(this.groupedItems, department);
  }

  toggleShowPicked() {
    this.showPickedItems = !this.showPickedItems;
  }
}
