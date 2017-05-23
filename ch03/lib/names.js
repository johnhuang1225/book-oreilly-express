/**
 * Created by a0801 on 2017/5/23.
 */
var names = [
    'John',
    'Jessica',
    'Henry',
    'Fiona',
    'Andy',
    'Melody'
]

exports.getRandomName = function() {
  var idx = Math.floor(Math.random() * names.length);
  return names[idx];
};