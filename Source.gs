/**
 * Retrieves all inbox threads and logs the respective subject lines.
 * For more information on using the GMail API, see
 * https://developers.google.com/apps-script/class_gmailapp
 */

var badSenders = ["apps-scripts-notifications@google.com", "AXS Event Guide", "Blizzard Entertainment", "Change.org", "Evernote Team", "Facebook", "Google+", 
                  "Google Calendar", "LinkedIn", "LinkedIn Updates", "MakeGamesWithUs", "PlanetSide 2", "Pintrest",
                  "PlayStation", "Pocket", "Prezi", "Relay For Life", "RunKeeper", "Scribd", "Skype", "Smith Micro", "The Last Door", "Twitch", "Twitter", "Ubertesters",
                  "Wells Fargo Online", "Yahoo Groups Updates", "YouTube", "Zed and Team Zamzee", "oDesk"]; // choose sender here
var dncFooter = "Paid for by the Democratic National Committee";
var ofaFooter = "PAID FOR BY ORGANIZING FOR ACTION";

function nonSpamSorter(){
  var threads = GmailApp.getInboxThreads();
  for (var i = 0; i < threads.length; i++) {
    var thread = threads[i];
    Utilities.sleep(100);
    var messages = thread.getMessages();
    //for(var j = 0; j < messages.length; j++){
    var message = messages[0];
    var from = message.getFrom();
    var subject = message.getSubject();
    Logger.log("Message from: %s \n Message subject: %s", from, subject);
    if(from.indexOf("Quora Digest") != -1 || from.indexOf("noreply@quora.com") != -1){
       var label = GmailApp.getUserLabelByName("Quora");
       label.addToThread(thread);
       thread.markUnimportant();
       thread.moveToArchive();
    }
    else if(from.indexOf("Benihana") != -1){
       var label = GmailApp.getUserLabelByName("Benihana");
       label.addToThread(thread);
       thread.markUnimportant();
       thread.moveToArchive();
    }
    else if(from.indexOf("CodeProject") != -1 || from.indexOf("Freelancer.com") != -1){
       var label = GmailApp.getUserLabelByName("Programming");
       label.addToThread(thread);
       thread.markUnimportant();
       thread.moveToArchive();
    }
    else if(from.indexOf("Seeking Alpha") != -1 || from.indexOf("account@seekingalpha.com") != -1){
       var label = GmailApp.getUserLabelByName("Buisness/Investing");
       label.addToThread(thread);
       thread.markUnimportant();
       thread.moveToArchive();
    }
    else if(from.indexOf("Fiverr.com") != -1){
       var label = GmailApp.getUserLabelByName("Buisness/Fiverr");
       label.addToThread(thread);
       thread.markUnimportant();
       thread.moveToArchive();
    }
    else if(from.indexOf("info@twitter.com") != -1){
       var label = GmailApp.getUserLabelByName("MySpam/Twitter");
       label.addToThread(thread);
       thread.markUnimportant();
       thread.moveToArchive();
    }
    else{// move onto subject filter
          if(subject.indexOf("[HBRobotics]") != -1){
            var label = GmailApp.getUserLabelByName("Robotics");
            label.addToThread(thread);
            thread.markUnimportant();
            thread.moveToArchive();
          }
      }
    //}
  }
}

// WORKS
function subjectFilter(){ // filters by subject
  var threads = GmailApp.getInboxThreads();
  var label = GmailApp.getUserLabelByName("Community/PVForum");
  for (var i = 0; i < threads.length; i++) {
    var thread = threads[i];
    var firstSubject = thread.getFirstMessageSubject();
    if(firstSubject.indexOf("[PVForum]") != -1){ // filter out subject
      label.addToThread(thread);
      thread.markUnimportant();
      thread.moveToArchive();
    }
  }
}

function dncFilter(){
  var threads = GmailApp.getInboxThreads();
  for(var i = 0; i < threads.length; i++){
    Utilities.sleep(100);
    var thread = threads[i];
    var messages = thread.getMessages();
    //for(var j = 0; j < messages.length; j++){
      //var message = messages[j];
      var message = messages[0];
      var msgPlainTxt = "";
      try{
        msgPlainTxt = message.getPlainBody();
      }
      catch(err){
        msgPlainTxt = message.getRawContent();
      }
      if(msgPlainTxt != null && (msgPlainTxt.indexOf(dncFooter) != -1 || msgPlainTxt.indexOf(ofaFooter) != -1)){
        var folderSpam = "MySpam/DNC";
        var spamLabel = GmailApp.getUserLabelByName(folderSpam);
        if(spamLabel == null){
          spamLabel = GmailApp.createLabel(folderSpam);
        }
        spamLabel.addToThread(thread);
        thread.markUnimportant();
        thread.moveToArchive();
      }
    //}
  }
}

function spamsenderfilter(){ // filters by sender
  var threads = GmailApp.getInboxThreads();
  for (var i = 0; i < threads.length; i++) {
    var thread = threads[i];  
    var messages = thread.getMessages();
    for(var k = 0; k < messages.length; k++){
      var message = messages[k];
      for(var j = 0; j < badSenders.length; j++){
        var currentSender = badSenders[j];
        try{
          Logger.log("iter");
          var from = message.getFrom();
          Logger.log(from);
          if(from.indexOf(currentSender) != -1){
            var folderSpam = "MySpam/" + currentSender;
            var spamLabel = GmailApp.getUserLabelByName(folderSpam);
            if(spamLabel == null){
              spamLabel = GmailApp.createLabel(folderSpam);
            }
            spamLabel.addToThread(thread);
            thread.markUnimportant();
            thread.moveToArchive();
            break;
          }
        }
        catch(err){
          Logger.log("undefined message");
        }
      }
    }
  }
}
