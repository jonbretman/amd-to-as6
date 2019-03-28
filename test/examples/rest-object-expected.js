import varNameForA from 'some/path/to/a';
import varNameForB from 'some/path/to/b';
import 'some/path/to/c';

// do something with dep A
varNameForA();

// do something with dep B
varNameForB();

var a = {
    foo: 1
};
var b = {...a, bar: 2
};
