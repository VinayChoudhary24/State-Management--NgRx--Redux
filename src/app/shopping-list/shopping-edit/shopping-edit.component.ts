import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';
import * as ShoppingListActions from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // To Access the FORM for All the Functionality
  @ViewChild('f', {static: false}) slForm: NgForm;

  // Use @ViewChild to REFERENCE the Inputs
  // After Form we Don't Need these
  // @ViewChild('nameInput', { static: false })  nameInputRef: ElementRef;
  // @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;

  // Store the Edit Shopping list Function in a Variable to DESTROY
  subscription: Subscription;
  // To make sure we are editing
  editMode = false;
  // Store the Index Value
  editedItemindex: number;
  editedItem: Ingredient;

  // Add the shopping-list.service here to USE it
  constructor( private slService: ShoppingListService, private store: Store<{ shoppingList: { ingredients: Ingredient[] }}> ) { }

  ngOnInit() {
    // Listen to the Edit shopping List Function Here
    this.subscription = this.slService.startedEditing.subscribe( (index: number) => {
      this.editedItemindex = index;
      this.editMode = true;
      this.editedItem = this.slService.getIngredient(index);
      // Set the Values of the FORM
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount,
      })
    });
  }

  // ADD Functionality
  onSubmit(form: NgForm) {
    // After Forms we don't need this
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;

    // Template Form
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode) {
      this.slService.updateIngredient(this.editedItemindex, newIngredient)
    } else {
      // this.slService.addIngredient(newIngredient);
      // Dispatch the Actions
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    // Set the Edit Mode False Back Again so that Update andAdd items Simultaneously
    this.editMode = false;
    form.reset();
  }
  
  // // DELETE Functionality
  onDelete() {
    this.slService.deleteIngredient(this.editedItemindex);
    this.onClear();
  }

  
  // // CLEAR Functionality
  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  // This Will Destroy the Subscription
  ngOnDestroy() {
    this.subscription.unsubscribe();
  } 


}
