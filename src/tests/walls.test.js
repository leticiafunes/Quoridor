import {findWallPlace} from "../controllers/walls_controller.js";

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
    ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
  ],
  [
    ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
  ],
  [
    ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
  ],
  [
    'S', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'S', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'S'
  ],
  [
    ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
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

test ('Find next cell for a wall 0,0', () => {

  const paw = {
    id: 'N1',
    row : 0, 
    col: 0  
  } 

  const expected = [{
    row: 1,
    col: 0,
    orientation: 'h'
  }]
    
  const result = []

  let cell = {}
  cell = findWallPlace (matrix, paw, 'N') 
  result.push (cell)
  
  expect(result).toMatchObject(expected);
  

})
test ('Find next cell for a wall 0,4', () => {

    const paw = {
      id: 'N1',
      row : 0, 
      col: 4  
    } 
  
    const expected = [{
      row: 1,
      col: 4,
      orientation: 'h'
    }]
      
    const result = []
  
    let cell = {}
    cell = findWallPlace (matrix, paw, 'N') 
    result.push (cell)
    
    expect(result).toMatchObject(expected);
    
  
  })
  test ('Find next cell for a wall 8,8', () => {

    const paw = {
      id: 'N1',
      row : 8, 
      col: 8 
    } 
  
    const expected = [null]
      
    const result = []
  
    let cell = {}
    cell = findWallPlace (matrix, paw, 'N') 
    result.push (cell)
    
    expect(result).toMatchObject(expected);
    
  
  })

  test ('Find next cell for a wall 16,12', () => {

    const paw = {
      id: 'S1',
      row : 16, 
      col: 12 
    } 
  
    const expected = [{
        row: 15,
        col: 12,
        orientation: 'h'
      }]
      
    const result = []
  
    let cell = {}
    cell = findWallPlace (matrix, paw, 'S') 
    result.push (cell)
    
    expect(result).toMatchObject(expected);
    
  
  })

  test ('Find next cell for a wall 12,16', () => {

    const paw = {
      id: 'S1',
      row : 12, 
      col: 16 
    } 
  
    const expected = [{
        row: 11,
        col: 14,
        orientation: 'h'
      }]
      
    const result = []
  
    let cell = {}
    cell = findWallPlace (matrix, paw, 'S') 
    result.push (cell)
    
    expect(result).toMatchObject(expected);
    
  
  })

  test ('Find next cell for a wall 16,0', () => {

    const paw = {
      id: 'S1',
      row : 16, 
      col: 0 
    } 
  
    const expected = [null]
      
    const result = []
  
    let cell = {}
    cell = findWallPlace (matrix, paw, 'N') 
    result.push (cell)
    
    expect(result).toMatchObject(expected);
    
  
  })

  test ('Find next cell for a wall 16,8', () => {

    const paw = {
      id: 'N1',
      row : 16, 
      col: 8 
    } 
  
    const expected = [null]
      
    const result = []
  
    let cell = {}
    cell = findWallPlace (matrix, paw, 'N') 
    result.push (cell)
    
    expect(result).toMatchObject(expected);
    
  
  })



  const matrix2 = [
    [
      ' ', 'N', ' ', ' ', ' ', ' ', ' ', ' ', 'N', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'N'
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
     ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
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
     ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
    ],
    [
     ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
    ],
    [
      ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
    ],
    [
      ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
    ],
    [
     ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
    ],
    [
      ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
    ],
    
    [
      ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
    ],
    [
      ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
    ],
    [
      'S', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'S', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'S'
    ]
  ]

  test ('Find next cell for initial', () => {

    const paw = {
      id: 'N1',
      row : 0, 
      col: 0 
    } 
  
    const expected = [{
        row: 1,
        col: 0,
        orientation: 'h'
  }]
      
    const result = []
  
    let cell = {}
    cell = findWallPlace (matrix2, paw, 'N') 
    result.push (cell)
    
    expect(result).toMatchObject(expected);
    
  
  })