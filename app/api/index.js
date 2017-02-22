import { v4 } from 'node-uuid';

// This is a fake in-memory implementation of something
// that would be implemented by calling a REST server.

const fakeDatabase = {
  recipes: [{
    id: v4(),
    servings: 4,
    title: 'Pasta with Tomatoes, Anchovy & Chillies',
    directions:
        [
            '1) Cook the pasta in boiling salted water until al dente, according to packet instructions.',
            '2) Meanwhile, heat a wide high-sided frying pan or sauté pan over a medium heat and add a glug of olive oil. Fry the garlic, chilli and anchovies for 1–2 minutes until the garlic is aromatic and the anchovy is beginning to melt into the oil.',
            '3) Add the olives, capers and tomatoes to the pan and stir over a medium heat for 4–5 minutes until the tomatoes have collapsed and everything is well combined.',
            '4) Drain the pasta and toss in the pan with the sauce. Taste and adjust the seasoning as necessary.',
            '5) Serve drizzled with a little olive oil and garnished with basil leaves.'
        ],
    ingredients: [
        {
            id: v4(),
            ingredient: '400g dried spaghetti or linguine'
        },
        {
            id: v4(),
            ingredient: 'Olive oil, for frying and drizzling '
        },
        {
            id: v4(),
            ingredient: 'Olive oil, for frying and drizzling '
        },
        {
            id: v4(),
            ingredient: '1 dried red chilli, crumbled or chopped into small pieces '
        },
    ],
  }, {
      id: v4(),
      servings: 4,
      title: 'Roasted Mackerel with Garlic & Paprika',
      directions:
          [
              '1) Cook the pasta in boiling salted water until al dente, according to packet instructions.',
              '2) Meanwhile, heat a wide high-sided frying pan or sauté pan over a medium heat and add a glug of olive oil. Fry the garlic, chilli and anchovies for 1–2 minutes until the garlic is aromatic and the anchovy is beginning to melt into the oil.',
              '3) Add the olives, capers and tomatoes to the pan and stir over a medium heat for 4–5 minutes until the tomatoes have collapsed and everything is well combined.',
              '4) Drain the pasta and toss in the pan with the sauce. Taste and adjust the seasoning as necessary.',
              '5) Serve drizzled with a little olive oil and garnished with basil leaves.'
          ],
      ingredients: [
          {
              id: v4(),
              ingredient: '2 garlic cloves, peeled '
          },
          {
              id: v4(),
              ingredient: '2 tsp paprika'
          },
          {
              id: v4(),
              ingredient: 'Olive oil, for frying and drizzling '
          },
          {
              id: v4(),
              ingredient: '1 dried red chilli, crumbled or chopped into small pieces '
          },
      ],
  }, {
    id: v4(),
    servings: 4,
    title: 'Chilli Beef Lettuce Wraps',
    directions: [],
    ingredients: [],
  }],
};

const delay = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms));

//fetchTodos returns a promise
export const fetchRecipes = () =>
  delay(500).then(() => {
        return fakeDatabase.recipes;
  });

// export const addTodo = (text) =>
//   delay(500).then(() => {
//     const todo = {
//       id: v4(),
//       text,
//       completed: false,
//     };
//     fakeDatabase.todos.push(todo);
//     return todo;
//   });
//
// export const toggleTodo = (id) =>
//   delay(500).then(() => {
//     const todo = fakeDatabase.todos.find(t => t.id === id);
//     todo.completed = !todo.completed;
//     return todo;
//   });
