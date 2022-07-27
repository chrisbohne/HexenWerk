# HexenWerk
## The improved version of HexFinder

<a href="https://chrisbohne.github.io" target="_blank">Visit HexenWerk</a>

### What is HexenWerk
HexenWerk is map editor for building maps using hexagonal Tiles. The intention is to have a visually pleasing playground for pathfinding. In order to have a bit of variation HexenWerk has different categories of transportation. Locations can be connected via streets, rails, water and even be reached by plane. The setting s of any means of transportation can be changed and by doing so a new fastest route from point a to b will be calculated and displayed.
Different locations can be connected with each other. A city can be reached by all means of transportation, whereas a town can be reached by car, train and boat. 

### Technology used for HexenWerk
The frontend of HexenWerk was build using React, Typescript and SCSS. Webpack was used to bundle all components and assets.
The editor was built using HTML Canvas without using any library.

The backend was built using NestJS and a dockerized PostreSQL.

[Server of HexFinder v2.0](https://github.com/chrisbohne/HexFinder_v2_server)
