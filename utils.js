
//func is the function being passed into debounce
const debounce = (func, delay = 1000) => {
    let timeoutId;
    //spread args accepts all arguments passed to the function in case there is more than one
    return (...args) => {
        //the callback inside of these brackets is what acts as a delay shield for incoming requests
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(() => {
            //apply says call the function as normal, take the arguments and pass them as separate arguments
            //apply automatically keeps track of how many arguments we have. Equivalent to arg1, arg2, arg3, etc
            func.apply(null, args);
        }, delay)
    };
}