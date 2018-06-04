module.exports = { getOffset, fmt, toDate }

const _formatters = {}

// Returns the current offset from UTC, in minutes, for a given time and timezone.
//
// Eg getTimezoneOffset(date, "Europe/Vienna") returns 60 or 120, depending on DST.
function getOffset (timeZone, date) {
  // Crazy code alert.
  // As far as I can tell, the *only* browser API that gives timezone offsets is Intl.DateTimeFormat
  // That means the only way to get a timezone offset, natively, is to format in the target tz, format in UTC, and subtract.
  const d = toDate(date)
  const utcStr = getPseudoISO(d, 'UTC')
  const localStr = getPseudoISO(d, timeZone)
  const diffMs = new Date(utcStr).getTime() - new Date(localStr).getTime()
  return Math.ceil(diffMs / 1000 / 60)
}

// Workaround a browser API error:
//
// Modern browsers expose ISO timezones, but//only* for string formatting of
// dates. Therefore, there is no clean way to get a timezone offset for, say,
// "America/Los_Angeles" at a particular moment on the timeline.
//
// Libraries like moment.js work around this by including massive tables of All
// the world's timezones. This is wrong. Here we do it right:
//
// Returns eg "2020-01-01T00:00:00Z", but NOT actually in UTC.
// Instead, the returned time is local to the specified timezone.
function getPseudoISO (date, timeZone) {
  // Africaans "af-ZA" with 2-digit everything roughly returns ISO
  const str = fmt({
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone
  }, 'af-ZA', timeZone).format(date)
  if (str.length !== 19 || str[10] !== ' ') {
    throw new Error('Pseudo-ISO failed, got: ' + str)
  }
  return str.replace(' ', 'T') + 'Z'
}

// Memoizes an Intl.DateTimeFormat.
//
// The constructor is expensive, so memoizing can be important for performance.
//
// Returns new Intl.DateTimeFormat(locale, opts)
function fmt (opts, locale, key) {
  key = key || ((locale || '') + JSON.stringify(opts))
  if (_formatters[key] == null) {
    _formatters[key] = new Intl.DateTimeFormat(locale, opts)
  }
  return _formatters[key]
}

// Takes a string like "2020-01-01T00:00:00Z" or Date, returns a Date
function toDate (date) {
  if (date instanceof Date) {
    return date
  }
  return new Date(date)
}
