/**
 * Twin Sleep Log - shared log stored in this Google Sheet.
 *
 * Paste this whole file into Extensions > Apps Script, then
 * Deploy > New deployment > Web app (Execute as: Me, Who has access: Anyone).
 * Put the Web app URL into the app's "Share with another phone" box.
 *
 * Sleeps are kept on a tab called "Sleeps". Please don't edit that tab by hand;
 * use the app to change or delete entries.
 */

var TAB = 'Sleeps';
var HEADERS = ['Twin', 'Fell asleep', 'Woke up', 'Minutes', 'id', 'twin', 'updated', 'deleted', 'serverTime'];
var COL = { name: 0, start: 1, end: 2, minutes: 3, id: 4, twin: 5, updated: 6, deleted: 7, serverTime: 8 };

function tab_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(TAB);
  if (!sh) {
    sh = ss.insertSheet(TAB, 0);
    sh.appendRow(HEADERS);
    sh.setFrozenRows(1);
    sh.getRange('B:C').setNumberFormat('ddd d mmm yyyy, HH:mm');
  }
  return sh;
}

function rows_(sh) {
  var n = sh.getLastRow() - 1;
  return n > 0 ? sh.getRange(2, 1, n, HEADERS.length).getValues() : [];
}

function toSleep_(r) {
  return {
    id: String(r[COL.id]),
    twin: String(r[COL.twin]),
    start: r[COL.start] instanceof Date ? r[COL.start].getTime() : null,
    end: r[COL.end] instanceof Date ? r[COL.end].getTime() : null,
    updated: Number(r[COL.updated]) || 0,
    deleted: r[COL.deleted] === true,
    serverTime: Number(r[COL.serverTime]) || 0
  };
}

function toRow_(s, serverTime) {
  return [
    String(s.name || (s.twin === 'a' ? 'Twin A' : 'Twin B')).slice(0, 40),
    new Date(s.start),
    s.end == null ? '' : new Date(s.end),
    s.end == null ? '' : Math.round((s.end - s.start) / 60000),
    String(s.id),
    s.twin,
    Number(s.updated) || 0,
    !!s.deleted,
    serverTime
  ];
}

function reply_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// Phones ask: "what changed since <since>?"
function doGet(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var since = Number((e && e.parameter && e.parameter.since) || 0);
    var serverTime = Date.now();
    var sleeps = rows_(tab_()).map(toSleep_).filter(function (s) {
      return s.id && s.start != null && s.serverTime > since;
    });
    return reply_({ ok: true, serverTime: serverTime, sleeps: sleeps });
  } catch (err) {
    return reply_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Phones send their changes. For each sleep, the newest change wins.
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var body = JSON.parse(e.postData.contents);
    var sh = tab_();
    var data = rows_(sh);
    var index = {};
    data.forEach(function (r, i) { index[String(r[COL.id])] = i; });
    var serverTime = Date.now();
    var appends = [];
    (body.sleeps || []).forEach(function (s) {
      if (!s || !s.id || (s.twin !== 'a' && s.twin !== 'b') || typeof s.start !== 'number') return;
      if (s.end != null && typeof s.end !== 'number') return;
      var i = index[String(s.id)];
      if (i == null) {
        index[String(s.id)] = -1;
        appends.push(toRow_(s, serverTime));
      } else if (i >= 0 && (Number(s.updated) || 0) >= (Number(data[i][COL.updated]) || 0)) {
        sh.getRange(i + 2, 1, 1, HEADERS.length).setValues([toRow_(s, serverTime)]);
      }
    });
    if (appends.length) sh.getRange(sh.getLastRow() + 1, 1, appends.length, HEADERS.length).setValues(appends);
    return reply_({ ok: true, serverTime: serverTime });
  } catch (err) {
    return reply_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}
