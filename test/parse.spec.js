const parse = require('../parse')


test('parse atomic', () => {
    const config = {
        atomic: {
            text: {
                color: {
                    "-red": "red"
                }
            }
        }
    }
    expect(parse(config)).toBe('.text-red{color:red}');
});

test('parse utils', () => {
    const config = {
        utils: {
            text: {
                css: {
                    "color": "red"
                },
                actions: {
                    hover: {
                        color: 'green'
                    }
                }
            }
        }
    }
    expect(parse(config)).toBe('.text{color:red}.text:hover{color:green}');
});