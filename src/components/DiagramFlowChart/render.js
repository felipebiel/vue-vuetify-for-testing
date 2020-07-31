import * as d3 from 'd3';
import {roundTo20} from './utils/math';

function setHeight(g, node) {
  const bodyTextY = node.y + 25 + (roundTo20(node.height - 20) / 2);

  let positionFinal = 0;
  let positionInit = 0;

  g.append('text')
      .attr('x', node.x + (node.width / 2))
      .attr('y', bodyTextY)
      .attr('class', 'unselectable')
      .attr('text-anchor', 'start')
      .text(() => node.text)
      .each(function wrap() {
          const rawText = d3.select(this);
          const words = rawText.text().split(/\s+/).reverse();
          let word;
          let line = [];
          let tspan = rawText.text(null).append("tspan").attr("x", node.x + 10).attr("y", node.y + 40);
          let nextLinePosition = node.y + 40;
          positionInit = nextLinePosition;
          // eslint-disable-next-line
          while (word = words.pop()) {
              line.push(word);
              tspan.text(line.join(" "));
              if (tspan.node().getComputedTextLength() > node.width - 10) {
                  nextLinePosition += 30;
                  line.pop();
                  tspan.text(line.join(" "));
                  line = [word];
                  tspan = rawText.append("tspan").attr("x", node.x + 10).attr("y", nextLinePosition).text(word);
              }
          }
          positionFinal = nextLinePosition;
          // console.log();
          // console.log((positionFinal - positionInit) + roundTo20(node.height  - 20));
      });

  return (positionFinal - positionInit) + 30;
}

function render(g, node, isSelected) {
  // setHeight(node);
  // eslint-disable-next-line
  node.width = node.width || 200;
  // eslint-disable-next-line
  node.height = setHeight(g, node);
  const borderColor = isSelected ? '#666666' : '#bbbbbb';
  if (node.type !== 'start' && node.type !== 'end') {
  // title
      g.append('rect')
          .attr('x', node.x)
          .attr('y', node.y)
          .attr('stroke', borderColor)
          .attr('class', 'title')
          .style('height', '20px')
          .style('fill', '#f1f3f4')
          .style('stroke-width', '1px')
          .style('width', `${node.width}px`);
      g.append('text')
          .attr('x', node.x + 4)
          .attr('y', node.y + 15)
          .attr('class', 'unselectable')
          .text(() => node.title)
          .each(function wrap() {
              const self = d3.select(this);
              let textLength = self.node().getComputedTextLength();
              let text = self.text();
              while (textLength > (node.width - (2 * 4)) && text.length > 0) {
                  text = text.slice(0, -1);
                  self.text(`${text}...`);
                  textLength = self.node().getComputedTextLength();
              }
          });
  }
  // body
  const colorFill = node.endCause ? '#fa8e3e' : 'white';

  const body = g.append('rect').attr('class', 'body');
  body.style('width', `${node.width}px`)
      .style('fill', colorFill)
      .style('stroke-width', '1px');
  if (node.type !== 'start' && node.type !== 'end') {
      body.attr('x', node.x).attr('y', node.y + 20);
      body.style('height', `${node.height}px`);
  } else {
      body.attr('x', node.x)
          .attr('y', node.y)
          .classed(node.type, true)
          .attr('rx', 30);
      body.style('height', `${roundTo20(node.height)}px`);
  }
  body.attr('stroke', borderColor);

  setHeight(g, node);
}


export default render;