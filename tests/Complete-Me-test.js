import { expect, assert } from 'chai';
import CompleteMe from '../scripts/Complete-Me';
let completion;

describe ('Complete-Me tests', () => {

  beforeEach ( () => {
    completion = new CompleteMe;
  });

  it('should be an object {}', () =>  {

    assert.isObject(completion);
  });

  it('insert should be a method that takes in an argument and inserts into the array', () => {

    assert.isFunction(completion.insert);
    completion.insert('Smelly Nelly');
    assert.equal(completion.words.length, true);
    assert.equal(completion.words['Smelly Nelly']);
  });

  it('count should be a method that counts words in array accurately', () => {

    assert.isFunction(completion.count);
    completion.count();
    assert.equal(completion.countWords, 0);
    completion.insert('Nelly');
    completion.insert('Duke');
    completion.insert('Iggy');
    assert.equal(completion.countWords, 3);
  });


});
