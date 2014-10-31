EmailSorter
===========

An e-mail sorter plugin for gmail

There are four functions/implementation I've made to sort email by:

### spamsenderfilter
  This function sorts all inbox threads into the respective category. This is especially modular as all you need to do to add a sender to the list is add it to the badSenders array. It treats any sender that has part of its name equal to any string in the badSenders array as spam and sorts it in its own MySpam subfolder.
  So if Google+ was in my badSenders array, and the sender was Jack Youstra with Google+, it would be sorted under MySpam/Google+.

### nonSpamSorter
  This sorter takes in inbox threads and sorts them based on sender, much like spamsorter, except with an intentional folder (instead of the default MySpam subfolder, it would be put into a folder of your choice).
  
### subjectFilter
  This filter uses the subject of each thread as the filter. This is especially useful for subject filter tags, where the program can just look at the tag and filter it into a different category subfolder right now, much like spamsenderfilter. For now, it just acts like nonSpamSorter, with a custom folder needing to be specified for each subject case.
  
### dncFilter
  DNC filter (aptly named because I only use it to filter out DNC email, which conform to none of the above rules) filters email by their body content. In my implementation, I filter it by a common footer used in all DNC emails, allowing me to sort all of the emails I get from them without having to create nonSpamSorters for all of the people from there who send me emails.
