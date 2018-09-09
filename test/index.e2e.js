import testcafe from 'testcafe';

fixture`Home Page`
  .page`../index.html`;

test('should load the home page', async (t) => {
  await t.click('.play');
});
