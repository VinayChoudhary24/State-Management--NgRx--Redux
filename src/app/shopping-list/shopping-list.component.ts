import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  // add Ingrediants
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  // Store the Subject Observable to Clean it Up i.e DESTROY
  private subscription: Subscription;

  constructor( private slService: ShoppingListService, private store: Store<{ shoppingList: { ingredients: Ingredient[] }}> ) { }

  ngOnInit() {
    // NgRx
    // Use .select method to get the Slice of the State
    this.ingredients = this.store.select('shoppingList');

    // this.ingredients = this.slService.getIngredients();
    // Store the Subscription in the Variable/Property
    // this.subscription = this.slService.ingredientChanged
    // // ADD a LISTENER to Display the ADDED Ingredients
    // .subscribe( (ingredients: Ingredient[]) => {
    //   this.ingredients = ingredients;
    // })
  }

  // To edit the Items in the Shopping List
  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }

  // Destroyin the Subject Event
  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }

}
