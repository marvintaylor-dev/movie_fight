//This function is for async code which uses a timeout. The timeout will cause the test to fail without it.
const waitFor = (selector) => {
    return new Promise((resolve, reject) => {
        //save interval and timeout values to a variable to make using the value possible.
        const interval = setInterval(() => {
            //if the selector passed into waitFor exists
            if (document.querySelector(selector)) {
                //clear the interval timer and the timeout rejection
                clearInterval(interval)
                clearTimeout(timeout)
                //resolve the promise successfully
                resolve()
            }
            //try to resolve every 50 ms
        }, 50);

        const timeout = setTimeout(() => {
            //if we reject we want to stop the interval from continuously running
            clearInterval(interval)
            //if we wait for 2 seconds reject.
            reject();
        }, 2000);
    })
}


//beforeEach is a mocha 'hook' which allows us to set a condition, which in this case, resets our code or clears any inputs.
beforeEach(() => {
    document.querySelector('#target').innerHTML = '';
    createAutoComplete({
        root: document.querySelector('#target'),
        fetchData() {
            return [
                { Title: 'Avengers' },
                { Title: 'Not Avengers' },
                { Title: 'Some other movie' },
            ];
        },
        renderOption(movie) {
            return movie.Title;
        }
    })
})

//Test to see if our dropdown is closed upon page load.
it('Dropdown Starts Closed', () => {
    const dropdown = document.querySelector('.dropdown');
    //tests whether our dropdown is open or closed upon page load
    assert.notInclude(dropdown.className, 'is-active', "is-active should not exist")
});

//Test to see if our dropdown opens after input has been given
it('After searching, dropdown opens up', async () => {
    //automatically place the value of 'Avengers' inside of the input so we don't have to manually type.
    const input = document.querySelector('input')
    input.value = 'Avengers'
    //triggers an event because simply changing the value will not trigger the event we are trying to test for.
    input.dispatchEvent(new Event('input'));

    //see top of page for functionality. We insert dropdown-item into the waitFor function because these are the html items connected to the dropdown menu. They only appear once a successful call to the API has been made.
    await waitFor('.dropdown-item')

    const dropdown = document.querySelector('.dropdown');
    //tests whether our dropdown is open or closed upon input
    assert.include(dropdown.className, 'is-active', "is-active should exist")
});


//test whether we get our results after searching
it('After searching, displays some results', async () => {
    //automatically place the value of 'Avengers' inside of the input so we don't have to manually type.
    const input = document.querySelector('input')
    input.value = 'Avengers'
    //triggers an event because simply changing the value will not trigger the event we are trying to test for.
    input.dispatchEvent(new Event('input'));

    //see top of page for functionality. We insert dropdown-item into the waitFor function because these are the html items connected to the dropdown menu. They only appear once a successful call to the API has been made.
    await waitFor('.dropdown-item')

    const items = document.querySelectorAll('.dropdown-item');

    assert.strictEqual(items.length, 3, 'Expected item amount to equal 3')
})