const pawsCtrl = {}

pawsCtrl.inTrace = (element, array_elements) => {
  
  let result = false;

  if (!element) {
    return true;
  }

  for (let i = 0; i < array_elements.length; i++) {
    if (
      element.row == array_elements[i].row &&
      element.col == array_elements[i].col
    ) {
      return true;
    }
  }
  return result;
}

module.exports = pawsCtrl;