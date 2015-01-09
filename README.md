# astralQuery
An easy to add and use library for working with heavenly bodies. Get planet positions easily by using this as an ephemeris, add your own heavenly bodies, don''t worry about calculations!

Important: naming conventions.
Names of type in lower case.
Names of objects capitalised.

#Examples
a$("Moon")                                              
returns: object (all info on moon)

a$("Moon").visible();                                   
returns: true

a$("Moon").visible({lat,lon, time});                    
returns: true

a$("moon")						
returns: array[obj] (array of all moons)

a$("moon, star")					
returns: array[obj] (array of all stars and moons)

a$("Earth").add(obj)					
returns: adds object to Earth - could be satellite

new a$(x,y,z....)					
returns: creates new astro object

a$("Moon").weight();					
returns: "34kg"

a$("Sun").satellites()                                  
returns: array[obj] (array of planet objects)

a$("Sun").satellites().satellites()                    
returns: array[obj] (array of all satellites of all planets)

