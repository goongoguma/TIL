const DUMMY_DATA = [
  {id: 'd1', value: 10, region: 'USA'},
  {id: 'd2', value: 11, region: 'India'},
  {id: 'd3', value: 12, region: 'China'},
  {id: 'd4', value: 6, region: 'Germany'},
];

// scaleBand와 scaleLinear는 x와 y축은 좌측 상단부터 시작한다. (좌측상단부터 좌표가 0,0으로 찍힘)
// scaleBand는 데이터들이 모두 같은 크기의 넓이를 갖도록 한다
// domain은 제공되는 데이터 (scaleBand는 domain에 제공되는 데이터의 길이에 따라 표의 갯수를 설정)
// rangeRound는 데이터를 나타내는 표 넓이의 최소, 최대값을 나타냄
// padding은 서로 다른 표들의 간격을 나타냄
const xScale = d3.scaleBand().domain(DUMMY_DATA.map(dataPoint => dataPoint.region)).rangeRound([0, 250]).padding(0.1);

// scaleLinear는 데이터를 받아 표의 높이를 계산한다
// range는 표의 길이를 나타내고 from to가 아닌 to from순으로 적는다 왜냐하면 scaleLinear의 좌표는 좌측 상단부터 시작해 하단으로 내려가기 때문
const yScale = d3.scaleLinear().domain([0, 15]).range([200, 0]);

const container = d3.select('svg')
  .classed('container', true)

container
  .selectAll('.bar')
  .data(DUMMY_DATA)
  .enter()
  .append('rect')
  .classed('bar', true)
  // bandwidth는 xScale의 넓이를 나타냄
  .attr('width', xScale.bandwidth())
  .attr('height', (data) => 200 - yScale(data.value))
  // 표들의 간격을 설정해주기위해 x와 y의 위치를 정해준다
  .attr('x', data => xScale(data.region))
  .attr('y', data => yScale(data.value));