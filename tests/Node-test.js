import { expect, assert } from 'chai';
import Node from '../scripts/Node';
import CompleteMe from '../scripts/Complete-Me';

describe ('Node functionality', () => {
  let node = new Node();

  beforeEach(function () {
  node = new Node();
})

  it('should have a letter key with a value of null', () => {
    expect(node.letter).to.deep.equal(null);
  });

  it('should not be considered a word by default', () => {
    expect(node.isWord).to.deep.equal(false);
  });

  it('should have an empty object property for children nodes', () => {
    expect(node.children).to.deep.equal({});
  });

  it('should have a counter set to 0', () => {
    expect(node.selectCount).to.deep.equal(0);
  });

})
