function HHMMSS(options) {
    var type			= options.type != undefined ? options.type : "horizontal",
        horizontalAlign = options.horizontalAlign != undefined ? options.horizontalAlign : "hcenter",
        verticalAlign	= options.verticalAlign != undefined ? options.verticalAlign : "vcenter",
        size			= options.size != undefined ? options.size : "medium",
        invert			= options.invert != undefined ? options.invert : true;

    var hhmmss = document.createElement('div');
    hhmmss.id = "hhmmss";
    if(invert) hhmmss.classList.add('invert');

    var clock = document.createElement('div');
    clock.id = "clock";
    clock.className = type + " " + horizontalAlign + " " + verticalAlign + " " + size;

    var hhmmss_h = document.createElement('div'),
        hhmmss_m = document.createElement('div'),
        hhmmss_s = document.createElement('div');

    clock.appendChild(hhmmss_h);
    clock.appendChild(document.createElement('span'));
    clock.appendChild(hhmmss_m);
    clock.appendChild(document.createElement('span'));
    clock.appendChild(hhmmss_s);

    hhmmss.appendChild(clock);

    document.body.appendChild(hhmmss);

    var date = new Date(),
        h	 = date.getHours(),
        m	 = date.getMinutes(),
        s	 = date.getSeconds();

    hhmmss_h.innerHTML = h < 10 ? "0" + h : h;
    hhmmss_m.innerHTML = m < 10 ? "0" + m : m;
    hhmmss_s.innerHTML = s < 10 ? "0" + s : s;

    function updateTime() {
        if(!s_active && !m_active && !h_active) {
            s++;
            if (s >= 60) {
                s = 0;
                m++;
                if (m >= 60) {
                    m = 0;
                    h++;
                    if (h >= 24) {
                        h = 0;
                    }
                }
            }
        }

        hhmmss_h.innerHTML = h < 10 ? "0" + h : h;
        hhmmss_m.innerHTML = m < 10 ? "0" + m : m;
        hhmmss_s.innerHTML = s < 10 ? "0" + s : s;
    }

    setInterval(updateTime, 1000);

    this.getS = function() {
        return s;
    }

    this.getM = function() {
        return m;
    }

    this.getH = function() {
        return h;
    }

    this.getMillis = function() {
        var d = new Date();
        return d.getMilliseconds();
    }

    var doubleClick = false,
        doubleClickTimeout;
    hhmmss.addEventListener('click', function(e) {
        if(!doubleClick) {
            doubleClick = true;
            clearTimeout(doubleClickTimeout);
            doubleClickTimeout = setTimeout(function() {
                doubleClick = false;
            }, 300);
        } else {
            date   = new Date();
            h = date.getHours();
            m = date.getMinutes();
            s = date.getSeconds();

            hhmmss_h.innerHTML = h < 10 ? "0" + h : h;
            hhmmss_m.innerHTML = m < 10 ? "0" + m : m;
            hhmmss_s.innerHTML = s < 10 ? "0" + s : s;

            doubleClick = false;
        }
    });

    var s_active = false,
        m_active = false,
        h_active = false,
        prevX;

    hhmmss_s.addEventListener("mousedown", function() {
        s_active = true;
        hhmmss_s.classList.add('active');
    });

    hhmmss_m.addEventListener("mousedown", function() {
        m_active = true;
        hhmmss_m.classList.add('active');
    });

    hhmmss_h.addEventListener("mousedown", function() {
        h_active = true;
        hhmmss_h.classList.add('active');
    });

    var inactiveTimeout;

    hhmmss.addEventListener("mousemove", function(e) {
        hhmmss.classList.add('active');
        clearTimeout(inactiveTimeout);
        inactiveTimeout = setTimeout(function() {
            hhmmss.classList.remove('active');
        }, 2000);

        if(s_active || m_active || h_active) {
            var delta = e.pageX - prevX;
            prevX = e.pageX;
        }

        if(s_active) {
            if(delta > 0) {
                s++;
                if (s >= 60) {
                    s = 0;
                    m++;
                    if (m >= 60) {
                        m = 0;
                        h++;
                        if (h >= 24) {
                            h = 0;
                        }
                    }
                }
            } else if(delta < 0) {
                s--;
                if (s <= -1) {
                    s = 59;
                    m--;
                    if (m <= -1) {
                        m = 59;
                        h--;
                        if (h <= -1) {
                            h = 0;
                        }
                    }
                }
            }
        } else if(m_active) {
            if(delta > 0) {
                m++;
                if (m >= 60) {
                    m = 0;
                    h++;
                    if (h >= 24) {
                        h = 0;
                    }
                }
            } else if(delta < 0) {
                m--;
                if (m <= -1) {
                    m = 59;
                    h--;
                    if (h <= -1) {
                        h = 0;
                    }
                }
            }
        } else if(h_active) {
            if(delta > 0) {
                h++;
                if (h >= 24) {
                    h = 0;
                }
            } else if(delta < 0) {
                h--;
                if (h <= -1) {
                    h = 23;
                }
            }
        }

        hhmmss_h.innerHTML = h < 10 ? "0" + h : h;
        hhmmss_m.innerHTML = m < 10 ? "0" + m : m;
        hhmmss_s.innerHTML = s < 10 ? "0" + s : s;
    });

    hhmmss.addEventListener("mouseup", function() {
        s_active = false;
        m_active = false;
        h_active = false;

        hhmmss_s.classList.remove('active');
        hhmmss_m.classList.remove('active');
        hhmmss_h.classList.remove('active');
    });
}
