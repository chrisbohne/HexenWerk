# HexenWerk
## The improved version of HexFinder

<a href="https://chrisbohne.github.io" target="_blank">Visit HexenWerk</a>

<img src="src/assets/images/preview/Screenshot from 2022-07-28 13-13-41.png" />

### What is HexenWerk
HexenWerk is map editor for building maps using hexagonal Tiles. The goal of the app is to be a visually pleasing playground for pathfinding. In order to have a bit of variation HexenWerk has different categories of transportation. Locations can be connected via streets, rails, water and even be reached by plane. The settings of any means of transportation can be changed and by doing so a new fastest route from point a to b will be calculated and displayed.
For further information take a look at the about page.

<img src="src/assets/images/preview/Screenshot from 2022-07-28 13-11-37.png" />

### Technology used for HexenWerk
The frontend of HexenWerk was build using React, Typescript and SCSS. Webpack was used to bundle all components and assets.
The editor was built using HTML Canvas without using any library. The tiles were designed using Figma.

The backend was built using NestJS and a dockerized PostreSQL. A secure Authentication was implemented by using a access and refresh token strategy.

[Server of HexFinder v2.0](https://github.com/chrisbohne/HexFinder_v2_server)

<img src="src/assets/images/preview/Screenshot from 2022-07-28 13-28-42.png" />
In the future a look behind the scenes of the algorithm will be added. Furthermore different pathfinding algorithm going to be implemented.
