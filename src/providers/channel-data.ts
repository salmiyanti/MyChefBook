import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {UserData} from './user-data';
import {GlobalService} from './global-service';
import {PushDataService} from './push-data-service';
// import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class ChannelData {
  data:any;
  xData:any = {
    time: [],
    limits: ["Normal", "Alert", "Warning", "Danger"],
  };
  yData:any = {
    level: [],
    counts: [0,0,0,0],
  };

  constructor(public http:Http, public user:UserData, public globalService:GlobalService, public pushData:PushDataService) {
  }

  load():any {
    return this.pushData.get().map(this.processData);
    /*if (this.data) {
     //noinspection TypeScriptUnresolvedFunction
     return Observable.of(this.data);
     } else {
     return this.pushData.get().map(this.processData);
     // return this.http.get('assets/data/data.json').map(this.processData);
     }*/
  }

  processData(data:any) {
    // just some good 'ol JS fun with objects and arrays
    // build up the data by linking speakers to sessions
    this.data = data;//JSON.parse(data);//.json();
    this.data.tracks = [];

    // loop through each day in the schedule
    this.data.schedule.forEach((day:any) => {
      // loop through each timeline group in the day
      day.groups.forEach((group:any) => {
        // loop through each session in the timeline group
        group.sessions.forEach((session:any) => {
          session.speakers = [];
          if (session.stationNumber) {
            session.stationNumber.forEach((sID:any) => {
              let speaker = this.data.speakers.find((s:any) => s.name === sID);
              if (speaker) {
                session.speakers.push(speaker);
                speaker.sessions = speaker.sessions || [];
                speaker.sessions.push(session);
              }
            });
          }

          if (session.tracks) {
            session.tracks.forEach((track:any) => {
              if (this.data.tracks.indexOf(track) < 0) {
                this.data.tracks.push(track);
              }
            });
          }
        });
      });
    });

    return this.data;
  }

  getTimeline(dayIndex:number, queryText = '', excludeTracks:any[] = [], segment = 'all') {
    return this.load().map((data:any) => {
      let day = data.schedule[dayIndex];
      day.shownSessions = 0;

      queryText = queryText.toLowerCase().replace(/,|\.|-/g, ' ');
      let queryWords = queryText.split(' ').filter(w => !!w.trim().length);

      day.groups.forEach((group:any) => {
        group.hide = true;

        group.sessions.forEach((session:any) => {
          // check if this session should show or not
          this.filterSession(session, queryWords, excludeTracks, segment);

          if (!session.hide) {
            // if this session is not hidden then this group should show
            group.hide = false;
            day.shownSessions++;
          }
        });

        // group.sessions = this.globalService.sortObjects(group.sessions, 'timeStart', true, false);
      });

      // this.globalService.alert(dayIndex.toString(), day.shownSessions, JSON.stringify(day)).present();
      return day;
    });
  }

  filterSession(session:any, queryWords:string[], excludeTracks:any[], segment:string) {

    let matchesQueryText = false;
    if (queryWords.length) {
      // of any query word is in the session name than it passes the query test
      queryWords.forEach((queryWord:string) => {
        if (session.name.toLowerCase().indexOf(queryWord) > -1) {
          matchesQueryText = true;
        }
        else if (session.location.toLowerCase().indexOf(queryWord) > -1) {
          matchesQueryText = true;
        }
        else if (session.description.toLowerCase().indexOf(queryWord) > -1) {
          matchesQueryText = true;
        }
        else if (session.stationNumber[0].toLowerCase().indexOf(queryWord) > -1) {
          matchesQueryText = true;
        }
        else if (session.timeStart.toLowerCase().indexOf(queryWord) > -1) {
          matchesQueryText = true;
        }
        else if (session.level.toLowerCase().indexOf(queryWord) > -1) {
          matchesQueryText = true;
        }
      });
    } else {
      // if there are no query words then this session passes the query test
      matchesQueryText = true;
    }

    // if any of the sessions tracks are not in the
    // exclude tracks then this session passes the track test
    let matchesTracks = false;
    session.tracks.forEach((trackName:string) => {
      if (excludeTracks.indexOf(trackName) === -1) {
        matchesTracks = true;
      }
    });

    // if the segement is 'favorites', but session is not a user favorite
    // then this session does not pass the segment test
    let matchesSegment = false;
    if (segment === 'favorites') {
      if (this.user.hasFavorite(session.timeStart)) {
        matchesSegment = true;
      }
    } else {
      matchesSegment = true;
    }

    // all tests must be true if it should not be hidden
    session.hide = !(matchesQueryText && matchesTracks && matchesSegment);
  }

  getSpeakers() {
    return this.load().map((data:any) => {
      return data.speakers.sort((a:any, b:any) => {
        let aName = a.name.split(' ').pop();
        let bName = b.name.split(' ').pop();
        return aName.localeCompare(bName);
      });
    });
  }

  getTracks() {
    return this.load().map((data:any) => {
      return data.tracks.sort();
    });
  }

  getMap() {
    return this.load().map((data:any) => {
      return data.map;
    });
  }

  getDaysLength() {
    return this.load().map((data:any) => {
      return data.schedule.length;
    });
  }

  getStationData(dayIndex:number, stationNumber:any) {
    return this.load().map((data:any) => {
      let day = data.schedule[dayIndex];

      day.xData = [];//time
      day.yData = [];//level

      day.groups.reverse();
      day.groups.forEach((group:any) => {
        var stationCount = 0;
        var levelSum = 0;
        day.xData.push(group.time);
        group.sessions.reverse();
        group.sessions.forEach((session:any) => {
          if (session.stationNumber[0] == stationNumber) {
            stationCount++;
            levelSum += session.level;
          }
        });
        // avg
        day.yData.push(levelSum / stationCount);
      });
      return day;
    });
  }


  getOverallStationData(stationNumber:any) {
    return this.load().map((data:any) => {
      var xData = function() { this.time=[] };

      data.schedule.xData = this.xData;
      data.schedule.yData = this.yData;

      let speaker = data.speakers.find((s:any) => s.stationNumber === stationNumber);

      data.schedule.forEach((day:any)=> {

        day.groups.reverse();
        day.groups.forEach((group:any) => {
          var stationCount = 0;
          var levelSum = 0;

          data.schedule.xData.time.push(group.time);

          group.sessions.reverse();
          group.sessions.forEach((session:any) => {
            if (session.stationNumber[0] == stationNumber) {
              stationCount++;
              levelSum += session.level;

              session.level = parseFloat(session.level);
              speaker.limits.normal = parseFloat(speaker.limits.normal);
              speaker.limits.alert = parseFloat(speaker.limits.alert);
              speaker.limits.warning = parseFloat(speaker.limits.warning);
              speaker.limits.danger = parseFloat(speaker.limits.danger);
              if ((session.level >= speaker.limits.normal) && (session.level < speaker.limits.alert)) {
                data.schedule.yData.counts[0]++;
              } else if ((session.level >= speaker.limits.alert) && (session.level < speaker.limits.warning)) {
                data.schedule.yData.counts[1]++;
              } else if ((session.level >= speaker.limits.warning) && (session.level < speaker.limits.danger)) {
                data.schedule.yData.counts[2]++;
              } else {
                data.schedule.yData.counts[3]++;
              }
            }
          });
          // avg
          data.schedule.yData.level.push(levelSum / stationCount);

        });

      });

      return data.schedule;

    });
  }

}
