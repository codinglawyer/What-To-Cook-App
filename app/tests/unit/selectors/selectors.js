import test from 'tape'
import {
  getIsDataFetching,
  getIsRecipeSaving,
  getIsRecipeDeleting,
  getAllRecipes,
  getRecipe,
  getCompleteRecipes,
  getAllIngredients
} from '../../../reducers/index'

// DataStatuses selectors
test('app/reducers/index: getIsDataFetching', t => {
  const actual = getIsDataFetching({
    dataStatuses: {
      dataFetching: { fetching: false, error: '' }
    }
  })
  const expected = { fetching: false, error: '' }

  t.deepEqual(actual, expected, 'should get data fetching from the state')

  t.end()
})

test('app/reducers/index: getIsDataFetching - undefined', t => {
  const actual = getIsDataFetching({})
  const expected = undefined

  t.deepEqual(
    actual,
    expected,
    'should return `undefined` if data fetching not found'
  )

  t.end()
})

test('app/reducers/index: getIsRecipeSaving', t => {
  const actual = getIsRecipeSaving({
    dataStatuses: {
      recipeSaving: { saving: false, error: '' }
    }
  })
  const expected = { saving: false, error: '' }

  t.deepEqual(actual, expected, 'should get recipe saving from the state')

  t.end()
})

test('app/reducers/index: getIsRecipeSaving - undefined', t => {
  const actual = getIsRecipeSaving({})
  const expected = undefined

  t.deepEqual(
    actual,
    expected,
    'should return `undefined` if recipe saving not found'
  )

  t.end()
})

test('app/reducers/index: getIsRecipeDeleting', t => {
  const actual = getIsRecipeDeleting({
    dataStatuses: {
      recipeDeleting: { fetching: false, error: '' }
    }
  })
  const expected = { fetching: false, error: '' }

  t.deepEqual(actual, expected, 'should get recipe deleting from the state')

  t.end()
})

test('app/reducers/index: getIsRecipeDeleting - undefined', t => {
  const actual = getIsRecipeDeleting({})
  const expected = undefined

  t.deepEqual(
    actual,
    expected,
    'should return `undefined` if recipe deleting not found'
  )

  t.end()
})

// Recipes selectors
test('app/reducers/index: getAllRecipes', t => {
  const actual = getAllRecipes({
    recipesEntity: {
      byId: { '123abc': { title: 'Fried Chicken' } },
      allIds: ['123abc']
    }
  })
  const expected = [{ title: 'Fried Chicken' }]

  t.deepEqual(actual, expected, 'should get all the recipes from the state')

  t.end()
})

test('app/reducers/index: getAllRecipes - empty', t => {
  const actual = getAllRecipes({
    recipesEntity: {
      byId: {},
      allIds: []
    }
  })
  const expected = []

  t.deepEqual(
    actual,
    expected,
    'should return an empty array if the are no recipes'
  )

  t.end()
})

test('app/reducers/index: getRecipe', t => {
  const actual = getRecipe(
    {
      recipesEntity: {
        byId: { '123abc': { title: 'Fried Chicken' } }
      }
    },
    '123abc'
  )
  const expected = { title: 'Fried Chicken' }

  t.deepEqual(actual, expected, 'should get a particular recipe from the state')

  t.end()
})

test('app/reducers/index: getRecipe - undefined', t => {
  const actual = getRecipe(
    {
      recipesEntity: {
        byId: {}
      }
    },
    ''
  )
  const expected = undefined

  t.deepEqual(
    actual,
    expected,
    'should return `undefined` if there is no recipe'
  )

  t.end()
})

test('app/reducers/index: getCompleteRecipes', t => {
  const actual = getCompleteRecipes(
    {
      recipesEntity: {
        byId: {
          '123abc': {
            title: 'Fried Chicken',
            ingredients: ['456def']
          }
        },
        allIds: ['123abc']
      },
      ingredientsEntity: {
        '456def': { name: 'chicken', amount: '1000' }
      }
    },
    getAllRecipes,
    getAllIngredients
  )
  const expected = [
    {
      title: 'Fried Chicken',
      ingredients: [{ '456def': { name: 'chicken', amount: '1000' } }]
    }
  ]

  t.deepEqual(actual, expected, 'should get all the recipes in the complete form from the state')

  t.end()
})

test('app/reducers/index: getCompleteRecipes - undefined', t => {
  const actual = getCompleteRecipes(
    {
      recipesEntity: {
        byId: {},
        allIds: []
      },
      ingredientsEntity: {}
    },
    getAllRecipes,
    getAllIngredients
  )

  const expected = []

  t.deepEqual(
    actual,
    expected,
    'should return empty array if the are no recipes'
  )

  t.end()
})

// Ingredients selectors
test('app/reducers/index: getAllIngredients', t => {
  const actual = getAllIngredients({
    ingredientsEntity: {
      '456def': { name: 'chicken', amount: '1000' }
    }
  })
  const expected = { '456def': { name: 'chicken', amount: '1000' } }

  t.deepEqual(actual, expected, 'should get all the ingredients from the state')

  t.end()
})

test('app/reducers/index: getAllIngredients - empty', t => {
  const actual = getAllIngredients({
    ingredientsEntity: {}
  })
  const expected = []

  t.deepEqual(
    actual,
    expected,
    'should return empty array if the are no ingredients'
  )

  t.end()
})
