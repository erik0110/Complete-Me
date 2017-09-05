class CompleteMe {
  constructor () {
    this.words = [];
  }

  insert(word) {
    this.words.push(word);
    this.count();
  }

  count() {
    this.countWords = this.words.length;
  }

}

export default CompleteMe;
