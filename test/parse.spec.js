const parser = require("../parser");

test("parse atomic", () => {
  const config = {
    atomic: {
      text: {
        color: {
          "-red": "red"
        }
      },
      m: {
        "margin-top$margin-bottom": {
          "y-10": "10px"
        },
        "margin-left$margin-right": {
          "x-10": "10px"
        }
      }
    }
  };
  expect(parser.parseAtomic(config.atomic)).toBe(
    ".text-red{color:red}.my-10{margin-top:10px;margin-bottom:10px}.mx-10{margin-left:10px;margin-right:10px}"
  );
});

test("parse utils", () => {
  const config = {
    utils: {
      text: {
        css: {
          color: "red"
        },
        actions: {
          hover: {
            color: "green"
          }
        }
      }
    }
  };
  expect(parser.parseUtils(config.utils)).toBe(
    ".text{color:red}.text:hover{color:green}"
  );
});
