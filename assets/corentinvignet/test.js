(function() {

    // Matter initialization
    var Engine = Matter.Engine,
        World = Matter.World,
        Bodies = Matter.Bodies,
        Body = Matter.Body,
        Composite = Matter.Composite,
        Composites = Matter.Composites,
        Common = Matter.Common,
        Events = Matter.Events;

    // Engine initialization
    var engine = Engine.create(document.body, {
      render: {
        options: {
          width: window.innerWidth,
          height: window.innerHeight,
          background: 'transparent',
          label: 'Engine',
          showAngleIndicator: false,
          gravity: {
            x: 0,
            y: 1
          },
          wireframes: false
        }
      },
      world: {
        bounds: {
          max: {
            x: window.innerWidth,
            y: window.innerHeight
          }
        }
      }
    });

    var world = engine.world;

    var w = engine.render.options.width,
        h = engine.render.options.height;
    World.add(world, [
        Bodies.rectangle(-20, h / 2, 40, h + 40, { isStatic: true }),
        Bodies.rectangle(w + 20,  h / 2, 40, h + 40, { isStatic: true }),
        Bodies.rectangle(w / 2, -20, w + 40, 40, { isStatic: true }),
        Bodies.rectangle(w / 2, h + 20, w + 40, 40, { isStatic: true })
    ]);

    var explosion = function(engine) {
        var bodies = Composite.allBodies(engine.world);
        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i];
            if (!body.isStatic && body.position.y >= 500) {
                var forceMagnitude = 0.04 * body.mass;
                Body.applyForce(body, { x: 0, y: 0 }, {
                    x: (forceMagnitude + Common.random() * forceMagnitude) * Common.choose([1, -1]),
                    y: -forceMagnitude + Common.random() * -forceMagnitude
                });
                //console.log(Body.applyForce);
            }
        }
    };



    // Parameters
    var minuteObjectCreateX = window.innerWidth/2
    var minuteObjectCreateY = window.innerHeight/2
    var minuteObjectSizeX = 60
    var minuteObjectSizeY = 80/2
    var minuteObjectRender = { render: { sprite: { texture: 'img2/noir.png'} } };

    var secondObjectCreateX = window.innerWidth/2
    var secondObjectCreateY = window.innerHeight/2
    var secondObjectSizeX = 70/2
    var secondObjectSizeY = 60
    var secondObjectRender = { render: { sprite: { texture: 'img2/blanc123.png'} } };


    var bodyObjectOptions = { frictionAir: 0, friction: 0.0001, restitution: 0.8 };


    //  variables
    var minutes = [];
    var seconds = [];
    var local_second = 0;
    var local_minute = 0;
    var local_minute_populate_done = true;

    Events.on(engine, 'afterUpdate', function(event) {

      // Initialize date object
      var date = new Date()

      // Detect new minutes
      if (local_minute != hhmmss.getM()){

        // Delete the existing minutes objects in the world
        for (var i = 0; i < minutes.length; i++) {
          var indexMinute = world.bodies.indexOf(minutes[i]);
          world.bodies.splice(indexMinute, 1);
        }

        // Clear minute array
        minutes.splice(0, minutes.length)

        // Delete the existing seconds objects in the world
        for (var i = 0; i < seconds.length; i++) {
          var indexSecond = world.bodies.indexOf(seconds[i]);
          world.bodies.splice(indexSecond, 1);
        }

        // Clear seconds array
        seconds.splice(0, seconds.length)

        // Update local minute
        local_minute = hhmmss.getM()

        // Mark minute populate as false
        local_minute_populate_done = false
      }

      // Creates a minute object until there is enough (i.e. local_minute_populate_done is true)
      if (!local_minute_populate_done){

        // If there isn't enought minutes, create one
        if (minutes.length < hhmmss.getM()) {

          // Create the minute object
          var minuteObject = Bodies.circle(minuteObjectCreateX, minuteObjectCreateY,  minuteObjectSizeY, minuteObjectRender);

          // Add minute to the world
          World.addBody(world, minuteObject, bodyObjectOptions);

          // Add minute to the array
          minutes.push(minuteObject)

        // If there is already enought minutes
        } else {

          // Mark the flag as true
          local_minute_populate_done = true
        }
      }

      // Detect new seconds
      if (local_second != hhmmss.getS()){

        // Update local second
        local_second = hhmmss.getS()

        // Mark minute populate as false
        local_second_populate_done = false
      }

      // Creates a second object until there is enough (i.e. local_second_populate_done is true)
      if (!local_second_populate_done){

        // If there isn't enought minutes, create one
        if (seconds.length < hhmmss.getS()) {

          // Create the second object
          var secondObject = Bodies.circle(secondObjectCreateX, secondObjectCreateY,  secondObjectSizeX, secondObjectRender);

          // Add second to the world
          World.addBody(world, secondObject, bodyObjectOptions);

          // Add second to the array
          seconds.push(minuteObject)

        // If there is already enought seconds
        } else {

          // Mark the flag as true
          local_second_populate_done = true
        }
      }

      // Set gravity according to the hour
      var local_hour = (hhmmss.getH() % 12) + hhmmss.getM()/60
      console.log(local_hour)
      var offset = -3 // 3
      engine.world.gravity.x = Math.cos((local_hour + offset) * (Math.PI * 2 / 12));
      engine.world.gravity.y = Math.sin((local_hour + offset) * (Math.PI * 2 / 12));
  })

Engine.run(engine);

})();
