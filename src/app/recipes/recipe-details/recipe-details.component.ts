import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

// This is for the TypeScript
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {


  // Add INPUT, so we can update it from Outside
  // ## After Routing we dont need Input
   recipe: Recipe;

  //  Add the ID Property Here
  id: number;

  // Inject recipeServive to Transfer the recipe From Here to Shopping List
  // INJECT ActivatedRoute to PASS the DYNAMIC PARAMETER
  // Add Router to use thr Routing functionality -- For RELATIVE PATH
  // Add ActivatedRoute to tell the -- CURRENT PATH
  constructor( private recipeService: RecipeService,
               private route: ActivatedRoute,
               private router: Router ) { }

  // there are two ways to Bind the :ID
  ngOnInit() {
    // FIRST, if we Click Only Once
    // const id = this.route.snapshot.params['id'];
    
    // SECOND,the Perfect way to .subscribe it to Handle CHANGES
    this.route.params.subscribe( (params: Params) => {
      this.id = +params['id'];
      // Now Add id in the recipe.service component
      // Now Fetch the New recipe
      this.recipe = this.recipeService.getRecipe(this.id);
    })

  }

  // This Function will add the Recipe in the Shopping List
  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  // This function will edit the Recipe when clicked on edit button
  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  // This will call the deleteRecipe Method From recipe.services
  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    // This will Navigate away after Delete Button Pressed
    this.router.navigate(['/recipes']);
  }

}
