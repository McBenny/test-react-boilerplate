#DB Description

##User - session
###What for?
Users are the people using the system. They sign-up and can then save games and data in the system.

- Users own games
- Password should be hashed and salted.

###Table creation: user
```sql
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nick_name` varchar(255),
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=0 ;
```

###Table creation: session
```sql
CREATE TABLE IF NOT EXISTS `session` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `auth_token` varchar(255) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expiration` timestamp,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=0 ;
```

##Game
###What for?
Games are a list of settings and events leading to a global game.

- Games use public data for some settings (teams, players, etc.)
- Games store events specific to the game

###Table creation
```sql
CREATE TABLE IF NOT EXISTS `game` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `game_id` varchar(255) NOT NULL,
  'date' date NOT NULL,
  `data` longtext(1024000) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=0 ;
```

##Team - team_colours
###What for?
Teams are public information. They are created by individuals but become public data.

A team has:
- a country / region (state)
- a name
- colours for jerseys and numbers that can be created and stored

###Table creation: team
```sql
CREATE TABLE IF NOT EXISTS `team` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `country_id` smallint(5) NOT NULL,
  `region_id` int(11),
  `name` varchar(255) NOT NULL,
  `image` varchar(255),
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=0 ;
```

###Table creation: team_colours
```sql
CREATE TABLE IF NOT EXISTS `team_colours` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `team_id` smallint(11) NOT NULL,
  `jersey` varchar(255),
  `reference` varchar(255),
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=0 ;
```

##Member
###What for?
Members are the different people appearing in the games, they can be players, team officials or game officials.

They can belong to a team or not.

###Table creation
```sql
CREATE TABLE IF NOT EXISTS `member` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255),
  `last_name` varchar(255) NOT NULL,
  `coach` BOOLEAN,
  `official` BOOLEAN,
  `player` BOOLEAN,
  `team_id` int(11),
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=0 ;
```

##Country / State
###What for?
These tables are storing countries and respective states to be used with teams.

https://github.com/prograhammer/countries-regions-cities
https://github.com/hiiamrohit/Countries-States-Cities-database
