class Branch {
  constructor (letter) {
    this.letter = letter || null;
    this.isWord = false;
    this.children = {};
  }
}

export default Branch;