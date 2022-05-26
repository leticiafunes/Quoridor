let {nextLine} = require("../controllers/common");

const matrix = [
   
    [
      'N', '|', 'S', ' ', ' ', ' ', 'S', ' ', 'N', ' ', 'S', ' ', ' ', ' ', 'S', ' ', 'N'
    ],
    [
      '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'
    ],
    [
      'S', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'S', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'N'
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
      'N', ' ', 'S', ' ', ' ', ' ', 'N', '|', 'N', '|', 'S', ' ', ' ', ' ', 'S', ' ', 'N'
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
      'S', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'S', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'N'
    ],
    [
      ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'
    ],
    [
      'N', ' ', 'S', ' ', ' ', ' ', 'S', ' ', 'N', ' ', 'S', ' ', ' ', ' ', 'S', ' ', 'N'
    ]
  ]

test ('nextLine for 16 8', () => {

    const parameters = {
        row: 16,
        col: 8 ,
        steps:  1,
        player: 'N',

    }
  const expected = 
    [ 
        17, 9, 15, 7
    ]
      
    const result = []
  
    let cell = {}
    cell = nextLine (parameters.row, parameters.col, 'forward', parameters.steps) 
    result.push (cell)
    cell = nextLine (parameters.row, parameters.col, 'right', parameters.steps) 
    result.push (cell)
    cell = nextLine (parameters.row, parameters.col, 'behind', parameters.steps) 
    result.push (cell)
    cell = nextLine (parameters.row, parameters.col, 'left', parameters.steps) 
    result.push (cell)

        
    expect(result).toMatchObject(expected);

     
  
  })

test ('nextLine for 16 8 2', () => {

    const parameters = {
        row: 16,
        col: 8 ,
        steps:  1,
        player: 'N',

    }
  const expected = 
    [ 
        17, 9, 15, 7
    ]
      
    const result = []
  
    let cell = {}
    cell = nextLine (parameters.row, parameters.col, 'forward', parameters.steps, parameters.player) 
    result.push (cell)
    cell = nextLine (parameters.row, parameters.col, 'right', parameters.steps, parameters.player) 
    result.push (cell)
    cell = nextLine (parameters.row, parameters.col, 'behind', parameters.steps, parameters.player) 
    result.push (cell)
    cell = nextLine (parameters.row, parameters.col, 'left', parameters.steps, parameters.player) 
    result.push (cell)

        
    expect(result).toMatchObject(expected);

     
  
  })
  