import {find_cell_jump} from "../controllers/ways_controller.js";

const matrix = [
   
    [
      'N', ' ', 'S', ' ', ' ', ' ', 'S', ' ', 'N', ' ', 'S', ' ', ' ', ' ', 'S', ' ', 'N'
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
      'S', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'S', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'S'
    ],
    [
      ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
    ],
    [
      'N', ' ', 'S', ' ', ' ', ' ', 'S', ' ', 'N', ' ', 'S', ' ', ' ', ' ', 'S', ' ', 'N'
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
      'S', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'S', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'S'
    ],
    [
      ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
    ],
    [
      'N', ' ', 'S', ' ', ' ', ' ', 'S', ' ', 'N', ' ', 'S', ' ', ' ', ' ', 'S', ' ', 'N'
    ]
  ]


  test ('Find next jump cells center 4 4', () => {

    const paw = {
      id: 'N1',
      row : 8, 
      col: 8  
    } 
  
    const expected = [{
      id : 'N1',
      row : 12, 
      col: 8
    }, 
    {
      id : 'N1',
      row : 8, 
      col: 12 
    },
    {
      id : 'N1',
      row : 4, 
      col : 8 
    },
    {
      id : 'N1',
      row : 8, 
      col: 4
    }]
      
    const result = []
  
    let cell = {}
    cell = find_cell_jump (paw ,'N', matrix, 'forward') 
    result.push (cell)
    cell = find_cell_jump (paw ,'N', matrix, 'right') 
    result.push (cell)
    cell = find_cell_jump (paw ,'N', matrix, 'behind') 
    result.push (cell)
    cell = find_cell_jump (paw ,'N', matrix, 'left') 
    result.push (cell)
    expect(result).toMatchObject(expected);
    
  
  })

  test ('Find next jump cells corner 0 0', () => {

    const paw = {
      id: 'N1',
      row : 0, 
      col: 0  
    } 
  
    const expected = [{
      id : 'N1',
      row : 4, 
      col: 0
    }, 
    {
      id : 'N1',
      row : 0, 
      col: 4
    }, 
    null,
    null]

    const result = []
  
    let cell = {}
    cell = find_cell_jump (paw ,'N', matrix, 'forward') 
    result.push (cell)
    cell = find_cell_jump (paw ,'N', matrix, 'right') 
    result.push (cell)
    cell = find_cell_jump (paw ,'N', matrix, 'behind') 
    result.push (cell)
    cell = find_cell_jump (paw ,'N', matrix, 'left') 
    result.push (cell)
    expect(result).toMatchObject(expected);
    
  
  })

  test ('Find next jump cells corner 0 16', () => {

    const paw = {
      id: 'N1',
      row : 0, 
      col: 16  
    } 
  
    const expected = [{
      id : 'N1',
      row : 4, 
      col: 16
    }, 
    null,
    null,
    {
      id : 'N1',
      row : 0, 
      col: 12
    }]
      
    const result = []
  
    let cell = {}
    cell = find_cell_jump (paw ,'N', matrix, 'forward') 
    result.push (cell)
    cell = find_cell_jump (paw ,'N', matrix, 'right') 
    result.push (cell)
    cell = find_cell_jump (paw ,'N', matrix, 'behind') 
    result.push (cell)
    cell = find_cell_jump (paw ,'N', matrix, 'left') 
    result.push (cell)
    expect(result).toMatchObject(expected);
    
  
  })

  test ('Find next jump cells corner 16 0', () => {

    const paw = {
      id: 'N1',
      row : 16, 
      col: 0  
    } 
  
    const expected = [
    null, 
    {
      id : 'N1',
      row : 16, 
      col: 4
    }, 
    {
        id : 'N1',
        row : 12, 
        col: 0
      }, 
    null]
      
    const result = []
  
    let cell = {}
    cell = find_cell_jump (paw ,'N', matrix, 'forward') 
    result.push (cell)
    cell = find_cell_jump (paw ,'N', matrix, 'right') 
    result.push (cell)
    cell = find_cell_jump (paw ,'N', matrix, 'behind') 
    result.push (cell)
    cell = find_cell_jump (paw ,'N', matrix, 'left') 
    result.push (cell)
    expect(result).toMatchObject(expected);
    
  
  })

  test ('Find next jump cells corner 16 16', () => {

    const paw = {
      id: 'N1',
      row : 16, 
      col: 16  
    } 
  
    const expected = [
    null, null, 
    {
      id : 'N1',
      row : 12, 
      col: 16
    }, 
    {
        id : 'N1',
        row : 16, 
        col: 12
    }]
      
    const result = []
  
    let cell = {}
    cell = find_cell_jump (paw ,'N', matrix, 'forward') 
    result.push (cell)
    cell = find_cell_jump (paw ,'N', matrix, 'right') 
    result.push (cell)
    cell = find_cell_jump (paw ,'N', matrix, 'behind') 
    result.push (cell)
    cell = find_cell_jump (paw ,'N', matrix, 'left') 
    result.push (cell)
    expect(result).toMatchObject(expected);
    
  
  })

  test ('Find next jump cells for top middle', () => {

    const paw = {
      id: 'N1',
      row : 0, 
      col: 8  
    } 
  
    const expected = [{
      id : 'N1',
      row : 4, 
      col: 8
    }, 
    {
      id : 'N1',
      row : 0, 
      col: 12
    }, 
    null,
    {
        id : 'N1',
        row : 0, 
        col: 4
      }, ]

    const result = []
  
    let cell = {}
    cell = find_cell_jump (paw ,'N', matrix, 'forward') 
    result.push (cell)
    cell = find_cell_jump (paw ,'N', matrix, 'right') 
    result.push (cell)
    cell = find_cell_jump (paw ,'N', matrix, 'behind') 
    result.push (cell)
    cell = find_cell_jump (paw ,'N', matrix, 'left') 
    result.push (cell)
    expect(result).toMatchObject(expected);
    
  
  })

  test ('Find next jump cells for right middle', () => {

    const paw = {
      id: 'N1',
      row : 8, 
      col: 16  
    } 
  
    const expected = 
    [ { 
      id : 'N1',
      row : 12, 
      col: 16 
    },
     null, 
    { 
      id : 'N1',
      row : 4, 
      col: 16 
    },  
     { 
      id : 'N1',
      row : 8, 
      col: 12 
    }]
      
    const result = []
  
    let cell = {}
    cell = find_cell_jump(paw ,'N', matrix, 'forward') 
    result.push (cell)
    cell = find_cell_jump (paw ,'N', matrix, 'right') 
    result.push (cell)
    cell = find_cell_jump (paw ,'N', matrix, 'behind') 
    result.push (cell)
    cell = find_cell_jump (paw ,'N', matrix, 'left') 
    result.push (cell)
  
    
    expect(result).toMatchObject(expected);
    
  
  })
  
  test ('Find next jump cells for bottom middle', () => {

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
      col: 12 
    }, 
    { 
        id : 'N1',
        row : 12, 
        col: 8
      },
     { 
      id : 'N1',
      row : 16, 
      col: 4
    }]
      
    const result = []
  
    let cell = {}
    cell = find_cell_jump(paw ,'N', matrix, 'forward') 
    result.push (cell)
    cell = find_cell_jump (paw ,'N', matrix, 'right') 
    result.push (cell)
    cell = find_cell_jump (paw ,'N', matrix, 'behind') 
    result.push (cell)
    cell = find_cell_jump (paw ,'N', matrix, 'left') 
    result.push (cell)
  
    
    expect(result).toMatchObject(expected);
    
  
  })

  test ('Find next jump cells for left middle', () => {

    const paw = {
      id: 'N1',
      row : 8, 
      col: 0  
    } 
  
    const expected = 
    [  { 
        id : 'N1',
        row : 12, 
        col: 0 
      }, 
       
      { 
      id : 'N1',
      row : 8, 
      col: 4
    }, 
    { 
        id : 'N1',
        row : 4, 
        col: 0
      },
     null]
      
    const result = []
  
    let cell = {}
    cell = find_cell_jump(paw ,'N', matrix, 'forward') 
    result.push (cell)
    cell = find_cell_jump (paw ,'N', matrix, 'right') 
    result.push (cell)
    cell = find_cell_jump (paw ,'N', matrix, 'behind') 
    result.push (cell)
    cell = find_cell_jump (paw ,'N', matrix, 'left') 
    result.push (cell)
  
    
    expect(result).toMatchObject(expected);
    
  
  })

  const matrix2 = [
   
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

  test ('Find next cells jump with lateral walls 0 0', () => {

    const paw = {
      id: 'N1',
      row : 0, 
      col: 0  
    } 
  
    const expected = 
    [  null, 
       null, 
       null,
       null]
      
    const result = []
  
    let cell = {}
    cell = find_cell_jump(paw ,'N', matrix2, 'forward') 
    result.push (cell)
    cell = find_cell_jump (paw ,'N', matrix2, 'right') 
    result.push (cell)
    cell = find_cell_jump (paw ,'N', matrix2, 'behind') 
    result.push (cell)
    cell = find_cell_jump (paw ,'N', matrix2, 'left') 
    result.push (cell)
  
    
    expect(result).toMatchObject(expected);
    
  
  })
 
  test ('Find next cells jump with lateral walls 0 16', () => {

    const paw = {
      id: 'N1',
      row : 0, 
      col: 16
    } 
  
    const expected = [
    null, 
    null, 
    null, 
    {
        id : 'N1',
        row : 0, 
        col: 12
      }]
      
    const result = []
  
    let cell = {}
    cell = find_cell_jump (paw ,'N', matrix2, 'forward') 
    result.push (cell)
    cell = find_cell_jump (paw ,'N', matrix2, 'right') 
    result.push (cell)
    cell = find_cell_jump (paw ,'N', matrix2, 'behind') 
    result.push (cell)
    cell = find_cell_jump (paw ,'N', matrix2, 'left') 
    result.push (cell)
    expect(result).toMatchObject(expected);
    
  
  })

  test ('Find next cells jump with lateral walls center 8 8', () => {

    const paw = {
      id: 'N1',
      row : 8, 
      col: 8
    } 
  
    const expected = [
        {
            id : 'N1',
            row : 12, 
            col: 8
          },null , 
    {
        id : 'N1',
        row : 4, 
        col: 8
      }, 
    null]
      
    const result = []
  
    let cell = {}
    cell = find_cell_jump (paw ,'N', matrix2, 'forward') 
    result.push (cell)
    cell = find_cell_jump (paw ,'N', matrix2, 'right') 
    result.push (cell)
    cell = find_cell_jump (paw ,'N', matrix2, 'behind') 
    result.push (cell)
    cell = find_cell_jump (paw ,'N', matrix2, 'left') 
    result.push (cell)
    expect(result).toMatchObject(expected);
    
  
  })

  test ('Find next cells jump with lateral walls 16 16', () => {

    const paw = {
      id: 'N1',
      row : 16, 
      col: 16
    } 
  
    const expected = [
        null,null , null, 
    {
        id : 'N1',
        row : 16, 
        col: 12
      }, 
    ]
      
    const result = []
  
    let cell = {}
    cell = find_cell_jump (paw ,'N', matrix2, 'forward') 
    result.push (cell)
    cell = find_cell_jump (paw ,'N', matrix2, 'right') 
    result.push (cell)
    cell = find_cell_jump (paw ,'N', matrix2, 'behind') 
    result.push (cell)
    cell = find_cell_jump (paw ,'N', matrix2, 'left') 
    result.push (cell)
    expect(result).toMatchObject(expected);
    
  
  })



  const matrix3 = [
   
    [
      'N', ' ', 'S', ' ', ' ', ' ', 'S', ' ', 'N', ' ', 'S', ' ', ' ', ' ', 'S', ' ', 'N'
    ],
    [
      ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
    ],
    [
      'S', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'S', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'S'
    ],
    [
      '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'
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
      'N', ' ', 'S', ' ', ' ', '|', 'S', '|', 'N', '|', 'S', '|', ' ', ' ', 'S', ' ', 'N'
    ],
    [
      ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' '
    ],
    [
      'S', '|', ' ', ' ', ' ', ' ', ' ', ' ', 'S', ' ', ' ', ' ', 'N', '|', ' ', '|', 'S'
    ],
    [
      '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'
    ],
    [
      ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'S', ' ', ' ', ' ', ' '
    ],
    [
      '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', '-'
    ],
    
    [
      'N', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'S', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'N'
    ],
    [
      ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
    ],
    [
      'S', ' ', 'N', '|', ' ', ' ', 'S', ' ', 'N', ' ', 'S', ' ', ' ', ' ', 'N', ' ', 'S'
    ]
  ]



  test ('Find next cells jump N forwarddiagonal 0,0', () => {

    const paw = {
      id: 'N1',
      row : 0, 
      col: 0
    } 
  
    const expected = [
       
      {
        id : 'N1',
        row : 2, 
        col: 2
      }, 
    ]
      
    const result = []
  
    let cell = {}
    cell = find_cell_jump (paw ,'N', matrix3, "forward_diagonal") 
    result.push (cell)

    expect(result).toMatchObject(expected);
    
  
  })

  test ('Find next cells jump N forwarddiagonal 16,0', () => {

    const paw = {
      id: 'S1',
      row : 16, 
      col: 0
    } 
  
    const expected = [
       
      {
        id : 'S1',
        row : 14, 
        col: 2
      }, 
    ]
      
    const result = []
  
    let cell = {}
    cell = find_cell_jump (paw ,'S', matrix3, "forward_diagonal") 
    result.push (cell)

    expect(result).toMatchObject(expected);
    
  
  })

  test ('Find next cells jump N forwarddiagonal 0,16', () => {

    const paw = {
      id: 'S1',
      row : 0, 
      col: 16
    } 
  
    const expected = [
       
      {
        id : 'S1',
        row : 2, 
        col: 14
      }, 
    ]
      
    const result = []
  
    let cell = {}
    cell = find_cell_jump (paw ,'N', matrix3, "forward_diagonal") 
    result.push (cell)

    expect(result).toMatchObject(expected);
    
  
  })

  test ('Find next cells jump N forwarddiagonal 16,16', () => {

    const paw = {
      id: 'S1',
      row : 16, 
      col: 16
    } 
  
    const expected = [
       
      {
        id : 'S1',
        row : 14, 
        col: 14
      }, 
    ]
      
    const result = []
  
    let cell = {}
    cell = find_cell_jump (paw ,'S', matrix3, "forward_diagonal") 
    result.push (cell)

    expect(result).toMatchObject(expected);
    
  
  })

  test ('Find next cells jump N forward diagonal 8,8', () => {

    const paw = {
      id: 'S1',
      row : 8, 
      col: 8
    } 
  
    const expected = [
       
      null
    ]
      
    const result = []
  
    let cell = {}
    cell = find_cell_jump (paw ,'N', matrix3, "forward_diagonal") 
    result.push (cell)

    expect(result).toMatchObject(expected);
    
  
  })
  test ('Find next cells jump N forward diagonal with wall 8,0', () => {

    const paw = {
      id: 'S1',
      row : 8, 
      col: 0
    } 
  
    const expected = [
       
      null
    ]
      
    const result = []
  
    let cell = {}
    cell = find_cell_jump (paw ,'N', matrix3, "forward_diagonal") 
    result.push (cell)

    expect(result).toMatchObject(expected);
    
  
  })

  test ('Find next cells jump N forward diagonal with wall 8,16', () => {

    const paw = {
      id: 'S1',
      row : 8, 
      col: 16
    } 
  
    const expected = [
      null
    ]
      
    const result = []
  
    let cell = {}
    cell = find_cell_jump (paw ,'N', matrix3, "forward_diagonal") 
    result.push (cell)

    expect(result).toMatchObject(expected);
    
  
  })

  test ('Find next cells jump N forward diagonal  10,12', () => {

    const paw = {
      id: 'N1',
      row : 10, 
      col: 12
    } 
  
    const expected = [
       {
        id: 'N1',
        row : 12, 
        col: 14
      } 
    ]
      
    const result = []
  
    let cell = {}
    cell = find_cell_jump (paw ,'N', matrix3, "forward_diagonal") 
    result.push (cell)

    expect(result).toMatchObject(expected);
    
  
  })

  test ('Find next cells jump S forward diagonal  12,12', () => {

    const paw = {
      id: 'S1',
      row : 12, 
      col: 12
    } 
  
    const expected = [
       {
        id: 'S1',
        row : 10, 
        col: 10
      } 
    ]
      
    const result = []
  
    let cell = {}
    cell = find_cell_jump (paw ,'S', matrix3, "forward_diagonal") 
    result.push (cell)

    expect(result).toMatchObject(expected);
    
  
  })