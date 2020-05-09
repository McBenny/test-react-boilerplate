#Handball scoreboard system

##Settings:
Minimum requirements to get started:
- Create a match:
    - Competition (Men / Women)
    - Date
    - Referees
        - First and last names (2),
    - Team A / B:
        - name
        - _colour_
        - Players:
            - Number\*
            - _First and last name_
            - Goalie?
        - Officials:
            - First and last name
            - Start button

##Main screen features
Table officials can change the score, mark players fouls and export the final score sheet.

The display shows the 2 teams involved, the current score and the players who received fouls.

###General features
- Edit match settings => access to initial settings
- Invert Teams (A-B => B-A)
- Alter score:
    - remove last goal,
    - edit score sheet:
        - opens a dialog with:
            - list of goals one after the other with:
                - score / new goal - for each line, possible to edit the team and players number or remove the line
                - for each line possibility to insert a line: - choose the team, the players number
                - [goal team A] - [goal team B][players number]
                - save / cancel

###Display
The screen is separated in 2 sides with on each side:

- Team identification (name, _logo, jersey colour_)
- Number of goals,
- List of fouls (yellow and red cards, 2 minutes with players number, _first and last name_).
- _Click on the team to view the line-up_
    - opens a dialog with:
        - lists the players with number, _first and last name_
        - for each players, possible to edit (number, first or last name) and remove players
        - button to add a players:
            - adds a line with empty fields for number, _first and last name_.
        - close button

- Click on the score to add a goal:
    - opens a dialog with:
        - list of players  numbers (_plus name_)
        - an "unknown" players,
        - close/cancel button
    - Official can select the number of the payer or "unknown"
        - it closes the dialog (automatic)
        - updates the total goals of the team

- Click on the foul type to add a foul:
    - opens a dialog with:
        - list of players  numbers (_plus name_)
        - an "unknown" players,
        - close/cancel button
    - Official can select the number of the payer or "unknown"
        - it closes the dialog (automatic)
        - updates the list of players for that foul

##Screens
1) Splash screen + button to create a game
1) Game settings
1) Game screen
1) Add a goal
1) Add a foul
1) Edit game log

###Splash screen
This is the starting screen of the application, its purpose is to present the app and allow for the officials to start a session.

The only possible action here is to "Start a game".

Starting a game consists in accessing the game settings.

###Game settings screen
This is the place where the officials can enter the game settings: type or name of competition, date, teams involved, their players and the referees.

These settings are a mandatory step to start the game session. Some fields are not mandatory though.

###Game screen
This is the main screen where most of the interactions are happening, and from where the officials can access all other screens.

This screen shows the current status of the game:
- [X] Teams playing,
- [X] current score,
- [X] fouls received by players per team,
- [ ] current half time.

From this screen it's possible to access other screens:
- [ ] Game settings: to alter the game's settings (add a players, change a referee...),
- [x] Add a goal screen: to add a goal for a team,
- [x] Add a foul screen: to add a certain type of foul to a team / players,
- [ ] Edit score screen: to edit the score if a mistake has been made

This screen also allows for certain actions:
- [ ] select/change half-time,
- [ ] export game data

###Add a goal / Add a foul
These screens are basically identical, they only perform different actions: adding a goal or a foul to a team. It allows for the selection of the players to associate with the goal or the foul.

All actions performed on this screen are to be stored in chronological order to be able to log the actions of the game.

A possible way to store these actions can be expressed as:
- [x] in team A, players X scores a goal,
- [x] in team B, players Y receives a yellow card,
- [x] in team A, players Z receives a "2 minutes",
- ...

This will allow for a complete log of the actions of the game.

Additional storing can also be performed to optimize certain displays or counts.

###Edit game log screen
This screen allows for the officials to see the entire log of the goals of the game and modify it.

An easy feature can be to simply remove the last goal. Other features can be to edit a specific goal and change the Team and the players who scored it, or simply remove it.

It should be possible to also add a goal anywhere in the list.

These features should also apply to the fouls, any foul registered should be editable and removable, it should also be possible to add a foul.

##TODO
- [X] allow for timeouts per team
- [X] Make add a players in settings "dynamic"
- [X] Disable a players if he's disqualified
- [X] add officials with a letter identification
- [X] allow for fouls applied to officials
- [X] refactor players/officials management to reduce code amount, use common names (member/players, reference/number)
- [ ] display list of players per foul
- [ ] on start/stop, allow for choice between pause/resume or close/open a period
- [ ] create a generic pop-in with generic features (open/close)
- [ ] allow for removal of a players
- [ ] Removing a players gives everything he holds to "unknown players"
- [ ] Changing the number, _first or last name_ of a players updates every occurrence of that players,
