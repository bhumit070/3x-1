const btn = document.querySelector('#btnGenerateChart');
const input = document.querySelector('#number');
var prevVal;
const generateSequence = (num) => {
  let number = num;
  if (number == 2) {
    return {
      nums: [
        { y: 2, indexLabel: '2' },
        { y: 1, indexLabel: '1' },
        { y: 4, indexLabel: '4' },
        { y: 2, indexLabel: '2' },
        { y: 1, indexLabel: '1' },
      ],
      num,
    };
  } else {
    const nums = [];
    nums.push({
      y: parseInt(number),
      indexLabel: number.toString(),
    });
    while (number !== 1) {
      if (number % 2 === 0) {
        number = number / 2;
        nums.push({ y: number, indexLabel: number.toString() });
      } else {
        number = 3 * number + 1;
        nums.push({ y: number, indexLabel: number.toString() });
      }
    }
    return {
      nums,
      num,
    };
  }
};

const generateChart = ({ nums, num }) => {
  var fontSize = nums.length < 50 ? 15 : 10;
  var chart = new CanvasJS.Chart('chartContainer', {
    animationEnabled: true,
    exportEnabled: false,
    theme: 'light2',
    title: {
      text: `3x+1 chart for ${num}`,
    },
    data: [
      {
        type: 'line',
        indexLabelFontSize: fontSize,
        dataPoints: nums,
      },
    ],
  });
  chart.render();
};

const process = (num = 50) => {
  if (num === prevVal) return;
  prevVal = num;
  const sequence = generateSequence(num);
  return generateChart(sequence);
};

btn.addEventListener('click', () => {
  const num = input.value;
  if (!num || isNaN(num)) return alert('Please enter valid number');
  if (num <= 0) return alert('Please enter number greater than 0');
  return process(num);
});

window.addEventListener('load', () => process());
