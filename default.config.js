module.exports = {
  atomic: {
    $4: {
      width: {
        "w-full": "10%",
        "w-auto": "auto",
        "w-half": "50%"
      },
      height: {
        "h-full": "100%",
        "h-auto": "auto",
        "h-half": "50%"
      }
    },
    align: {
      "align-content": {
        "-content-center": "center",
        "-content-start": "start",
        "-content-end": "end",
        "-content-between": "space-between",
        "-content-around": "space-around",
        "-content-evenly": "space-evenly"
      },
      "align-items": {
        "-items-start": "flex-start",
        "-items-end": "flex-end",
        "-items-center": "center",
        "-items-baseline": "baseline",
        "-items-stretch": "stretch"
      },
      "align-self": {
        "-self-auto": "auto",
        "-self-start": "flex-start",
        "-self-end": "flex-end",
        "-self-center": "center",
        "-self-stretch": "stretch",
        "-self-baseline": "baseline"
      }
    },
    text: {
      color: {
        "-white": "#fff",
        "-black": "#000",
        "-red": "red",
        "-blue": "blue",
        "-green": "green"
      },
      "text-align": {
        "-left": "left",
        "-right": "right",
        "-center": "center"
      }
    },
    f: {
      "font-size": {
        "s-12": "12px",
        "s-14": "14px",
        "s-16": "16px",
        "s-18": "18px",
        "s-20": "20px",
        "s-24": "24px"
      },
      "font-weight": {
        "w-1": 500,
        "w-2": 600,
        "w-3": 700
      }
    },
    p: {
      padding: {
        "-10": "10px",
        "-20": "20px"
      },
      "padding-left": {
        "l-10": "10px",
        "l-20": "20px"
      },
      "padding-right": {
        "r-10": "10px",
        "r-20": "20px"
      },
      "padding-top": {
        "t-10": "10px",
        "t-20": "20px"
      },
      "padding-bottom": {
        "b-10": "10px",
        "b-20": "20px"
      },
      "padding-top$padding-bottom": {
        "y-10!": "10px",
        "y-20!": "20px"
      },
      "padding-left$padding-right": {
        "x-10": "10px",
        "x-20": "20px"
      }
    },
    m: {
      margin: {
        "-10": "10px",
        "-20": "20px"
      },
      "margin-left": {
        "l-10": "10px",
        "l-20": "20px"
      },
      "margin-right": {
        "r-10": "10px",
        "r-20": "20px"
      },
      "margin-top": {
        "t-10": "10px",
        "t-20": "20px"
      },
      "margin-bottom": {
        "b-10": "10px",
        "b-20": "20px"
      },
      "margin-top$margin-bottom": {
        "y-10": "10px",
        "y-20": "20px"
      },
      "margin-left$margin-right": {
        "x-10": "10px",
        "x-20": "20px"
      }
    },
    bg: {
      "background-color": {
        "-white": "#fff",
        "-yellow": "yellow",
        "-red": "red",
        "-blue": "blue",
        "-green": "green"
      }
    },
    b: {
      "border-radius": {
        "r-2": "2px",
        "r-4": "4px",
        "r-8": "8px",
        "r-half": "50%",
        "r-full": "100%"
      },
      "border-width": {
        "w-1": "1px",
        "w-2": "2px"
      },
      "border-style": {
        "s-solid": "solid",
        "-none": "none"
      },
      "border-color": {
        "c-1": "#eeeeee",
        "c-2": "#bbbbbb"
      }
    },
    shadow: {
      "box-shadow": {
        "-none": "none",
        "-1": "0 4px 14px 0 rgba(0, 0, 0,.04), 0 12px 16px 16px rgba(0, 0, 0,.04), 0 10px 16px 0 rgba(0, 0, 0,.04)",
        "-2": "0 0 8px 0 rgba(0,0,0,0.04), 0 6px 12px 12px rgba(0,0,0,0.04), 0 6px 10px 0 rgba(0,0,0,0.08)",
        "-3": "0 -2px 4px 0 rgba(0, 0, 0,.02), 0 2px 6px 6px rgba(0, 0, 0,.02), 0 2px 6px 0 rgba(0, 0, 0,.04)",
        "-4": "0 2px 4px 0 rgba(0, 0, 0,.01), 0 3px 6px 3px rgba(0, 0, 0,.01), 0 2px 6px 0 rgba(0, 0, 0,.03)"
      }
    },
    $1: {
      display: {
        block: "block",
        "inline-block": "inline-block",
        inline: "inline",
        flex: "flex",
        grid: "grid",
        hidden: "none"
      }
    },
    float: {
      float: {
        "-left": "left",
        "-right": "right",
        "-none": "none"
      }
    },
    box: {
      "box-sizing": {
        "-border": "border-box",
        "-content": "content-box"
      }
    },
    clear: {
      clear: {
        "-left": "left",
        "-right": "right",
        "-both": "both",
        "-none": "none"
      }
    },
    overflow: {
      overflow: {
        "-auto": "auto",
        "-hidden": "hidden",
        "-visible": "visible",
        "-scroll": "scroll"
      },
      "overflow-x": {
        "-x-auto": "auto",
        "-x-hidden": "hidden",
        "-x-visible": "visible",
        "-x-scroll": "scroll"
      },
      "overflow-y": {
        "-y-auto": "auto",
        "-y-hidden": "hidden",
        "-y-visible": "visible",
        "-y-scroll": "scroll"
      }
    },
    $2: {
      position: {
        static: "static",
        fixed: "fixed",
        absolute: "absolute",
        relative: "relative",
        sticky: "sticky"
      }
    },
    $3: {
      visibility: {
        visible: "visible",
        invisible: "hidden"
      }
    },
    z: {
      "z-index": {
        "-0": 0,
        "-999": 999,
        "-auto": "auto"
      }
    },
    flex: {
      "flex-direction": {
        "-row": "row",
        "-row-reverse": "row-reverse",
        "-col": "column",
        "-col-reverse": "col-reverse"
      },
      flex: {
        "-1": "1 1 0%",
        "-auto": "1 1 auto",
        "-initial": "0 1 auto",
        "-none": "none"
      }
    },
    justify: {
      "justify-content": {
        "-start": "flex-start",
        "-end": "flex-end",
        "-center": "center",
        "-between": "space-between",
        "-around": "space-around",
        "-evenly": "space-evenly"
      },
      "justify-items": {
        "-items-start": "start",
        "-items-end": "end",
        "-items-center": "center",
        "-items-stretch": "stretch"
      },
      "justify-self": {
        "-self-auto": "auto",
        "-self-start": "start",
        "-self-end": "end",
        "-self-center": "center",
        "-self-stretch": "stretch"
      }
    },
    whitespace: {
      "white-space": {
        "-normal": "normal",
        "-nowrap": "nowrap",
        "-pre": "pre",
        "-pre-line": "pre-line",
        "-pre-wrap": "pre-wrap"
      }
    },
    cursor: {
      cursor: {
        "-auto": "auto",
        "-default": "default",
        "-pointer": "pointer",
        "-not-allowed": "not-allowed",
        "-move": "move"
      }
    }
  },
  utils: {
    card: {
      css: {
        "border-radius": "4px",
        padding: "12px",
        "background-color": "#fff",
        color: "#000",
        "box-shadow":
          "0 4px 14px 0 rgba(0, 0, 0,.04), 0 12px 16px 16px rgba(0, 0, 0,.04), 0 10px 16px 0 rgba(0, 0, 0,.04)"
      },
      actions: {
        hover: {
          color: "green"
        }
      }
    }
  }
};
