//Reducer
export default (state = [], action) => {
       switch (action.type) {
           case 'FETCH_POSTS':
               return action.payload;
           default:
               return state;

       }
   };
/*    if (action.type === 'FETCH_POST') {
        return action.payload;
    }

    return state;
};*/


//YES YOU CAN Mutate the state , but when?

//NEVER MUTATE array or object in reducers  ^^^^
// EX.   state[0] = 'Sam';  state.pop()  state.push()
// state.name = 'Sam'  state.age = 30;

//STRINGS and NUMBERS are Immutable, so if reducer return those we dont worry