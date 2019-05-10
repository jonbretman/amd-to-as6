define((require) => {
    const re = require('some-package');

    class A {
        test = () => {
            return true;
        }

        method() {
            return false;
        }
    }

    return A;
});
