import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model'

@Injectable()

export class RecipeService { 
    recipesChanged = new Subject<Recipe[]>; 

    // private recipes: Recipe[] = [
    //     new Recipe('A Test Recipe', 
    //     'This is simply a test', 
    //     'https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Puttanesca-fd5810c.jpg?resize=960,872?quality=90&webp=true&resize=300,272',
    //     [
    //         new Ingredient('Meat',1),
    //         new Ingredient('Onion',5)
    //     ]),
    //     new Recipe('Another Test Recipe', 
    //     'This is simply a test', 
    //     'https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Puttanesca-fd5810c.jpg?resize=960,872?quality=90&webp=true&resize=300,272',
    //     [
    //         new Ingredient('Buns',1),
    //         new Ingredient('Onion',5)
    //     ]) 
    //   ]; 
    
    private recipes: Recipe[] = []; 
      
    constructor(private slService: ShoppingListService) { }
      
    getRecipes() { 
        return this.recipes.slice();
    }
    
    getRecipe(index:number) { 
        return this.recipes[index];
    }
    
    addIngredientsToShoppingList(ingredients:Ingredient[]) { 
        this.slService.addIngredients(ingredients)
    }
    
    addRecipe(recipe:Recipe){ 
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }
    
    updateRecipe(index: number, newRecipe: Recipe) { 
        this.recipes[index] = newRecipe; 
        this.recipesChanged.next(this.recipes.slice());
    }
    
    deleteRecipe(index: number) {
        this.recipes.splice(index, 1); 
        this.recipesChanged.next(this.recipes.slice());
    }
    
    setRecipes(recipes: Recipe[]) { 
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }
}