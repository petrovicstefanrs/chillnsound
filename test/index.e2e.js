import testcafe from 'testcafe';

fixture`Home Page`
  .page`../src/index.html`;

test('should load the home page', async (t) => {
  await t.click('.play');
});
