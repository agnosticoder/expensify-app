test('should call onSubmit prop on valid form submission', () => {
    //Now we are creating a "Test Spy" to simulate the role of actual functions in code, we can assert if the function is called it is called 5 times or it is called with required arguments
    const onSubmitSpy = jest.fn();
    onSubmitSpy('Andrew', 'Toronto');
    //Now we can assert number of assersion on this "onSubmitSpy" function
    expect(onSubmitSpy).toHaveBeenCalledWith('Andrew', 'Toronto');
});