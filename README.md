# Screeps [![Build Status](https://travis-ci.com/enfarious/Screeps.svg?branch=master)](https://travis-ci.com/enfarious/Screeps) [![dependencies Status](https://david-dm.org/enfarious/screeps/status.svg)](https://david-dm.org/enfarious/screeps) [![devDependencies Status](https://david-dm.org/enfarious/screeps/dev-status.svg)](https://david-dm.org/enfarious/screeps?type=dev) [![HitCount](http://hits.dwyl.io/enfarious/screeps.svg)](http://hits.dwyl.io/enfarious/screeps)

This is the code running on the game Screeps (https://screeps.com), specifically the code driving the Creeps for all of Enfarious' rooms. 
This code is probably more broken than not, probably sloppy, and almost certainly not complete.<br />

The idea is to slowly but surely develop a codebase that drives the Creeps, and supporting structures, to make a fully functional and fully automated version of things. As of now this means making some different types of Creeps that hopefully do what they're supposed to. 
The current Creeps are not very efficient and break often.<br />

ToDo:<br />
* Creep spawn automation
  * Maintain ratios of Creep classes (Harvester, Builder, Transporter, Miner, Defender, etc.)
  * Focus spawn defenders when attacks occur
  * Scouts when room reaches certain criteria
* Creep AI by Creep class
  * Harvesting and Mining
  * Building, Repairing and Upgrading structures and Room Controller
  * Transporting from energy/mineral mines to storage and/or buildings (Minerals and Energy)
  * Defense (Attack and Healing)
* Structure placement automation
  * Roads
  * Walls
  * Storage
  * Towers
  * Defenses
* Towers and Defenders working together
* Walls and Ramparts in proper use
* Mineral mining?
* Power Creeps?
