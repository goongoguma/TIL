import {
  Paper,
  Table,
  TableHead,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import { Component, useState, useRef, useLayoutEffect, Fragment } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Reorder } from '@material-ui/icons'

const padding = 16 * 2

const DraggableTableCell = ({ cellitems, provided, snapshot }) => {
  const { isDragging } = snapshot;
  const [tableCellWidth, setTableCellWidth] = useState({
    iconwidth: 0,
    namewidth: 0,
    calwidth: 0,
    fatwidth: 0
  })
  const refs = useRef({});

  useLayoutEffect(() => {
    Object.keys(tableCellWidth).forEach(item => setTableCellWidth(prevState => ({
      ...prevState,
      [item]: refs.current[item].clientWidth - padding
    })));
  }, []);
  
  return (
    <TableRow
      ref={provided.innerRef} 
      style={getItemStyle(isDragging, provided.draggableProps.style)}
      {...provided.draggableProps}
    >
        <TableCell scope="row" {...provided.draggableProps} {...provided.dragHandleProps} style={{ width: isDragging && tableCellWidth.iconwidth, background: 'pink' }}  ref={el => refs.current.iconwidth = el}>
          <Reorder />
        </TableCell>
          {
            cellitems.map((item) => {
              return (
                <TableCell 
                  key={item.title} 
                  align="left" 
                  style={{ width: isDragging && tableCellWidth[item.title], background: 'skyblue' }} 
                  ref={el => refs.current[item.title] = el}
                >
                  {item.cellitem}
                </TableCell>
              )
            })
          }
    </TableRow>
  )
}

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0),
  createData('Ice cream sandwich', 237, 9.0),
  createData('Eclair', 262, 16.0),
  createData('Cupcake', 305, 3.7),
  createData('Gingerbread', 356, 16.0),
];

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result
}

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  background: isDragging ? "lightgreen" : "grey",

  ...draggableStyle
})

const getListstyle = isDraggingOver => {
  return {
    background: isDraggingOver ? "lightblue":"lightgrey",
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: rows
    }
  }

  onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const items = reorder(this.state.items, result.source.index, result.destination.index);

    this.setState({
      items
    });
  };

  
  render() {
    console.log(this.state.items)
    return (
      <TableContainer component={Paper} style={{ margin: '30px', width: '400px' }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">&nbsp;</TableCell>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable droppableId="droppable" direction='vertical'>
                {
                  (provided, snapshot) => {
                    return (
                      <TableBody {...provided.droppableProps} ref={provided.innerRef} style={getListstyle(snapshot.isDraggingOver)}>
                        {this.state.items.map((item, index) => (
                            <Draggable key={item.name} draggableId={item.name} index={index}>
                              {
                                (provided, snapshot) => {
                                  return (
                                    <DraggableTableCell 
                                      cellitems={
                                        [
                                          {title: "namewidth", cellitem: item.name}, 
                                          {title: "calwidth", cellitem: item.calories}, 
                                          {title: "fatwidth", cellitem: item.fat}
                                        ]
                                      }
                                      provided={provided} 
                                      snapshot={snapshot} 
                                    />
                                  )
                                }
                              }
                          </Draggable>
                          ))}
                          {provided.placeholder}
                      </TableBody>
                    )
                  }
                }
              </Droppable>
            </DragDropContext>
          </Table>
        </TableContainer>
    );
  }
}

export default App;
