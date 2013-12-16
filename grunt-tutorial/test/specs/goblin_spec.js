'use strict';

/*globals Goblin:false*/

describe('Gobline', function () {
  it('has name', function () {
    var goblin = new Goblin('Dakka');
    expect(goblin.name).toEqual('Dakka');
  });

  it('speaks', function () {});
});