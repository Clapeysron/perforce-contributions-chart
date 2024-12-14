import addWeeks from 'date-fns/addWeeks';
import format from 'date-fns/format';
import getMonth from 'date-fns/getMonth';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import parseISO from 'date-fns/parseISO';
import addDays from 'date-fns/addDays';
import startOfWeek from 'date-fns/startOfWeek';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      return function () {
        if (i >= o.length) return {
          done: true
        };
        return {
          done: false,
          value: o[i++]
        };
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  it = o[Symbol.iterator]();
  return it.next.bind(it);
}

var themes = {
  __test__: {
    background: "#ffffff",
    text: "#ffffff",
    meta: "#ffffff",
    grade4: "#196127",
    grade3: "#239a3b",
    grade2: "#7bc96f",
    grade1: "#c6e48b",
    grade0: "#ebedf0"
  },
  standard: {
    background: "#ffffff",
    text: "#000000",
    meta: "#666666",
    grade4: "#216e39",
    grade3: "#30a14e",
    grade2: "#40c463",
    grade1: "#9be9a8",
    grade0: "#ebedf0"
  },
  classic: {
    background: "#ffffff",
    text: "#000000",
    meta: "#666666",
    grade4: "#196127",
    grade3: "#239a3b",
    grade2: "#7bc96f",
    grade1: "#c6e48b",
    grade0: "#ebedf0"
  },
  githubDark: {
    background: "#101217",
    text: "#ffffff",
    meta: "#dddddd",
    grade4: "#27d545",
    grade3: "#10983d",
    grade2: "#00602d",
    grade1: "#003820",
    grade0: "#161b22"
  },
  halloween: {
    background: "#ffffff",
    text: "#000000",
    meta: "#666666",
    grade4: "#03001C",
    grade3: "#FE9600",
    grade2: "#FFC501",
    grade1: "#FFEE4A",
    grade0: "#ebedf0"
  },
  teal: {
    background: "#ffffff",
    text: "#000000",
    meta: "#666666",
    grade4: "#458B74",
    grade3: "#66CDAA",
    grade2: "#76EEC6",
    grade1: "#7FFFD4",
    grade0: "#ebedf0"
  },
  leftPad: {
    background: "#000000",
    text: "#ffffff",
    meta: "#999999",
    grade4: "#F6F6F6",
    grade3: "#DDDDDD",
    grade2: "#A5A5A5",
    grade1: "#646464",
    grade0: "#2F2F2F"
  },
  dracula: {
    background: "#181818",
    text: "#f8f8f2",
    meta: "#666666",
    grade4: "#ff79c6",
    grade3: "#bd93f9",
    grade2: "#6272a4",
    grade1: "#44475a",
    grade0: "#282a36"
  },
  blue: {
    background: "#181818",
    text: "#C0C0C0",
    meta: "#666666",
    grade4: "#4F83BF",
    grade3: "#416895",
    grade2: "#344E6C",
    grade1: "#263342",
    grade0: "#222222"
  },
  panda: {
    background: "#2B2C2F",
    text: "#E6E6E6",
    meta: "#676B79",
    grade4: "#FF4B82",
    grade3: "#19f9d8",
    grade2: "#6FC1FF",
    grade1: "#34353B",
    grade0: "#242526"
  },
  sunny: {
    background: "#ffffff",
    text: "#000000",
    meta: "#666666",
    grade4: "#a98600",
    grade3: "#dab600",
    grade2: "#e9d700",
    grade1: "#f8ed62",
    grade0: "#fff9ae"
  },
  pink: {
    background: "#ffffff",
    text: "#000000",
    meta: "#666666",
    grade4: "#61185f",
    grade3: "#a74aa8",
    grade2: "#ca5bcc",
    grade1: "#e48bdc",
    grade0: "#ebedf0"
  },
  YlGnBu: {
    // http://colorbrewer2.org/#type=sequential&scheme=YlGnBu&n=5
    background: "#ffffff",
    text: "#000000",
    meta: "#666666",
    grade4: "#253494",
    grade3: "#2c7fb8",
    grade2: "#41b6c4",
    grade1: "#a1dab4",
    grade0: "#ebedf0"
  },
  solarizedDark: {
    background: "#002b36",
    text: "#93a1a1",
    meta: "#586e75",
    grade4: "#d33682",
    grade3: "#b58900",
    grade2: "#2aa198",
    grade1: "#268bd2",
    grade0: "#073642"
  },
  solarizedLight: {
    background: "#fdf6e3",
    text: "#586e75",
    meta: "#93a1a1",
    grade4: "#6c71c4",
    grade3: "#dc322f",
    grade2: "#cb4b16",
    grade1: "#b58900",
    grade0: "#eee8d5"
  }
};

function getPixelRatio() {
  if (typeof window === "undefined") {
    return 1;
  }

  return window.devicePixelRatio || 1;
}

var DATE_FORMAT = "yyyy-MM-dd";
var boxWidth = 10;
var boxMargin = 2;
var textHeight = 15;
var defaultFontFace = "IBM Plex Mono";
var headerHeight = 60;
var canvasMargin = 20;
var yearHeight = textHeight + (boxWidth + boxMargin) * 8 + canvasMargin;
var scaleFactor = /*#__PURE__*/getPixelRatio();

function getTheme(opts) {
  var _themes$name;

  var themeName = opts.themeName,
      customTheme = opts.customTheme;

  if (customTheme) {
    var _customTheme$backgrou, _customTheme$text, _customTheme$meta, _customTheme$grade, _customTheme$grade2, _customTheme$grade3, _customTheme$grade4, _customTheme$grade5;

    return {
      background: (_customTheme$backgrou = customTheme.background) != null ? _customTheme$backgrou : themes.standard.background,
      text: (_customTheme$text = customTheme.text) != null ? _customTheme$text : themes.standard.text,
      meta: (_customTheme$meta = customTheme.meta) != null ? _customTheme$meta : themes.standard.meta,
      grade4: (_customTheme$grade = customTheme.grade4) != null ? _customTheme$grade : themes.standard.grade4,
      grade3: (_customTheme$grade2 = customTheme.grade3) != null ? _customTheme$grade2 : themes.standard.grade3,
      grade2: (_customTheme$grade3 = customTheme.grade2) != null ? _customTheme$grade3 : themes.standard.grade2,
      grade1: (_customTheme$grade4 = customTheme.grade1) != null ? _customTheme$grade4 : themes.standard.grade1,
      grade0: (_customTheme$grade5 = customTheme.grade0) != null ? _customTheme$grade5 : themes.standard.grade0
    };
  }

  var name = themeName != null ? themeName : "standard";
  return (_themes$name = themes[name]) != null ? _themes$name : themes.standard;
}

function getDateInfo(data, date) {
  return data.contributions.find(function (contrib) {
    return contrib.date === date;
  });
}

function drawYear(ctx, opts) {
  var year = opts.year,
      _opts$offsetX = opts.offsetX,
      offsetX = _opts$offsetX === void 0 ? 0 : _opts$offsetX,
      _opts$offsetY = opts.offsetY,
      offsetY = _opts$offsetY === void 0 ? 0 : _opts$offsetY,
      data = opts.data,
      _opts$fontFace = opts.fontFace,
      fontFace = _opts$fontFace === void 0 ? defaultFontFace : _opts$fontFace;
  var theme = getTheme(opts);
  var today = new Date();
  var thisYear = format(today, "yyyy");
  var lastDate = year.year === thisYear ? today : parseISO(year.range.end);
  var firstRealDate = parseISO(year.year + "-01-01");
  var firstDate = startOfWeek(firstRealDate, {
    weekStartsOn: 1
  });
  var nextDate = firstDate;
  var firstRowDates = [];
  var graphEntries = [];

  while (isBefore(nextDate, lastDate)) {
    var date = format(nextDate, DATE_FORMAT);
    firstRowDates.push({
      date: date,
      info: getDateInfo(data, date)
    });
    nextDate = addWeeks(nextDate, 1);
  }

  graphEntries.push(firstRowDates);

  var _loop = function _loop(i) {
    graphEntries.push(firstRowDates.map(function (dateObj) {
      var date = format(addDays(parseISO(dateObj.date), i), DATE_FORMAT);
      return {
        date: date,
        info: getDateInfo(data, date)
      };
    }));
  };

  for (var i = 1; i < 7; i += 1) {
    _loop(i);
  }

  if (!opts.skipHeader) {
    ctx.textBaseline = "hanging";
    ctx.fillStyle = theme.text;
    ctx.font = "10px '" + fontFace + "'";
    ctx.fillText(year.year + ": " + year.total + " Contribution" + (year.total === 1 ? "" : "s") + (thisYear === year.year ? " (so far)" : ""), offsetX, offsetY - 17);
  }

  for (var y = 0; y < graphEntries.length; y += 1) {
    for (var x = 0; x < graphEntries[y].length; x += 1) {
      var day = graphEntries[y][x];
      var cellDate = parseISO(day.date);

      if (isBefore(cellDate, firstRealDate) || isAfter(cellDate, lastDate) || !day.info) {
        continue;
      } // @ts-ignore


      var color = theme["grade" + day.info.intensity];
      ctx.fillStyle = color;
      ctx.fillRect(offsetX + (boxWidth + boxMargin) * x, offsetY + textHeight + (boxWidth + boxMargin) * y, 10, 10);
    }
  } // Draw Month Label


  var lastCountedMonth = 0;

  for (var _y = 0; _y < graphEntries[0].length; _y += 1) {
    var _date = parseISO(graphEntries[0][_y].date);

    var month = getMonth(_date) + 1;
    var firstMonthIsDec = month === 12 && _y === 0;
    var monthChanged = month !== lastCountedMonth;

    if (!opts.skipAxisLabel && monthChanged && !firstMonthIsDec) {
      ctx.fillStyle = theme.meta;
      ctx.fillText(format(_date, "MMM"), offsetX + (boxWidth + boxMargin) * _y, offsetY);
      lastCountedMonth = month;
    }
  }
}

function drawMetaData(ctx, opts) {
  var username = opts.username,
      width = opts.width,
      height = opts.height,
      footerText = opts.footerText,
      data = opts.data,
      _opts$fontFace2 = opts.fontFace,
      fontFace = _opts$fontFace2 === void 0 ? defaultFontFace : _opts$fontFace2;
  var theme = getTheme(opts);
  ctx.fillStyle = theme.background;
  ctx.fillRect(0, 0, width, height);

  if (footerText) {
    ctx.fillStyle = theme.meta;
    ctx.textBaseline = "bottom";
    ctx.font = "10px '" + fontFace + "'";
    ctx.fillText(footerText, canvasMargin, height - 5);
  } // chart legend


  var themeGrades = 5;
  ctx.fillStyle = theme.text;
  ctx.fillText("Less", width - canvasMargin - (boxWidth + boxMargin) * themeGrades - 55, 37);
  ctx.fillText("More", width - canvasMargin - 25, 37);

  for (var x = 0; x < 5; x += 1) {
    // @ts-ignore
    ctx.fillStyle = theme["grade" + x];
    ctx.fillRect(width - canvasMargin - (boxWidth + boxMargin) * themeGrades - 27, textHeight + boxWidth, 10, 10);
    themeGrades -= 1;
  }

  ctx.fillStyle = theme.text;
  ctx.textBaseline = "hanging";
  ctx.font = "20px '" + fontFace + "'";
  ctx.fillText("@" + username + " on Perforce", canvasMargin, canvasMargin);
  var totalContributions = 0;

  for (var _iterator = _createForOfIteratorHelperLoose(data.years), _step; !(_step = _iterator()).done;) {
    var year = _step.value;
    totalContributions += year.total;
  }

  ctx.font = "10px '" + fontFace + "'";
  ctx.fillText("Total Contributions: " + totalContributions, canvasMargin, canvasMargin + 30);
  ctx.beginPath();
  ctx.moveTo(canvasMargin, 55 + 10);
  ctx.lineTo(width - canvasMargin, 55 + 10);
  ctx.strokeStyle = theme.grade0;
  ctx.stroke();
}

function drawContributions(canvas, opts) {
  var data = opts.data;
  var headerOffset = 0;

  if (!opts.skipHeader) {
    headerOffset = headerHeight;
  }

  var height = data.years.length * yearHeight + canvasMargin + headerOffset + 10;
  var width = 53 * (boxWidth + boxMargin) + canvasMargin * 2;
  canvas.width = width * scaleFactor;
  canvas.height = height * scaleFactor;
  var ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not get 2d context from Canvas");
  }

  ctx.scale(scaleFactor, scaleFactor);
  ctx.textBaseline = "hanging";

  if (!opts.skipHeader) {
    drawMetaData(ctx, _extends({}, opts, {
      width: width,
      height: height,
      data: data
    }));
  }

  data.years.forEach(function (year, i) {
    var offsetY = yearHeight * i + canvasMargin + headerOffset + 10;
    var offsetX = canvasMargin;
    drawYear(ctx, _extends({}, opts, {
      year: year,
      offsetX: offsetX,
      offsetY: offsetY,
      data: data
    }));
  });
}

export { drawContributions, themes };
//# sourceMappingURL=github-contributions-canvas.esm.js.map
