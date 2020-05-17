export function convertMinutesToContinuousDays(minutes) {
  let h = Math.floor(minutes / 60);
  let d = Math.floor(h / 24);
  h = h - d * 24;
  let m = Math.floor(minutes % 60);
  let s = ((minutes - d * 24 * 60 - h * 60 - m) * 60).toFixed(2);

  let finalStringArray = [];

  if (d > 0) finalStringArray.push(`${d.toFixed(0)} dias`);
  if (h > 0) finalStringArray.push(`${h.toFixed(0)} horas`);
  if (m > 0) finalStringArray.push(`${m.toFixed(0)} minutos`);
  if (s > 0) finalStringArray.push(`${parseFloat(s).toFixed(0)} segundos`);

  return finalStringArray.slice(0, -1).join(', ') + ' e ' + finalStringArray.slice(-1);
}

function groupBy(xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}

export function sortVideosConsideringDailyAvailability(videos, dailyAvailability) {
  let sortedVideos = [];
  let actualDailyAvailability = 0;
  let actualDailyAvailabilityMinutes = dailyAvailability.sunday;

  let day = 1;

  function changeDailyAvailability() {
    switch (actualDailyAvailability) {
      case 0:
        actualDailyAvailabilityMinutes = dailyAvailability.monday;
        actualDailyAvailability = 1;
        break;
      case 1:
        actualDailyAvailabilityMinutes = dailyAvailability.tuesday;
        actualDailyAvailability = 2;
        break;
      case 2:
        actualDailyAvailabilityMinutes = dailyAvailability.wednesday;
        actualDailyAvailability = 3;
        break;
      case 3:
        actualDailyAvailabilityMinutes = dailyAvailability.thursday;
        actualDailyAvailability = 4;
        break;
      case 4:
        actualDailyAvailabilityMinutes = dailyAvailability.friday;
        actualDailyAvailability = 5;
        break;
      case 5:
        actualDailyAvailabilityMinutes = dailyAvailability.saturday;
        actualDailyAvailability = 6;
        break;
      case 6:
        actualDailyAvailabilityMinutes = dailyAvailability.sunday;
        actualDailyAvailability = 0;
        break;
      default:
        break;
    }
    day++;
  }

  videos.forEach((video, index) => {
    if (video.duration.minutes <= actualDailyAvailabilityMinutes) {
      sortedVideos.push({video, day: day, weekday: actualDailyAvailability});
      actualDailyAvailabilityMinutes -= video.duration.minutes;
    } else {
      do {
        changeDailyAvailability();

        if (video.duration.minutes > actualDailyAvailabilityMinutes)
          sortedVideos.push({video: null, day: day, weekday: actualDailyAvailability});
      } while (video.duration.minutes > actualDailyAvailabilityMinutes);

      sortedVideos.push({video, day: day, weekday: actualDailyAvailability});
      actualDailyAvailabilityMinutes -= video.duration.minutes;
    }
  });

  const _sortedVideos = groupBy(sortedVideos, 'day');
  let _sortedVideosArray = [];
  for (let key in _sortedVideos) {
    _sortedVideosArray.push({
      day: key,
      weekday: _sortedVideos[key][0].weekday,
      videos: _sortedVideos[key],
    });
  }

  _sortedVideosArray = _sortedVideosArray.map((day) => {
    if (day.videos.some((video) => video.video === null))
      return {
        ...day,
        videos: [],
        dayAvailability: dailyAvailability[Object.keys(dailyAvailability)[day.weekday]],
        dayVideosDuration: 0,
      };
    else {
      let dayVideosDuration = 0;

      day.videos.forEach((video) => {
        dayVideosDuration += video.video.duration.minutes;
      });

      return {
        ...day,
        videos: day.videos.map((video) => video.video),
        dayAvailability: dailyAvailability[Object.keys(dailyAvailability)[day.weekday]],
        dayVideosDuration,
      };
    }
  });

  if (
    _sortedVideosArray
      .map(function (e) {
        return e.day;
      })
      .indexOf('1') === -1
  ) {
    _sortedVideosArray.unshift({
      day: '1',
      dayAvailability: dailyAvailability.sunday,
      dayVideosDuration: 0,
      videos: [],
      weekday: 0,
    });
  }

  return {
    days: _sortedVideosArray.length,
    videosPerDay: _sortedVideosArray,
  };
}

export function countKeyWords(sentence) {
  var list = sentence.split(' ');
  var words = {};
  for (var i = 0; i < list.length; i++) {
    var word = list[i];
    if (words.hasOwnProperty(word)) {
      words[word]++;
    } else {
      words[word] = 1;
    }
  }
  return words;
}
