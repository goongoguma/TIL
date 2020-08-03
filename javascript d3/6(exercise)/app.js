const margin = { top: 20, right: 20, bottom: 30, left: 50 };
const width = 960 - margin.right - margin.left;
const height = 500 - margin.top - margin.bottom;

// set the ranges
const x = d3.scaleTime().range([0, width]);
const y1 = d3.scaleLinear().range([height, 0]);
const y2 = d3.scaleLinear().range([height, 0]);
const y3 = d3.scaleOrdinal().range([height-350, height-100]);

// parse the date
const parseTime = d3.timeParse('%d-%b-%y');

// define the 1st line 
const valueline = d3.line()
                   .x(function(d) { return x(d.date); })
                   .y(function(d) { return y1(d.temp); })
                   .curve(d3.curveStepAfter);

// define the 2nd line
const valueline2 = d3.line()
                    .x(function(d) { return x(d.date); })
                    .y(function(d) { return y2(d.humidity); })
                    .curve(d3.curveStepAfter);

// define the 3rd line
const valueline3 = d3.line()
                    .x(function(d) { return x(d.date); })
                    .y(function(d) { return y3(d.wind); })
                    .curve(d3.curveStepAfter);

// appends the svg object to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
const svg = d3.select('body').append('svg')    
             .attr('width', width + margin.left + margin.right + 70)
             .attr('height', height + margin.top + margin.bottom)
             .append('g')
             .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

// Get the data
d3.csv('data.csv').then(function(data) {
  data.forEach(function(d) {
    d.date = parseTime(d.date);
    d.temp = +d.temp;
    d.humidity = +d.humidity;
    d.wind = d.wind;
  });

  console.log(d3.extent(data, function(d) { return d.date }))

  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.date }));
  y1.domain([0, d3.max(data, function(d) { return d.temp})]);
  y2.domain([0, d3.max(data, function(d) { return d.humidity})]);
  y3.domain(data.map(d => d.wind));

  // y1 axis tick format
  const y1AxisTicks = y1.ticks().filter(tick => Number.isInteger(tick));

  // y2 axis tick format
  const y2AxisTicks = y2.ticks().filter(tick => tick % 10 === 0);

  const dateRangeArray = [];
  
  // Add the x Axis
  svg.append('g').attr('transform', 'translate(0,' + height + ')')
                 .attr('class', 'axis')
                 .call(d3.axisBottom(x).tickSize(-(height), 0, 0)
                 .tickFormat(d3.timeFormat('%d' + 'day'))
                 .tickValues(data.map(function(d) { return new Date(d.date)}))
                 .tickPadding(15))
                 .style("font-size",13)
                 .selectAll('.tick')
                 .on('click', function(d, i) { 
                   if (dateRangeArray.length < 2) {
                    d3.select(this).select('line').attr('class', 'selected-tick');
                    d3.select(this).select('text').attr('class', 'selected-tick');
                    dateRangeArray.push(d)

                      // 선택된 두개의 ticks과 사잇값을 포함한 모든 값
                      const ticksRange = d3.scaleTime().domain(dateRangeArray).ticks(d3.timeDay)
                                           .sort((a, b) => a.getTime() - b.getTime());
                        
                         svg.append('rect')
                         .attr('x', x(ticksRange[0]))
                         .attr('y', 0)
                         .attr('width', (ticksRange.length-1) * 69)
                         .attr('height', height)
                         .style('opacity', 0.5)
                         .style('fill', '#f5cd79')
                         .on('mouseover', function() { 
                          const coordinateX = d3.mouse(this)[0];
                          const coordinateY = d3.mouse(this)[1];

                          const box = d3.selectAll('.info-class')
                                        .data(ticksRange)
                                        .enter()
                                        .append('g')
                                        .attr('x', coordinateX)
                                        .attr('y', coordinateY)
                                        .attr('class', 'info-class')
                                        .attr('transform', 'translate(' + coordinateX + ',' + coordinateY + ')');
                          
                         const box2 =  box.append('rect')
                             .attr('width', 500)
                             .attr('height', 400)
                             .style('fill', 'red');

                          box2.append('text').attr('x', coordinateX)
                          .attr('y', coordinateY).style('fill', 'black').text(function(d) { return d }).style('background', '#eee')
                          
                          
                              // box.append('rect')
                              //    .attr('class', 'selected-info')
                              //    .attr('x', coordinateX)
                              //    .attr('y', coordinateY)
                              //    .attr('fill' , 'green')
                              //    .attr('width', 500)
                              //    .attr('height', 700)


                          }) 
                        // .on('mouseout', function() {
                        //   d3.selectAll('.info-class').remove();
                        // })
                    
                   }
                })

  // svg.append('rect').attr('x', 0).attr('y', 0).attr('width', 300).attr('height', 300).style('opacity', 0.5).style('fill', '#f5cd79')
            
  // Add the y1 Axis
  svg.append('g').call(d3.axisLeft(y1)
                 .tickSizeInner(0)
                 .tickValues(y1AxisTicks).tickFormat(d => d + '°C').tickPadding(20))
                 .style("font-size",13);;

  // Add the valueline path
  svg.append('path').data([data])
                    .attr('class', 'line')
                    .attr('d', valueline);

  // Add the y2 Axis
  svg.append('g').attr('transform', 'translate(890, 0)')
                 .call(d3.axisRight(y2)
                 .tickSizeOuter(0)
                 .tickSizeInner(0)
                 .tickValues(y2AxisTicks).tickFormat(d => d + "%").tickPadding(20))
                 .style("font-size",13);

  // Add the valueline2 path
  svg.append('path').data([data])
                    .attr('class', 'line')
                    .attr('d', valueline2)
                    .style('stroke', 'red');

  // Add the y3 Axis
  svg.append('g').attr('transform', 'translate(930, 0)')
                 .call(d3.axisRight(y3).tickPadding(20))
                 .style("font-size",13)
                 .selectAll("line, path")
                 .style("stroke", "none")

  // Add the valueline3 path
  svg.append('path').data([data])
                    .attr('class', 'line')
                    .style('stroke', 'purple')
                    .attr('d', valueline3)
});