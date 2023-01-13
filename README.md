## NgRx -- Redux
   # -- State Management in BIGGER Angular Applications.
   # REDUX -- State Management Pattern, also a Library to Help implement the Pattern in any Application.

## RxJS, Helps with State Management(PARTLY) by Using SUBJECTS, OBSERVABLES, EVENTEMITTER and OPERATORS to transform Data.
   
   ## Issues with RxJS Approach
     *1 -- State can be Updated Anywhere
     *2 -- State is (Possibly) Mutable
     *3 -- Handling Side Effects (e.g. Http Calls/Requests) is unclear

## NgRx -- Redux State Management Flow
    *Global Store / App Store / Central Store -- This Store Holds the Application State i.e it Contains all the Required Data which is needed by other Components and Services of Application.

    *Components and Services -- They RECIEVES their state from the Global Store.

    *DISPATCH - ACTIONS -- dispatch Actions to Change the State of Components and Services, dispatch is called always inside components and Services.

    *Actions are JS Objects with Identifiers (payload)

    * REDUCERS -- Actions are sent to Reducers, 
                 --reducers are FUNCTIONS Which gets the Current State From the Global Store and actions From the Components and Services as INPUT
                 --reducers REDUCES / COMBINES State, Updates the App State with the Help of Identifiers in an IMMUTABLE WAY.
                 --IMMUTABLE WAY, Copying the State and Changing that Copied State
                 --Ultimately Reducers returns a NEW State i.e Copy of the Old State changed According to the Actions
                 --NEW State, This New State is Forwarded to the Global Store as Reduces State (Immutably)    

## NgRx Advantages to Normal Redux
  #1 -- Integrated into Angular.
  #2 -- Uses RxJS and TypeScript
  #3 -- Can LISTEN to Side Effects (Http, perform something)


### STEPS TO IMPLEMENT NgRx IN PROJECT
   #1- Install the NgRx Package, -npm install --save @ngrx/store --it will give all the Core Features.

   #2- Creating Component Specific Reducers File in Specific Store Folder i.e shopping-list.reducer.ts

   #3- Creating Component Specific Actions File in Specific Store Folder i.e shopping-list.actions.ts

   #4- Import StoreModule in app.module.ts

   #5- Import Store in Component to DISPATCH actions

   ## Loop Over Observables
      *ngFor="let ingredient of (ingredients | async).ingredients; let i = index"
