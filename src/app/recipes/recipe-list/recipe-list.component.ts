import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
// For Recipe Array
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  // This Array Contains all the Recipes i.e Recipe MODEL
  recipes: Recipe[];

  // property to store Subscription
  subscription: Subscription;

  // Add the recipe.service here to USE it
  // Add Router to use thr Routing functionality -- For RELATIVE PATH
  // Add ActivatedRoute to tell the -- CURRENT PATH
  constructor( private recipeService: RecipeService,
               private router: Router,
               private route: ActivatedRoute ) { }

  ngOnInit() {
    // to Add/Update a New Recipe to the List of Recipes
    this.subscription = this.recipeService.recipesChanged.subscribe( (recipes: Recipe[]) => {
      this.recipes = recipes;
    })
    // With This we Will get the Copy of the ARRAY
    this.recipes = this.recipeService.getRecipes();
  }

  // This function adds new Recipe
  onNewRecipe() {
    // this is relative path
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  // Destroy the Subscription
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}