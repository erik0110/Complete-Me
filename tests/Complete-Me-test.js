import { expect, assert } from 'chai';
import CompleteMe from '../scripts/Complete-Me';
import fs from 'fs';

let completion;
const text = "/usr/share/dict/words";
const dictionary = fs.readFileSync(text).toString().trim().split('\n');

describe ('insert', () => {

  beforeEach ( () => {
    completion = new CompleteMe;
  });

  it('should be an object {}', () =>  {
    assert.isObject(completion);
  });

  it('insert should be a method that takes in an argument and inserts into the array', () => {

    assert.isFunction(completion.insert);
    completion.insert('Smelly Nelly');
    assert.equal(completion.words.length, 0);
    assert.equal(completion.words['Smelly Nelly']);
  });


  it('should be considered a word after last letter', () => {
    completion.insert('yeah');

    expect(
      completion.root
      .children.y
      .children.e
      .children.a
      .children.h
      .letter
    ).to.equal('h')

    expect(
      completion.root
      .children.y
      .children.e
      .children.a
      .children.h
      .isWord
    ).to.equal(true)
  });

  it('should be considered a word after last letter', () => {
    completion.insert('puppy');

    expect(
      completion.root
      .children.p
      .children.u
      .children.p
      .children.p
      .isWord
    ).to.equal(false)
  });

  it('should build tree', () => {
    completion.insert('Nelly');

    expect(completion.root.letter).to.equal(null)
    expect(completion.root.children.n.letter).to.equal('n')
    expect(
      completion.root
      .children.n
      .children.e
      .children.l
      .children.l
      .children.y.letter
    ).to.equal('y')
  });

  it('should be able to insert multiple words with multiple properties', () => {
    completion.insert('apple');
    completion.insert('ape');
    let childKeys = Object.keys(
    completion.root
    .children.a
    .children.p
    .children
  );

    expect(childKeys).to.deep.equal(['p', 'e']);
})

describe('suggest', () => {

  beforeEach ( () => {
    completion = new CompleteMe;
  });

  it('should be an object', () => {

    assert.isFunction(completion.suggest);
  })

  it.skip('should suggest several things', () => {
    completion.insert('app');
    completion.insert('ape');
    completion.insert('apple');
    completion.insert('apples');
    completion.insert('application');
    completion.insert('apologize');
    completion.insert('apricot');

    completion.suggest('ap');
  })
})


describe('select', () => {

  beforeEach ( () => {
    completion = new CompleteMe;
  });

  // it("select should increment frequency", () => {
  //   completion.insert("stop")
  //   expect(completion.root.children.s.children.t.children.o.children.p.selectCount).to.equal(0)
  //   completion.select("stop")
  //   completion.select("stop")
  //   expect(completion.root.children.s.children.t.children.o.children.p.selectCount).to.equal(2)
  // })
  //
  // it("select should dictate the order of an array", () => {
  //   completion.populate(['stoop', 'stop'])
  //   completion.select("stop")
  //   assert.deepEqual(completion.suggest('st'), ['stop', 'stoop']);
  // });

  it("select should dictate the order of an array", () => {
    completion.populate(['stoop', 'stopping', 'stopped', 'stop'])
    completion.select("stop")
    completion.select("stop")
    completion.select("stop")
    completion.select("stopped")
    completion.select("stopped")
    completion.select("stopping")
    assert.deepEqual(completion.suggest('st'), ['stop', 'stopped', 'stopping', 'stoop']);
  });
});


describe('count', () => {
  beforeEach ( () => {
    completion = new CompleteMe;
  });
  it('count should be a method that counts words in array accurately', () => {

    assert.isFunction(completion.count);
    completion.count();
    assert.equal(completion.count(), 0);
    completion.insert('Nelly');
    completion.insert('Duke');
    completion.insert('Iggy');
    assert.equal(completion.count(), 3);
  });


  it('should cot count duplicate words', () => {

    expect(completion.count()).to.equal(0);
    completion.insert('monday');
    expect(completion.count()).to.equal(1);
    completion.insert('monday');
    expect(completion.count()).to.equal(1);
  });
});


describe('populate', () => {

  it('should have bunch of words inserted from the dictionary', (done) =>{
    completion = new CompleteMe;
    completion.populate(dictionary);
    expect(completion.counter).to.equal(234371);
    done();
  }).timeout(25000);
});


});
