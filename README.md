# astralQuery
An easy to add and use library for working with heavenly bodies. Get planet positions easily by using this as an ephemeris, add your own heavenly bodies, don''t worry about calculations!

#Examples
a$("Moon")                                              object (all info on moon)
a$("Moon").visible();                                   true
a$("Moon").visible({lat,lon, time});                    true
a$("moon")						array[obj] (array of all moons)
a$("moon, star")					array[obj] (array of all stars and moons)
a$("Earth").add(obj)					adds object to Earth - could be satellite
new a$(x,y,z....)					creates new astro object
a$("Moon").weight();					"34kg"

a$("Sun").satellites()                                  array[obj] (array of planet objects)
a$("Sun").satellites().satellites()                     array[obj] (array of all satellites of all planets)

Important: naming conventions
Names of type in lower case
Names of objects capitalised
