#Handball scoreboard system

##User authentication
The system is available without any authentication, and it is able to store data locally without any credentials.

If the user identifies, they can store data online and benefit from data stored by others (teams and players).  
If a user is identified, their game data are stored online under their account. They can retrieve them on any device. Only data about teams and players inside teams are shared with other identified members

###Users
The system only collects the minimum amount  of information about the user: email, password and a nickname.

Each identification creates a session with a unique authentication token that allows the system to link the user to their actions and their data. Each session is valid for a limited period of time, unless renewed by the user before it's expiration, in such case it is renewed:

If user session lasts for 30 minutes and user signs in at 2:00pm, the session is due to expire at 2:30pm. If the user interacts with the server at 2:05pm, the session is extended till 2:35pm. If the following interaction with the server occurs at 2:40pm, the session is no more valid, therefore the interaction will be rejected, the user will have to re-sign in and redo their action.

###Required screens/components related to the users
####Sign up form
To create their account, the user has to fill a sign up form with the following fields:
- email address,
- password,
- nickname

####Sign in form
To use the system as an identified user, the users have to sign in through an authentication form with the following fields:
- email address,
- password

A link to a "forgot password" screen is provided.

####Forgot password
If a user loses their password they can ask for a recovery link. It will send them an email with a unique link allowing them to recreate a new password.
The form consists of the following fields:
- email address

If the email address provided is found in the database, an email is sent to the user.

####Password recovery email message
It's an email message sent to the user in case they have forgotten their password. It includes a link to a page allowing the user to create a new password for their account.

####New password form
This form allows the user to create a new password linked to their account. It sits on a page that is valid only a certain time, through a unique id created when the user uses the "Forgot password" form.

The form consists of the following fields:
- new password,
- confirm new password

The two fields must have identical content to be accepted.

####Log out 
This can be a simple link that enables the user to voluntarily log out of the system. It would invalidate the current session and send the user back to the home page, unidentified.

It's accessible only once the user is identified, it replaces the links to the sin in and sign up forms.

##Settings:
Minimum requirements to get started:
- Create a match:
    - [ ] Competition (Men / Women)
    - [X] Date
    - [ ] Referees
        - [ ] First and last names (2),
    - [ ] Timekeeper and Scorekeeper (2)
        - [ ] First and last names (2),
    - [ ] Team A / B:
        - [X] name
        - [ ] _colour_
        - Players:
            - [X] Number\*
            - [X] _First and last name_
            - [ ] Goalie?
        - Officials:
            - [X] First and last name
            - [X] Start button

##Main screen features
Table officials can change the score, mark players fouls and export the final score sheet.

The display shows the 2 teams involved, the current score and the players who received fouls.

###General features
- [X] Edit match settings => access to initial settings
- [ ] Invert Teams (A-B => B-A)
- [ ] Alter score:
    - [ ] remove last goal,
    - [ ] edit score sheet:
        - [ ] opens a dialog with:
            - [ ] list of goals one after the other with:
                - [ ] score / new goal - for each line, possible to edit the team and player number or remove the line
                - [ ] for each line possibility to insert a line: - choose the team, the player number
                - [ ] [goal team A] - [goal team B][player number]
                - [ ] save / cancel

###Display
The screen is separated in 2 sides with on each side:

- [X] Team identification (name, _logo, jersey colour_)
- [X] Number of goals,
- [X] List of fouls (yellow and red cards, 2 minutes with player number, _first and last name_).
- [ ] _Click on the team to view the line-up_
    - [ ] opens a dialog with:
        - [ ] lists the players with number, _first and last name_
        - [ ] for each player, possible to edit (number, first or last name) and remove player
        - [ ] button to add a player:
            - [ ] adds a line with empty fields for number, _first and last name_.
        - [ ] close button

- [X] Click on the score to add a goal:
    - [X] opens a dialog with:
        - [X] list of players  numbers (_plus name_)
        - [X] an "unknown" player,
        - [X] close/cancel button
    - [X] Official can select the number of the payer or "unknown"
        - [X] it closes the dialog (automatic)
        - [X] updates the total goals of the team

- [X] Click on the foul type to add a foul:
    - [X] opens a dialog with:
        - [X] list of players  numbers (_plus name_)
        - [X] no "unknown" player,
        - [X] close/cancel button
    - [X] Official can select the number of the payer
        - [X] it closes the dialog (automatic)
        - [X] updates the list of players for that foul

##Screens
1) [X] Splash screen + button to create a game
1) [X] Game settings
1) [X] Game screen
1) [X] Add a goal
1) [X] Add a foul
1) [ ] Edit game log

###Splash screen
This is the starting screen of the application, its purpose is to present the app and allow for the official to start a session.

The only possible action here is to "Start a game".

Starting a game consists in accessing the game settings.

###Game settings screen
This is the place where the official can enter the game settings: type or name of competition, date, teams involved, their players and the referees.

These settings are a mandatory step to start the game session. Some fields are not mandatory though.

###Game screen
This is the main screen where most of the interactions are happening, and from where the official can access all other screens.

This screen shows the current status of the game:
- [X] Teams playing,
- [X] current score,
- [X] fouls received by players per team,
- [X] current half time.

From this screen it's possible to access other screens:
- [X] Game settings: to alter the game's settings (add a player, change a referee...),
- [X] Add a goal screen: to add a goal for a team,
- [X] Add a foul screen: to add a certain type of foul to a team / player,
- [ ] Edit score screen: to edit the score if a mistake has been made

This screen also allows for certain actions:
- [X] select/change half-time,
- [ ] export game data

###Add a goal / Add a foul
These screens are basically identical, they only perform different actions: adding a goal or a foul to a team. It allows for the selection of the player to associate with the goal or the foul.

All actions performed on this screen are to be stored in chronological order to be able to log the actions of the game.

A possible way to store these actions can be expressed as:
- [X] in team A, player X scores a goal,
- [X] in team B, player Y receives a yellow card,
- [X] in team A, player Z receives a "2 minutes",
- ...

This will allow for a complete log of the actions of the game.

Additional storing can also be performed to optimize certain displays or counts.

###Edit game log screen
This screen allows for the official to see the entire log of the goals of the game and modify it.

An easy feature can be to simply remove the last goal. Other features can be to edit a specific goal and change the Team and the player who scored it, or simply remove it.

It should be possible to also add a goal anywhere in the list.

These features should also apply to the fouls, any foul registered should be editable and removable, it should also be possible to add a foul.

##BUGS
- [ ] When I create a player, it jumps from bottom to top of the list, this is annoying
- [X] Players with letters are not in uppercase in list for captain
- [X] I don't want to get "NaN" when I erase a number before putting a new one in the settings
- [X] Getting saved games looks for any saved localStorage
- [X] Log seems incomplete
- [X] Players seem to not be sorted "naturally"
- [X] A totally empty player in the settings should not be saved

##TODO
- [ ] I want to be able to delete a game (via popup confirmation)
- [ ] authenticate users
- [ ] save team and players data to use in auto-suggest, save colours as well
- [ ] allow image upload for teams
- [ ] allow for removal of a player
- [ ] Removing a player gives everything he holds to "unknown players"
- [X] allow for timeouts per team
- [X] Make add a player in settings "dynamic"
- [X] Disable a player if he's disqualified
- [X] add officials with a letter identification
- [X] allow for fouls applied to officials
- [X] refactor players/officials management to reduce code amount, use common names (member/players, reference/number)
- [X] display list of players per foul
- [X] keep current score on every event
- [X] on start/stop, allow for choice between pause/resume or close/open a period
- [X] create a generic pop-in with generic features (open/close)
- [X] save data locally and retrieve them
- [X] group players in fouls
- [X] add the captain
- [X] display team line-up with captain first
- [X] add link to settings form "no players situations"
- [X] add a colour to each team
- [X] add game officials (referees, scorekeeper (table), timekeeper (scoreboard/buzzer))
- [X] in players pop-in, list players and officials in different tabs
- [X] Changing the number, _first or last name_ of a player updates every occurrence of that player,
- [X] Add the competition settings on top of the game screen
- [X] Order players by ascending numbers
- [X] Order games by date on selection screen
- [X] Ability to remove a player if he has no event
- [X] If there are no events, don't show the game log
- [X] display the number of players and officials in Players pop-up and Line-up

##REFACTORING
- [ ] Check W3C conformance and accessibility
- [X] Optimise settings page to avoid repetition between A and B teams.
- [X] Separate colours from colour usage
- [X] Optimize components calls
- [ ] ~~move open and close popup functions inside the popup component~~

##First feedback
### Priority 1
- [ ] I don't want to have to type all the names at the beginning
- [ ] I want to get recorded players easily
- [ ] I want to cancel the last action (an action) +2
- [X] I want to invert the teams in the settings
- [X] I want to be able to read the game log (show player's name/number, actions etc.)

###Priority 2
- [ ] I want to say there was a penalty missed
- [X] I want to be able to give a letter to a player (when no number, a colour initial maybe?)
- [X] I want to see the number of players and officials per team in the settings
- [X] I want to see if the player is a goalie (in the line-up)
- [X] I want to say that a goal was a penalty

###Others
- [ ] I want to share the results (have a summary sheet)
- [ ] I want to see the time
- [ ] I want a picture of each player instead of/with number/name
- [X] I want to see the time for the 2 minutes suspensions (should it be linked to a time pause, and start when time restarts?)
- [X] I want to see the time during timeouts

##Design assets
###Fonts
For score display:
- [Modern LCD-7](https://www.dafont.com/modern-lcd-7.font?text=score%3A+21-11)
- [Advanced Pixel LCD-7](https://www.dafont.com/advanced-pixel-lcd-7.font?text=score%3Aa+21-11)
- [Pixel LCD7](https://www.dafont.com/pixel-lcd7.font?text=score%3A+21-11)
- + [Oxanium](https://fonts.google.com/specimen/Oxanium?preview.text=21-85&preview.text_type=custom&query=oxa)
- [ZCOOL QingKe HuangYou](https://fonts.google.com/specimen/ZCOOL+QingKe+HuangYou?preview.text=21-17&preview.text_type=custom&query=zcoo)
- [Rajdhani](https://fonts.google.com/specimen/Rajdhani?preview.text=21+-+17&preview.text_type=custom&preview.size=120&sort=popularity&category=Sans+Serif)

For jersey numbers:
- [Bebas Neue](https://fonts.google.com/specimen/Bebas+Neue?preview.text=26++7++11++1++99&preview.text_type=custom&preview.size=120&sort=popularity)
- [Russo one](https://fonts.google.com/specimen/Russo+One?preview.text=26++7++11++1++99&preview.text_type=custom&preview.size=120&sort=popularity)
- + [Teko](https://fonts.google.com/specimen/Teko?preview.text=26++7++11++1++99&preview.text_type=custom&preview.size=120&sort=popularity)

Sans-serif fonts:
- [Lane](https://www.dafont.com/lane.font?text=score%3A+21-11+Sydney+Uni&fpp=100&l[]=10&l[]=1&back=theme)
- [Nordica](https://www.dafont.com/nordica.font?text=score%3A+21-11+Sydney+Uni&fpp=100&l[]=10&l[]=1&back=theme)

###Icons
- + [MaterielUI](https://material-ui.com/components/material-icons/)
- [FlatIcon](https://www.flaticon.com/)
- [icon8](https://icons8.com/icons)

###Backgrounds
- [WebGradients](https://webgradients.com/)
- [vecteezy](https://www.vecteezy.com/)

###Jerseys
- insert light effect on players' jerseys: https://codepen.io/mcbenny/pen/ExVOmJm
