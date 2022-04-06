# About Thrum

Thrum is a tool that combines the [pomodoro technique] (https://science.nichd.nih.gov/confluence/display/newsletter/2020/05/07/The+Pomodoro+Technique%3A+An+Effective+Time+Management+Tool) with Spotify to create customizable focus sessions sessions and  optimize productivity.  

After logging in to their Spotify account, users select one of their playlists to focus to, one of their playlists to relax to, and time intervals for focusing and relaxing. Thrum then automatically queues songs from the focus playlist until the "focus timer" ends and then automatically switches to the relax playlist, signalling to users that it is time to relax. Once the "relax timer" runs out, the music changes back to focus music and the user knows its time to focus again. 

# Klaviyo implementation overview
In order to retain users and remind them of Thrum when they have not used the app in one month (1 hour for testing purposes), the Klaviyo API was leveraged to send data from the app to Klaviyo, logging when users accessed the Session Creation page, and when users reached the Spotify Player page after creating a session. using this data, a segment was created for any users who have accessed the application and have not accessed the Spotify Player screen in one month (1 hour for testing). When users join this segment, an email is generated with a link to the application that the user can follow.

# Tracking API
Within [spotify-player.component.ts] (https://github.com/christianpaget/studyBreakApp/blob/klaviyo-test/spotify-study-break/src/app/spotify-player/spotify-player.component.ts) and [new-playlist-form.component.ts](https://github.com/christianpaget/studyBreakApp/blob/klaviyo-test/spotify-study-break/src/app/new-playlist-form/new-playlist-form.component.ts) in the ngOnInit functions that run when a page is loaded (i.e. accessed), there are function calls to [klaviyo.service.ts](https://github.com/christianpaget/studyBreakApp/blob/klaviyo-test/spotify-study-break/src/app/klaviyo.service.ts).
The calls from spotify-player and new-playlist-form pass user data and, for spotify-player, information around the session they created. These calls basically operate as ways to state which pages a user has viewed

# Klaviyo.service.ts 
Klaviyo.service.ts is a helper service that accepts the function calls and injects the klaviyo Public Key prior to calling the Track API function. The service is injected into the pages where the Klaviyo Track API is being passed info

# Has not started a session in 1 month
On the Klaviyo side, there is a Segment titled "Has not started a session in 1 month". The conditions that place users in this segment are: has accessed listening screen once over all time and accessed listening screen zero times in the last 1 hour.

Once users have not accessed the spotify-player screen in 1 hour, they are added to this Segment and trigger a Flow that sends an email

# 1 month reminder with playlist
The Flow "1 month reminder with playlist" is triggered upon the addition of a user to "Has not started a session in 1 month". This email contains a short message and a link to the application encouraging the user to start a session, or respond to the email with feedback.