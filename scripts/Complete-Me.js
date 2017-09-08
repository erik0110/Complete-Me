import Node from './Node';

class CompleteMe {
  constructor () {
    this.words = [];
    this.root = new Node();
    this.counter = 0;
  }

  insert(word) {
    let wordArray = [...word.toLowerCase()];
    let currentNode = this.root;

    for (let i = 0; i < wordArray.length; i++) {
      if (currentNode.children[wordArray[i]]) {
        currentNode = currentNode.children[wordArray[i]];
      } else {
        currentNode.children[wordArray[i]] = new Node(wordArray[i]);
        currentNode = currentNode.children[wordArray[i]];
      }
    }
    if (currentNode.isWord === false) {
      this.counter++;
      currentNode.isWord = true;
    }
  }

  count() {
    // this.countWords = this.words.length;
    return this.counter;
  }

  // [ apple, apples, apparatus ]
  suggest(string) { // 'app'
    let spreadString = [...string];
    let currentNode = this.root;
    let suggestArray = [];

    for (let i = 0; i < spreadString.length; i++) {
      currentNode = currentNode.children[spreadString[i]];
    }

    // currentNode === appNode

    const searchMatch = (string, currentNode) => {
      console.log(string)
      let keys = Object.keys(currentNode.children);  // [a, l]

      for (let k = 0; k < keys.length; k++) {
        const child = currentNode.children[keys[k]];
        let newString = string + child.letter;

        if (child.isWord) {
          suggestArray.push({name: newString, selecCount: child.selectCount})
        }
        searchMatch(newString, child);
      }
    }

    if (currentNode && currentNode.isWord) {
      suggestArray.push({name: string, selecCount: currentNode.children.selectCount})
    }

    if (currentNode) {
      searchMatch(string, currentNode);
    }
    suggestArray.sort((a, b) => {
      return b.selectCount - a.selectCount;
    });
    return suggestArray.map((obj) => {
      return obj.name;
    });
  }
    // pull string index 0
    // evaluate that against the nodes
    // select that node

  select(word) {
    let wordArray = [...word];
    let currentNode = this.root;
    for (let i = 0; i < wordArray.length; i++) {
      currentNode = currentNode.children[wordArray[i]];
    }
    currentNode.selectCount++;
  }

  populate(dictionary) {
    dictionary.forEach(word => {
      this.insert(word);
    })
  }

}

export default CompleteMe;
