const getLabelDiff = require('./get-label-diff');

const existingLabels = [{
  id: 753671647,
  url: 'https://api.github.com/repos/picter/rest-api/labels/foo',
  name: 'foo',
  color: '000000',
  default: false 
}, {
  id: 753671624,
  url: 'https://api.github.com/repos/picter/rest-api/labels/bar',
  name: 'bar',
  color: 'FF0000',
  default: false,
}, {
  id: 753671624,
  url: 'https://api.github.com/repos/picter/rest-api/labels/tar',
  name: 'tar',
  color: 'FFFF00',
  default: false,
}];

const targetLabels = [{
  name: 'foo new',
  formerNames: ['foo'],
  color: 'FF0000',
  default: false 
}, {
  name: 'bar',
  color: 'FF0000',
  default: false,
}, {
  name: 'xar',
  color: 'FF00FF',
  default: false,
}, {
  name: 'tar',
  color: 'FF00FF',
  default: false,
}];

describe('getLabelDiff', () => {
  const result = getLabelDiff(existingLabels, targetLabels)
  it('returns an object with keys `add` and `update`', () => {
    expect(Object.keys(result).sort()).toEqual(['add', 'update'])
  });

  it('adds non-existing labels to `add`', () => {
    expect(result.add).toEqual([{
      name: 'xar',
      color: 'FF00FF',
      default: false,
    }])
  });

  it('adds existing labels to `update`, if `color` or `name` changed', () => {
    expect(result.update).toEqual([{
      url: 'https://api.github.com/repos/picter/rest-api/labels/foo',
      name: 'foo new',
      color: 'FF0000',
    }, {
      url: 'https://api.github.com/repos/picter/rest-api/labels/tar',
      name: 'tar',
      color: 'FF00FF',
    }])
  });
});