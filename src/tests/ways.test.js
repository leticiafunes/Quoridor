import {find_cell} from "../controllers/ways_controller.js";

const matrix = [
  [
    'N', ' ', ' ', '|', 'N', '|', 'S', ' ', 'N', ' ', ' ', '|', ' ', ' ', ' ', ' ', 'N'
  ],
  [
    ' ', ' ', ' ', '*', ' ', '*', ' ', ' ', ' ', ' ', ' ', '*', '-', '*', '-', ' ', ' '
  ],
  [
    ' ', ' ', ' ', '|', 'S', '|', ' ', ' ', ' ', ' ', ' ', '|', 'N', '|', ' ', ' ', ' '
  ],
  [
    ' ', ' ', '-', '*', '-', ' ', ' ', ' ', ' ', ' ', '-', '*', '-', '*', ' ', ' ', ' '
  ],
  [
    ' ', ' ', ' ', '|', 'N', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|', ' ', ' ', ' '
  ],
  [
    ' ', ' ', ' ', '*', '-', '*', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
  ],
  [
    ' ', ' ', ' ', '|', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
  ],
  [
    ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
  ],
  [
    'N', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'N', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'N'
  ],
  [
    ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
  ],
  [
    ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
  ],
  [
    ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
  ],
  [
    'S', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'S', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'S'
  ],
  [
    ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
  ],
  
  [
    ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
  ],
  [
    ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
  ],
  [
    'N', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'N', ' ', ' ', ' ', 'S', ' ', ' ', ' ', 'N'
  ]
]

test ('Find next cells for center 4 4', () => {

  const paw = {
    id: 'N1',
    row : 8, 
    col: 8  
  } 

  const expected = [{
    id : 'N1',
    row : 10, 
    col: 8 
  }, 
  {
    id : 'N1',
    row : 8, 
    col: 10 
  },
  {
    id : 'N1',
    row : 6, 
    col : 8 
  },
  {
    id : 'N1',
    row : 8, 
    col: 6 
  }]
    
  const result = []

  let cell = {}
  cell = find_cell (paw ,'N', matrix, 'forward') 
  result.push (cell)
  cell = find_cell (paw ,'N', matrix, 'right') 
  result.push (cell)
  cell = find_cell (paw ,'N', matrix, 'behind') 
  result.push (cell)
  cell = find_cell (paw ,'N', matrix, 'left') 
  result.push (cell)
  expect(result).toMatchObject(expected);
  

})

test ('Find next cells for corner 0 0', () => {

  const paw = {
    id: 'N1',
    row : 0, 
    col: 0  
  } 

  const expected = [{
    id : 'N1',
    row : 2, 
    col: 0 
  }, {
    id : 'N1',
    row : 0, 
    col: 2 
  },
  null,
  null]
    
  const result = []

  let cell = {}
  cell = find_cell (paw ,'N', matrix, 'forward') 
  result.push (cell)
  cell = find_cell (paw ,'N', matrix, 'right') 
  result.push (cell)
  cell = find_cell (paw ,'N', matrix, 'behind') 
  result.push (cell)
  cell = find_cell (paw ,'N', matrix, 'left') 
  result.push (cell)
  expect(result).toMatchObject(expected);
  

})

test ('Find next cells for corner 0 8', () => {

  const paw = {
    id: 'N1',
    row : 0, 
    col: 16  
  } 

  const expected = 
  [{ 
    id : 'N1',
    row : 2, 
    col: 16 
  }, 
  null , 
  null, 
  {
    id : 'N1',
    row : 0, 
    col: 14 
  }]
    
  const result = []

  let cell = {}
  cell = find_cell (paw ,'N', matrix, 'forward') 
  result.push (cell)
  cell = find_cell (paw ,'N', matrix, 'right') 
  result.push (cell)
  cell = find_cell (paw ,'N', matrix, 'behind') 
  result.push (cell)
  cell = find_cell (paw ,'N', matrix, 'left') 
  result.push (cell)

  
  expect(result).toMatchObject(expected);
  

})

test ('Find next cells for corner 8 0', () => {

  const paw = {
    id: 'N1',
    row : 16, 
    col: 0  
  } 

  const expected = 
  [null, 
   { 
    id : 'N1',
    row : 16, 
    col: 2 
  }, 
  {
    id : 'N1',
    row : 14, 
    col: 0 
  },
null]
    
  const result = []

  let cell = {}
  cell = find_cell (paw ,'N', matrix, 'forward') 
  result.push (cell)
  cell = find_cell (paw ,'N', matrix, 'right') 
  result.push (cell)
  cell = find_cell (paw ,'N', matrix, 'behind') 
  result.push (cell)
  cell = find_cell (paw ,'N', matrix, 'left') 
  result.push (cell)

  
  expect(result).toMatchObject(expected);
  

})

test ('Find next cells for corner 8 8', () => {

  const paw = {
    id: 'N1',
    row : 16, 
    col: 16  
  } 

  const expected = 
  [null, null, 
   { 
    id : 'N1',
    row : 14, 
    col: 16 
  }, 
  {
    id : 'N1',
    row : 16, 
    col: 14 
  }]
    
  const result = []

  let cell = {}
  cell = find_cell (paw ,'N', matrix, 'forward') 
  result.push (cell)
  cell = find_cell (paw ,'N', matrix, 'right') 
  result.push (cell)
  cell = find_cell (paw ,'N', matrix, 'behind') 
  result.push (cell)
  cell = find_cell (paw ,'N', matrix, 'left') 
  result.push (cell)

  
  expect(result).toMatchObject(expected);
  

})


test ('Find next cells for top middle', () => {

  const paw = {
    id: 'N1',
    row : 0, 
    col: 8  
  } 

  const expected = 
  [ { 
    id : 'N1',
    row : 2, 
    col: 8 
  }, 
  { 
    id : 'N1',
    row : 0, 
    col: 10 
  }, 
  null, null]
    
  const result = []

  let cell = {}
  cell = find_cell (paw ,'N', matrix, 'forward') 
  result.push (cell)
  cell = find_cell (paw ,'N', matrix, 'right') 
  result.push (cell)
  cell = find_cell (paw ,'N', matrix, 'behind') 
  result.push (cell)
  cell = find_cell (paw ,'N', matrix, 'left') 
  result.push (cell)

  
  expect(result).toMatchObject(expected);
  

})

test ('Find next cells for right middle', () => {

  const paw = {
    id: 'N1',
    row : 8, 
    col: 16  
  } 

  const expected = 
  [ { 
    id : 'N1',
    row : 10, 
    col: 16 
  }, null, 
  { 
    id : 'N1',
    row : 6, 
    col: 16 
  },  
   { 
    id : 'N1',
    row : 8, 
    col: 14 
  }]
    
  const result = []

  let cell = {}
  cell = find_cell (paw ,'N', matrix, 'forward') 
  result.push (cell)
  cell = find_cell (paw ,'N', matrix, 'right') 
  result.push (cell)
  cell = find_cell (paw ,'N', matrix, 'behind') 
  result.push (cell)
  cell = find_cell (paw ,'N', matrix, 'left') 
  result.push (cell)

  
  expect(result).toMatchObject(expected);
  

})

test ('Find next cells for bottom middle', () => {

  const paw = {
    id: 'N1',
    row : 16, 
    col: 8  
  } 

  const expected = 
  [ null, 
    { 
    id : 'N1',
    row : 16, 
    col: 10 
  },
  { 
    id : 'N1',
    row : 14, 
    col: 8 
  },  
   { 
    id : 'N1',
    row : 16, 
    col: 6 
  }]
    
  const result = []

  let cell = {}
  cell = find_cell (paw ,'N', matrix, 'forward') 
  result.push (cell)
  cell = find_cell (paw ,'N', matrix, 'right') 
  result.push (cell)
  cell = find_cell (paw ,'N', matrix, 'behind') 
  result.push (cell)
  cell = find_cell (paw ,'N', matrix, 'left') 
  result.push (cell)

  
  expect(result).toMatchObject(expected);
  

})

test ('Find next cells for left middle', () => {

  const paw = {
    id: 'N1',
    row : 8, 
    col: 0  
  } 

  const expected = 
  [ 
    { 
    id : 'N1',
    row : 10, 
    col: 0 
  },
  { 
    id : 'N1',
    row : 8, 
    col: 2
  },  
   { 
    id : 'N1',
    row : 6, 
    col: 0 
  },  null]
    
  const result = []

  let cell = {}
  cell = find_cell (paw ,'N', matrix, 'forward') 
  result.push (cell)
  cell = find_cell (paw ,'N', matrix, 'right') 
  result.push (cell)
  cell = find_cell (paw ,'N', matrix, 'behind') 
  result.push (cell)
  cell = find_cell (paw ,'N', matrix, 'left') 
  result.push (cell)

  
  expect(result).toMatchObject(expected);
  

})

test ('Find next cells with lateral walls top', () => {

  const paw = {
    id: 'N1',
    row : 0, 
    col: 6  
  } 

  const expected = 
  [ 
  { 
    id : 'N1',
    row : 2, 
    col: 6
  },  null, null, null]
    
  const result = []

  let cell = {}
  cell = find_cell (paw ,'N', matrix, 'forward') 
  result.push (cell)
  cell = find_cell (paw ,'N', matrix, 'right') 
  result.push (cell)
  cell = find_cell (paw ,'N', matrix, 'behind') 
  result.push (cell)
  cell = find_cell (paw ,'N', matrix, 'left') 
  result.push (cell)

  
  expect(result).toMatchObject(expected);
  

})

test ('Find next cells with walls ', () => {

  const paw = {
    id: 'N1',
    row : 4, 
    col: 4  
  } 

  const expected = 
  [ null, 
  { 
    id : 'N1',
    row : 4, 
    col:  6
  },null, null]
    
  const result = []

  let cell = {}
  cell = find_cell (paw ,'N', matrix, 'forward') 
  result.push (cell)
  cell = find_cell (paw ,'N', matrix, 'right') 
  result.push (cell)
  cell = find_cell (paw ,'N', matrix, 'behind') 
  result.push (cell)
  cell = find_cell (paw ,'N', matrix, 'left') 
  result.push (cell)

  
  expect(result).toMatchObject(expected);
  

})

test ('Find next cells impossible ', () => {

  const paw = {
    id: 'N1',
    row : 2, 
    col: 12  
  } 

  const expected = 
  [ null, null, null, null]
    
  const result = []

  let cell = {}
  cell = find_cell (paw ,'N', matrix, 'forward') 
  result.push (cell)
  cell = find_cell (paw ,'N', matrix, 'right') 
  result.push (cell)
  cell = find_cell (paw ,'N', matrix, 'behind') 
  result.push (cell)
  cell = find_cell (paw ,'N', matrix, 'left') 
  result.push (cell)

  
  expect(result).toMatchObject(expected);
  

})

test ('Find next cells for S2 12 0 ', () => {

  const paw = {
    id: 'S1',
    row : 12, 
    col: 0  
  } 

  const expected = 
  [ { 
    id : 'S1',
    row : 10, 
    col:  0
  },
  { 
    id : 'S1',
    row : 12, 
    col:  2
  }, 
  { 
    id : 'S1',
    row : 14, 
    col:  0
  }, null]
    
  const result = []

  let cell = {}
  cell = find_cell (paw ,'S', matrix, 'forward') 
  result.push (cell)
  cell = find_cell (paw ,'S', matrix, 'right') 
  result.push (cell)
  cell = find_cell (paw ,'S', matrix, 'behind') 
  result.push (cell)
  cell = find_cell (paw ,'S', matrix, 'left') 
  result.push (cell)

  
  expect(result).toMatchObject(expected);
  

})

test ('Find next cells for S1 12 16 ', () => {

  const paw = {
    id: 'S1',
    row : 12, 
    col: 16  
  } 

  const expected = 
  [ { 
    id : 'S1',
    row : 10, 
    col:  16
  }, null, 
  { 
    id : 'S1',
    row : 14, 
    col:  16
  }, { 
    id : 'S1',
    row : 12, 
    col:  14
  }]
    
  const result = []

  let cell = {}
  cell = find_cell (paw ,'S', matrix, 'forward') 
  result.push (cell)
  cell = find_cell (paw ,'S', matrix, 'right') 
  result.push (cell)
  cell = find_cell (paw ,'S', matrix, 'behind') 
  result.push (cell)
  cell = find_cell (paw ,'S', matrix, 'left') 
  result.push (cell)

  
  expect(result).toMatchObject(expected);
  

})


test ('Find next cells for S1 16 12 ', () => {

  const paw = {
    id: 'S3',
    row : 16, 
    col: 12  
  } 

  const expected = 
  [ { 
    id : 'S3',
    row : 14, 
    col:  12
  }, 
  { 
    id : 'S3',
    row : 16, 
    col:  14
  }, 
  null, 
  { 
    id : 'S3',
    row : 16, 
    col:  10
  }]
    
  const result = []

  let cell = {}
  cell = find_cell (paw ,'S', matrix, 'forward') 
  result.push (cell)
  cell = find_cell (paw ,'S', matrix, 'right') 
  result.push (cell)
  cell = find_cell (paw ,'S', matrix, 'behind') 
  result.push (cell)
  cell = find_cell (paw ,'S', matrix, 'left') 
  result.push (cell)

  
  expect(result).toMatchObject(expected);
  

})

test ('Find next cells for S4 0 6 ', () => {

  const paw = {
    id: 'S4',
    row : 0, 
    col: 6  
  } 

  const expected = 
  [ null, 
    null, 
  { 
    id : 'S4',
    row : 2, 
    col:  6
  }, 
  null
  ]
    
  const result = []

  let cell = {}
  cell = find_cell (paw ,'S', matrix, 'forward') 
  result.push (cell)
  cell = find_cell (paw ,'S', matrix, 'right') 
  result.push (cell)
  cell = find_cell (paw ,'S', matrix, 'behind') 
  result.push (cell)
  cell = find_cell (paw ,'S', matrix, 'left') 
  result.push (cell)

  
  expect(result).toMatchObject(expected);
  

})

test ('Find next cells impossible for S5 2 4 ', () => {

  const paw = {
    id: 'S5',
    row : 2, 
    col: 4  
  } 

  const expected = 
  [ null, null, null, null  ]
    
  const result = []

  let cell = {}
  cell = find_cell (paw ,'S', matrix, 'forward') 
  result.push (cell)
  cell = find_cell (paw ,'S', matrix, 'right') 
  result.push (cell)
  cell = find_cell (paw ,'S', matrix, 'behind') 
  result.push (cell)
  cell = find_cell (paw ,'S', matrix, 'left') 
  result.push (cell)

  
  expect(result).toMatchObject(expected);
  

})

test ('Find next cells impossible for S6 2 4 ', () => {

  const paw = {
    id: 'S6',
    row : 12, 
    col: 8  
  } 

  const expected = 
  [ { 
    id : 'S6',
    row : 10, 
    col:  8
  },
  { 
    id : 'S6',
    row : 12, 
    col:  10
  },
  { 
    id : 'S6',
    row : 14, 
    col:  8
  },
  { 
    id : 'S6',
    row : 12, 
    col:  6
  }
  ]
    
  const result = []

  let cell = {}
  cell = find_cell (paw ,'S', matrix, 'forward') 
  result.push (cell)
  cell = find_cell (paw ,'S', matrix, 'right') 
  result.push (cell)
  cell = find_cell (paw ,'S', matrix, 'behind') 
  result.push (cell)
  cell = find_cell (paw ,'S', matrix, 'left') 
  result.push (cell)

  
  expect(result).toMatchObject(expected);
  

})






