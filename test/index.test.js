const hooks = require('../index');

describe('no stage defined', () => {

  const { pages, metalsmith } = require('./data/fixtures')
  const plugin = hooks()

  beforeAll(done => {
    plugin(pages, metalsmith, done)
  })

  it('should apply stageless default hook to all pages', () => {
    expect(pages['page1.md'].defaultHook).toEqual('no stage')
    expect(pages['page2.md'].defaultHook).toEqual('no stage')
  })

  it('should apply stageless page1 hook to page 1 only', () => {
    expect(pages['page1.md'].page1Hook).toEqual('no stage')
    expect(pages['page2.md'].page1Hook).toEqual(undefined)
  })

  it('should apply stageless page2 hook to page 2 only', () => {
    expect(pages['page1.md'].page2Hook).toEqual(undefined)
    expect(pages['page2.md'].page2Hook).toEqual('no stage')
  })

  it('should do nothing for hook with no corresponding page', () => {
    expect(pages['page3.md']).toEqual(undefined);
  })
})

describe('stage defined', () => {

  const { pages, metalsmith } = require('./data/fixtures')
  const plugin = hooks({
    stage: "stage1"
  });

  beforeAll(done => {
    plugin(pages, metalsmith, done)
  })

  it('should apply stage1 default hook to all pages', () => {
    expect(pages['page1.md'].defaultHook).toEqual('stage 1')
    expect(pages['page2.md'].defaultHook).toEqual('stage 1')
  });

  it('should apply stage1 page1 hook to page 1 only', () => {
    expect(pages['page1.md'].page1Hook).toEqual('stage 1')
    expect(pages['page2.md'].page1Hook).toEqual(undefined)
  })

  it('should apply stage1 page2 hook to page 2 only', () => {
    expect(pages['page1.md'].page2Hook).toEqual(undefined)
    expect(pages['page2.md'].page2Hook).toEqual('stage 1')
  })
})

describe('custom hooks dir', () => {

  const { pages, metalsmith } = require('./data/fixtures')
  const plugin = hooks({
    directory: 'hooks2'
  });

  beforeAll(done => {
    plugin(pages, metalsmith, done)
  })

  it('should apply default hook to all pages', () => {
    expect(pages['page1.md'].defaultHook).toEqual('hooks2')
    expect(pages['page2.md'].defaultHook).toEqual('hooks2')
  })

  it('should apply page1 hook to page 1 only', () => {
    expect(pages['page1.md'].page1Hook).toEqual('hooks2')
    expect(pages['page2.md'].page1Hook).toEqual(undefined)
  })

  it('should apply page2 hook to page 2 only', () => {
    expect(pages['page1.md'].page2Hook).toEqual(undefined)
    expect(pages['page2.md'].page2Hook).toEqual('hooks2')
  })
})
