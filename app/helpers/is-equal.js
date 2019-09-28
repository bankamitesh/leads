export default Ember.Helper.helper(function([leftSide, rightSide, lsKey]) {
    var l = leftSide[lsKey] ? leftSide[lsKey].toString() : leftSide[lsKey];
    var r = rightSide ? rightSide.toString() : rightSide;
    return l===r;
  });
  