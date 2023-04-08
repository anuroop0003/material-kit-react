const colors = [
  '#E74646',
  '#FFE6C7',
  '#C7E9B0',
  '#27E1C1',
  '#FEFF86',
  '#E11299',
  '#57C5B6',
  '#FFBF9B',
  '#E4DCCF',
  '#E7AB9A',
  '#C7E8CA',
  '#E9A178',
  '#9DC08B',
  '#E384FF',
  '#F7C8E0',
  '#E1EEDD',
  '#FFAACF',
  '#C9F4AA',
  '#F2CD5C',
  '#C3ACD0',
  '#E4C988',
  '#FF8B13',
  '#939B62',
  '#61876E',
  '#91D8E4'
];

export default function randomColorSelector(){
    const rand = Math.floor(Math.random()*colors.length); 
    return colors[rand];
}