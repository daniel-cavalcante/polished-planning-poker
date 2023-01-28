test('call console.log with "hello world"', () => {
  const consoleSpy = jest.spyOn(console, "log");

  console.log("hello world");

  expect(consoleSpy).toHaveBeenCalledWith("hello world");
});
