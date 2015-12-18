# Scratch2Airborne(a.k.a. Scratch2Drone)

With Scratch2Airborne, you can control Parrot Mini Drone series like Airborne Cargo from Scratch 1.4.

[![Scratch2Airborne Demo](https://cloud.githubusercontent.com/assets/10215/12006847/517092ce-ac2b-11e5-99e8-3ed993f234fd.gif)](https://www.youtube.com/watch?v=N0xQv8yjsr4)

**CAUTION!!!** Drones could be super dangerous. Make sure to have children wear long sleeve shirts, gloves, and goggles if you use them in workshops, etc. My drone could cut houseplant leaf with its propeller when it accidentally grazed.

![danger](https://cloud.githubusercontent.com/assets/10215/12008715/aaacfc98-ac93-11e5-9065-f04bb934ff94.JPG)

## Requirements

- [Scratch 1.4](https://scratch.mit.edu/scratch_1.4/)
- [Node.js](https://nodejs.org)

## How to setup

Install source and libraries.

```
$ git clone git@github.com:champierre/scratch2airborne.git
$ npm i noble
$ npm i rolling-spider
```

Power on the drone and get uuid, the id to specify the device.

```
$ cd scratch2airborne
$ node find.js
```

Replace "CHANGE HERE" in scratch2airborne.js with the uuid.

![change_here](https://cloud.githubusercontent.com/assets/10215/12006725/b68423b6-ac25-11e5-9cf5-74e845cf3972.png)

## How to run

Enable "Remote Sensor Connections" on Scratch.

![RSC](https://cloud.githubusercontent.com/assets/10215/12006730/fe3012c4-ac25-11e5-8903-9d7a15de087f.png)

Run the script.

```
$ node scratch2airborne.js
```

If a message saying "SESSION START" appears, your drone is successfully connected.

You can control the drone by "broadcast" blocks.

![Scratch Project](https://cloud.githubusercontent.com/assets/10215/12006719/773518f0-ac25-11e5-9109-4932c5867c77.png)

The following commands are available.

- takeoff
- forward
- right
- left
- backward
- up
- down
- flip
- backflip
- hover
- land
