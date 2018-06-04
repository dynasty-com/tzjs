const test = require('tape')
const { getOffset } = require('.')

var tzinfo = [
  ['UTC', 1483272000000, 0],

  ['Pacific/Midway', 1483272000000, 660],
  ['Pacific/Honolulu', 1483272000000, 600],
  ['America/Anchorage', 1483272000000, 540],
  ['America/Los_Angeles', 1483272000000, 480],
  ['America/Denver', 1483272000000, 420],
  ['America/Mexico_City', 1483272000000, 360],
  ['America/New_York', 1483272000000, 300],
  ['America/Curacao', 1483272000000, 240],
  ['America/Argentina/Buenos_Aires', 1483272000000, 180],
  ['America/Noronha', 1483272000000, 120],
  ['Atlantic/Azores', 1483272000000, 60],
  ['Africa/Casablanca', 1483272000000, 0],
  ['Africa/Lagos', 1483272000000, -60],
  ['Africa/Johannesburg', 1483272000000, -120],
  ['Europe/Moscow', 1483272000000, -180],
  ['Asia/Dubai', 1483272000000, -240],
  ['Asia/Ashgabat', 1483272000000, -300],
  ['Asia/Dhaka', 1483272000000, -360],
  ['Asia/Bangkok', 1483272000000, -420],
  ['Asia/Harbin', 1483272000000, -480],
  ['Asia/Seoul', 1483272000000, -540],
  ['Australia/Brisbane', 1483272000000, -600],
  ['Pacific/Norfolk', 1483272000000, -660],
  ['Pacific/Funafuti', 1483272000000, -720],

  ['Australia/Melbourne', 1452859200000, -660],
  ['Australia/Melbourne', 1455537600000, -660],
  ['Australia/Melbourne', 1458043200000, -660],
  ['Australia/Melbourne', 1460725200000, -600],
  ['Australia/Melbourne', 1463317200000, -600],
  ['Australia/Melbourne', 1465995600000, -600],
  ['Australia/Melbourne', 1468587600000, -600],
  ['Australia/Melbourne', 1471266000000, -600],
  ['Australia/Melbourne', 1473944400000, -600],
  ['Australia/Melbourne', 1476532800000, -660],
  ['Australia/Melbourne', 1479211200000, -660],
  ['Australia/Melbourne', 1481803200000, -660],

  ['Australia/Eucla', 1483272000000, -525],
  ['Antarctica/Davis', -1472640600000, 0],
  ['Antarctica/Davis', 1483272000000, -420],
  ['Asia/Tehran', -1472640600000, -205],
  ['Asia/Tehran', 0, -210],
  ['Asia/Tehran', 946684800000, -210],
  ['Asia/Tehran', 1780725966000, -270],
  ['Pacific/Apia', -1472640600000, 690],
  ['Pacific/Apia', 946684800000, 660],
  ['Pacific/Apia', 1456833600000, -840],
  ['Pacific/Apia', 1780725966000, -780],
  ['Pacific/Chatham', -1472640600000, -735],
  ['Pacific/Chatham', 0, -765],
  ['Pacific/Chatham', 1456833600000, -825],
  ['Pacific/Chatham', 1780725966000, -765],
  ['Africa/Monrovia', -2208988800000, 44],
  ['Africa/Monrovia', -63158400000, 45],
  ['Africa/Monrovia', 1483272000000, 0]
]

tzinfo.forEach(function (scenario) {
  const tz = scenario[0]
  const instant = new Date(scenario[1])
  const expectedMins = scenario[2]

  test(tz + ' at ' + instant.toISOString(), function (t) {
    t.equal(getOffset(tz, instant), expectedMins)
    t.end()
  })
})
