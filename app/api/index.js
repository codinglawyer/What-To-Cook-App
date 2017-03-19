import { v4 } from 'node-uuid';

// This is a fake in-memory implementation of something
// that would be implemented by calling a REST server.

let fakeDatabase = [
    {
        id: v4(),
        servings: 4,
        title: 'Pasta with Tomatoes, Anchovy & Chillies',
        directions: [
            'Cook the pasta in boiling salted water until al dente, according to packet instructions.',
            'Meanwhile, heat a wide high-sided frying pan or sauté pan over a medium heat and add a glug of olive oil. Fry the garlic, chilli and anchovies for 1–2 minutes until the garlic is aromatic and the anchovy is beginning to melt into the oil.',
            'Add the olives, capers and tomatoes to the pan and stir over a medium heat for 4–5 minutes until the tomatoes have collapsed and everything is well combined.',
            'Drain the pasta and toss in the pan with the sauce. Taste and adjust the seasoning as necessary.',
            'Serve drizzled with a little olive oil and garnished with basil leaves.',
        ],
        ingredients: [
            {
                id: v4(),
                name: 'dried spaghetti or linguine',
                amount: '400g',
            },
            {
                id: v4(),
                name: 'Olive oil, for frying and drizzling ',
                amount: '',
            },
            {
                id: v4(),
                name: '1 dried red chilli, crumbled or chopped into small pieces ',
                amount: 1,
            },
        ],
    },
    {
        id: v4(),
        servings: 4,
        title: 'Roasted Mackerel with Garlic & Paprika',
        directions: [
            'Cook the pasta in boiling salted water until al dente, according to packet instructions.',
            'Meanwhile, heat a wide high-sided frying pan or sauté pan over a medium heat and add a glug of olive oil. Fry the garlic, chilli and anchovies for 1–2 minutes until the garlic is aromatic and the anchovy is beginning to melt into the oil.',
            'Add the olives, capers and tomatoes to the pan and stir over a medium heat for 4–5 minutes until the tomatoes have collapsed and everything is well combined.',
            'Drain the pasta and toss in the pan with the sauce. Taste and adjust the seasoning as necessary.',
            'Serve drizzled with a little olive oil and garnished with basil leaves.',
        ],
        ingredients: [
            {
                id: v4(),
                name: 'garlic cloves, peeled ',
                amount: 2,
            },
            {
                id: v4(),
                name: 'paprika',
                amount: '2 tsp',
            },
            {
                id: v4(),
                name: 'Olive oil, for frying and drizzling ',
                amount: '',
            },
            {
                id: v4(),
                name: 'dried red chilli, crumbled or chopped into small pieces ',
                amount: 1,
            },
        ],
    },
    {
        id: v4(),
        servings: 4,
        title: 'Chilli Beef Lettuce Wraps',
        directions: [
            'Heat a large frying pan and add a little oil. Mix the minced beef and pork together. Season with salt and pepper and mix well to ensure the seasoning is evenly distributed. Fry the mince in the hot pan for 5–7 minutes until crisp and brown and broken down to a fine consistency (take it further than you’ve ever dared before). Drain the crisped mince in a sieve – this will help it stay crispy. Set aside.',
            'Wipe out the pan and add a tablespoon of toasted sesame oil. Add the garlic, ginger and chilli. Fry with a pinch of salt and the sugar for 2 minutes. Add the drained mince and stir to mix.',
            'Add the fish sauce and heat through. Stir in the lime zest and juice, then add the spring onions, stirring for 30 seconds. Turn off the heat.',
            'Mix all the dressing ingredients together and adjust to taste.',
            'To serve, spoon some of the mince mixture into the lettuce leaves, drizzle with a little dressing and serve.',
        ],
        ingredients: [
            {
                id: v4(),
                name: 'oil',
                amount: 'for frying',
            },
            {
                id: v4(),
                name: 'lean minced beef',
                amount: '200g',
            },
            {
                id: v4(),
                name: 'minced pork',
                amount: '200g',
            },
            {
                id: v4(),
                name: 'toasted sesame oil ',
                amount: 'for frying',
            },
            {
                id: v4(),
                name: 'garlic cloves, peeled and finely chopped',
                amount: '2',
            },
            {
                id: v4(),
                name: 'piece of fresh root ginger, peeled and finely chopped',
                amount: '5 cm',
            },
            {
                id: v4(),
                name: 'red chillies, deseeded and chopped',
                amount: '1-2',
            },
            {
                id: v4(),
                name: 'light brown sugar',
                amount: '1 tbsp',
            },
            {
                id: v4(),
                name: 'fish sauce',
                amount: '1 tbsp',
            },
            {
                id: v4(),
                name: 'zest of lime, juice of',
                amount: '1',
            },
            {
                id: v4(),
                name: 'spring onions, trimmed and chopped',
                amount: '3',
            },
            {
                id: v4(),
                name: 'sea salt and black pepper',
                amount: '',
            },
            {
                id: v4(),
                name: 'little gem lettuces, separated into leaves, to serve',
                amount: '2',
            },
        ],
    },
];


const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchRecipes = () =>
    delay(500).then(() => {
        // if(Math.random() > 0.5) {
        //     throw new Error('Boom')
        // }
        return fakeDatabase;
    });

export const addRecipe = (recipe) =>
    delay(500).then(() => {
        const ingredientsWithIds = recipe.ingredients.map(ingredient => ({ ...ingredient, id: v4() }));
        const recipeWithId = { ...recipe, id: v4(), ingredients: ingredientsWithIds };
        fakeDatabase.push(recipeWithId);
        return recipeWithId;
    });

export const deleteRecipe = (recipeId) =>
    delay(500).then(() => {
        fakeDatabase = fakeDatabase.filter(recipe => recipe.id !== recipeId);
        return fakeDatabase;
    });
