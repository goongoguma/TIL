const mockup = [
  {date: "Wed Jul 08 2020 13:29:00 GMT+0900 (대한민국 표준시)", detect: 0},
  {date: "Wed Jul 08 2020 16:28:05 GMT+0900 (대한민국 표준시)", detect: 1},
  {date: "Wed Jul 08 2020 16:46:55 GMT+0900 (대한민국 표준시)", detect: 0},
  {date: "Wed Jul 08 2020 17:08:43 GMT+0900 (대한민국 표준시)", detect: 1},
  {date: "Wed Jul 08 2020 18:02:00 GMT+0900 (대한민국 표준시)", detect: 1},
  {date: "Wed Jul 08 2020 18:18:40 GMT+0900 (대한민국 표준시)", detect: 0},
  {date: "Wed Jul 08 2020 18:39:58 GMT+0900 (대한민국 표준시)", detect: 1},
  {date: "Wed Jul 08 2020 18:50:59 GMT+0900 (대한민국 표준시)", detect: 0},
  {date: "Wed Jul 08 2020 19:16:30 GMT+0900 (대한민국 표준시)", detect: 1},
  {date: "Wed Jul 08 2020 19:37:11 GMT+0900 (대한민국 표준시)", detect: 0},
  {date: "Wed Jul 08 2020 19:44:02 GMT+0900 (대한민국 표준시)", detect: 0},
  {date: "Wed Jul 08 2020 20:01:33 GMT+0900 (대한민국 표준시)", detect: 0},
  {date: "Wed Jul 08 2020 23:22:58 GMT+0900 (대한민국 표준시)", detect: 1},
  {date: "Wed Jul 08 2020 23:26:39 GMT+0900 (대한민국 표준시)", detect: 1},
  {date: "Thu Jul 09 2020 03:17:04 GMT+0900 (대한민국 표준시)", detect: 0},
  {date: "Thu Jul 09 2020 04:12:55 GMT+0900 (대한민국 표준시)", detect: 0},
  {date: "Thu Jul 09 2020 04:21:14 GMT+0900 (대한민국 표준시)", detect: 1},
  {date: "Thu Jul 09 2020 04:46:23 GMT+0900 (대한민국 표준시)", detect: 0},
  {date: "Thu Jul 09 2020 06:20:50 GMT+0900 (대한민국 표준시)", detect: 0},
  {date: "Thu Jul 09 2020 07:10:15 GMT+0900 (대한민국 표준시)", detect: 1},
  {date: "Thu Jul 09 2020 08:18:18 GMT+0900 (대한민국 표준시)", detect: 0},
  {date: "Thu Jul 09 2020 08:52:53 GMT+0900 (대한민국 표준시)", detect: 0},
  {date: "Thu Jul 09 2020 09:13:19 GMT+0900 (대한민국 표준시)", detect: 0},
  {date: "Thu Jul 09 2020 09:19:33 GMT+0900 (대한민국 표준시)", detect: 0},
  {date: "Thu Jul 09 2020 11:15:52 GMT+0900 (대한민국 표준시)", detect: 1},
  {date: "Thu Jul 09 2020 11:22:01 GMT+0900 (대한민국 표준시)", detect: 0},
  {date: "Thu Jul 09 2020 12:05:02 GMT+0900 (대한민국 표준시)", detect: 1},
  {date: "Thu Jul 09 2020 12:08:28 GMT+0900 (대한민국 표준시)", detect: 1},
  {date: "Thu Jul 09 2020 12:35:38 GMT+0900 (대한민국 표준시)", detect: 0},
  {date: "Thu Jul 09 2020 12:50:42 GMT+0900 (대한민국 표준시)", detect: 1}
];

const margin = { top: 32, right: 32, bottom: 32, left: 32 };
const width = 1040;
const height = 400;

  const svg = d3.select('body')
              .append('svg')
              .attr('width', width)
              .attr('height', height)
              .style('background', '#fff')
              .style('border-radius', '4%')

  // title
  svg.append('g')
    .attr('transform', 'translate(32, 52)')
    .append('text')
    .text(`metal-detector`)
    .style('font-size', '24px')
    .style('font-weight', 'bold');
    
  // x-axis
  const timeRange = d3.extent(mockup, function(d) { return new Date(d.date) });
  
  const x = d3.scaleTime()
              .domain(timeRange)
              .range([32, width - margin.left - margin.right - 64]);


  const formatMillisecond = d3.timeFormat(".%L");
  const formatHour = d3.timeFormat("%H:%M");
  const formatDay = d3.timeFormat("%-dday");
  const formatSecond = d3.timeFormat(":%S");
  const formatMinute = d3.timeFormat("%I:%M");
  const formatWeek = d3.timeFormat("%-dday");
  const formatMonth = d3.timeFormat("%B");
  const formatYear = d3.timeFormat("%Y");

  const multiFormat = (date) => {
    return (d3.timeSecond(date) < date ? formatMillisecond
    : d3.timeMinute(date) < date ? formatSecond
    : d3.timeHour(date) < date ? formatMinute
    : d3.timeDay(date) < date ? formatHour
    : d3.timeMonth(date) < date ? (d3.timeWeek(date) < date ? formatDay : formatWeek)
    : d3.timeYear(date) < date ? formatMonth
    : formatYear)(date);
  };
  
  svg.append('g')
     .attr('transform', 'translate(' + 32 + ',' + (height - margin.bottom - margin.top - 32) + ')')
     .call(
       d3.axisBottom(x)
       .tickFormat(multiFormat)
       .tickSize(-200)
       .tickPadding(20)
      )
     .style('font-size', 13)
     .style('color', '#aaaaaa')
     
  // y-axis
  const detectRange = d3.extent(mockup, function(d) { return d.detect })
  const y = d3.scalePoint()
              .domain(detectRange)
              .range([105, 0])

  svg.append('g')
      // y -> 400 - 166 - 99 = 135
     .attr('transform', 'translate(64, 135)')
     .style("font-size", 12)
     .style('color', '#aaaaaa')
     .call(d3.axisLeft(y)
      .tickSize(0)
      .tickPadding(21)
      .tickFormat(function(d) { 
       if (!d) {
         return 0
       } else {
         return 1
       }
      }))
     .select('.domain')
     .remove();

  // line
  svg.append('path')
     .datum(mockup)
     .attr('fill', 'none')
     .attr('stroke', 'black')
     .attr('transform', 'translate(32, 135)')
     .attr('stroke-width', 1)
     .attr('d', d3.line()
                  .x(function(d) { return x(new Date(d.date)) })
                  .y(function(d) { return y(d.detect) })
                  .curve(d3.curveStepAfter))

    // line rect
    mockup.forEach((item,index) => {
      if (item.detect) {
        svg.append('rect')
        .datum(mockup)
        .attr('class', 'detected-area')
        .attr('width', index)
        .attr('height', 105)
        .attr('x', index * 32)
        .attr('y', 136)
        .style('fill', '#c44569')
        .style('opacity', 0.8)
      }
    })