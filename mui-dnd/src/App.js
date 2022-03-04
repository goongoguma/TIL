// https://codesandbox.io/s/react-material-ui-and-react-beautiful-dnd-uofv4?file=/src/MaterialTable.tsx:3318-3484
import {
  Paper,
  Table,
  TableHead,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import { Component, useState, useRef, useLayoutEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const padding = 16

const DraggableTableCell = ({ name, calories, fat, provided, snapshot }) => {
  const { isDragging } = snapshot;
  const [tableCellWidth, setTableCellWidth] = useState({
    namewidth: 0,
    calwidth: 0,
    fatwidth: 0
  })
  const nameref = useRef(null);
  const calref = useRef(null);
  const fatref = useRef(null);

  useLayoutEffect(() => {
    if (nameref.current && calref.current && fatref.current) {
      setTableCellWidth({
        namewidth: nameref.current.clientWidth - (padding * 2),
        calwidth: calref.current.clientWidth - (padding * 2),
        fatref: fatref.current.clientWidth - (padding * 2)
      })
    }
  }, []);
  
  return (
    <TableRow
      key={name}
      ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
      style={getItemStyle(isDragging, provided.draggableProps.style)}
    >
        <TableCell component="th" scope="row" style={{ width: isDragging && tableCellWidth.namewidth }} ref={nameref}>
          {name}
        </TableCell>
        <TableCell align="right" style={{ width: isDragging && tableCellWidth.calwidth }} ref={calref}>{calories}</TableCell>
        <TableCell align="right" style={{ width: isDragging  && tableCellWidth.fatref }} ref={fatref}>{fat}</TableCell>
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

const getListstyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue":"lightgrey",
})

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
    return (
      <TableContainer component={Paper} style={{ margin: '30px', width: '400px' }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
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
                                      name={item.name} 
                                      calories={item.calories} 
                                      fat={item.fat} 
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
