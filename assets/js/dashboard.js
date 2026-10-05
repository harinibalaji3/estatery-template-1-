(function () {

  var d = document;
  var P = window.ESTATE_PROPS || [];
  var admin = d.body.dataset.dash === "admin";

  if (admin) return;

  var $ = function (s, c) {
    return (c || d).querySelector(s);
  };

  var $$ = function (s, c) {
    return [].slice.call((c || d).querySelectorAll(s));
  };

  function ls(k, f) {
    try {
      var v = JSON.parse(localStorage.getItem(k));
      return v || f;
    } catch (e) {
      return f;
    }
  }

  function sv(k, v) {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch (e) {}
  }

  function byId(id) {
    return P.filter(function (p) {
      return p.id === id;
    })[0];
  }

  function title(id) {
    var p = byId(id);
    return p ? p.title : id;
  }

  /* =====================================================
     THEME
  ===================================================== */

  window.toggleTheme = function () {

    var n =
      d.documentElement.dataset.theme === "dark"
        ? "light"
        : "dark";

    d.documentElement.dataset.theme = n;

    try {
      localStorage.setItem("theme", n);
    } catch (e) {}

  };

  try {
    d.documentElement.dataset.theme =
      localStorage.getItem("theme") || "light";
  } catch (e) {}


  /* =====================================================
     STYLE
  ===================================================== */

  var st = d.createElement("style");

  st.textContent = `

    .dv {
      width:100%;
    }

    .dv-card {
      background:var(--dash-card);
      border:1px solid var(--dash-border);
      border-radius:17px;
      padding:22px;
    }

    .dv-bar {
      display:flex;
      justify-content:space-between;
      align-items:center;
      margin-bottom:18px;
      gap:12px;
    }

    .dv-btn {
      border:0;
      border-radius:9px;
      background:var(--dash-accent);
      color:#fff;
      padding:10px 16px;
      font-weight:700;
      cursor:pointer;
      text-decoration:none;
      display:inline-block;
    }

    .dv-btn.o {
      background:transparent;
      color:var(--dash-text);
      border:1px solid var(--dash-border);
    }

    .dv-empty {
      text-align:center;
      padding:55px 20px;
    }

    .dv-empty h3 {
      margin:0 0 8px;
    }

    .dv-empty p {
      color:var(--dash-muted);
      margin-bottom:20px;
    }

    .dv-form {
      display:grid;
      grid-template-columns:repeat(4,1fr) auto;
      gap:12px;
    }

    .dv-form label {
      display:block;
      font-size:11px;
      font-weight:800;
      color:var(--dash-muted);
      margin-bottom:6px;
    }

    .dv-form input,
    .dv-form select,
    .dv-form textarea {
      width:100%;
      border:1px solid var(--dash-border);
      background:var(--dash-bg);
      color:var(--dash-text);
      border-radius:9px;
      padding:11px 12px;
      outline:none;
      font-family:inherit;
    }

    .dv-form textarea {
      min-height:100px;
      resize:vertical;
    }

    .dv-pill {
      display:inline-block;
      padding:6px 10px;
      border-radius:20px;
      font-size:10px;
      font-weight:800;
      background:var(--dash-accent-light);
      color:var(--dash-text);
    }

    .dv-pill.g {
      background:#e0f4e8;
      color:#28754c;
    }

    .dv-pill.w {
      background:#fff2d8;
      color:#a16a14;
    }

    .dv-pill.r {
      background:#f7dddd;
      color:#9d4040;
    }

    .dv-list > div {
      display:flex;
      justify-content:space-between;
      align-items:center;
      gap:15px;
      padding:16px 0;
      border-bottom:1px solid var(--dash-border);
    }

    .dv-list > div:last-child {
      border-bottom:0;
    }

    .dv-list strong {
      display:block;
      margin-bottom:4px;
    }

    .dv-list .m {
      display:block;
      color:var(--dash-muted);
      font-size:11px;
    }

    .dv-menu-btn {
      display:none;
      width:40px;
      height:40px;
      border:1px solid var(--dash-border);
      border-radius:10px;
      background:var(--dash-card);
      color:var(--dash-text);
      cursor:pointer;
      font-size:20px;
    }

    /* CHAT */

    .chat-layout {
      display:grid;
      grid-template-columns:280px 1fr;
      gap:18px;
      min-height:550px;
    }

    .chat-properties {
      background:var(--dash-card);
      border:1px solid var(--dash-border);
      border-radius:17px;
      padding:12px;
    }

    .chat-property {
      padding:14px;
      border-radius:12px;
      cursor:pointer;
      border:1px solid transparent;
      margin-bottom:6px;
    }

    .chat-property:hover,
    .chat-property.active {
      background:var(--dash-accent-light);
      border-color:var(--dash-border);
    }

    .chat-property strong {
      display:block;
      font-size:13px;
    }

    .chat-property span {
      color:var(--dash-muted);
      font-size:11px;
    }

    .chat-box {
      background:var(--dash-card);
      border:1px solid var(--dash-border);
      border-radius:17px;
      display:flex;
      flex-direction:column;
      overflow:hidden;
    }

    .chat-header {
      padding:18px;
      border-bottom:1px solid var(--dash-border);
    }

    .chat-header strong {
      display:block;
    }

    .chat-header span {
      color:var(--dash-muted);
      font-size:11px;
    }

    .chat-messages {
      flex:1;
      padding:20px;
      overflow-y:auto;
      min-height:350px;
      max-height:430px;
    }

    .message {
      display:flex;
      margin-bottom:13px;
    }

    .message.user {
      justify-content:flex-end;
    }

    .message.admin {
      justify-content:flex-start;
    }

    .bubble {
      max-width:70%;
      padding:11px 14px;
      border-radius:14px;
      font-size:13px;
      line-height:1.5;
    }

    .message.user .bubble {
      background:var(--dash-accent);
      color:white;
      border-bottom-right-radius:4px;
    }

    .message.admin .bubble {
      background:var(--dash-accent-light);
      color:var(--dash-text);
      border-bottom-left-radius:4px;
    }

    .message small {
      display:block;
      margin-top:4px;
      opacity:.65;
      font-size:9px;
    }

    .chat-input {
      display:flex;
      gap:10px;
      padding:14px;
      border-top:1px solid var(--dash-border);
    }

    .chat-input input {
      flex:1;
      height:44px;
      border:1px solid var(--dash-border);
      background:var(--dash-bg);
      color:var(--dash-text);
      border-radius:9px;
      padding:0 13px;
      outline:none;
    }

    /* VISITS */

    .visit-request {
      margin-bottom:18px;
    }

    .visit-item {
      display:flex;
      justify-content:space-between;
      gap:20px;
      align-items:center;
      padding:17px 0;
      border-bottom:1px solid var(--dash-border);
    }

    .visit-item:last-child {
      border-bottom:0;
    }

    .visit-info strong {
      display:block;
      margin-bottom:5px;
    }

    .visit-info p {
      margin:0;
      color:var(--dash-muted);
      font-size:12px;
    }

    .visit-actions {
      display:flex;
      align-items:center;
      gap:8px;
      flex-wrap:wrap;
    }

    /* TOAST */

    .dv-toast {
      position:fixed;
      right:25px;
      bottom:25px;
      z-index:9999;
      background:#20201e;
      color:#fff;
      padding:12px 18px;
      border-radius:10px;
      font-size:13px;
      opacity:0;
      transform:translateY(15px);
      pointer-events:none;
      transition:.25s;
    }

    .dv-toast.show {
      opacity:1;
      transform:translateY(0);
    }

    @media(max-width:900px) {

      .dv-form {
        grid-template-columns:1fr 1fr;
      }

      .chat-layout {
        grid-template-columns:1fr;
      }

    }

    @media(max-width:800px) {

      .dv-menu-btn {
        display:block;
      }

      .dash-sidebar.open {
        transform:translateX(0);
      }

    }

    @media(max-width:600px) {

      .dv-form {
        grid-template-columns:1fr;
      }

      .visit-item {
        flex-direction:column;
        align-items:flex-start;
      }

      .bubble {
        max-width:85%;
      }

    }

  `;

  d.head.appendChild(st);


  /* =====================================================
     TOAST
  ===================================================== */

  function toast(message) {

    var t = $(".dv-toast");

    if (!t) {
      t = d.createElement("div");
      t.className = "dv-toast";
      d.body.appendChild(t);
    }

    t.textContent = message;
    t.classList.add("show");

    clearTimeout(t.timer);

    t.timer = setTimeout(function () {
      t.classList.remove("show");
    }, 2500);
  }


  /* =====================================================
     MAIN ELEMENTS
  ===================================================== */

  var main = $(".dash-main,.admin-main");
  var head = $("header", main);
  var side = $(".dash-sidebar,.admin-sidebar");

  if (!main || !head || !side) return;


  /* =====================================================
     NAVIGATION
  ===================================================== */

  var keys = [
    "home",
    "find",
    "saved",
    "compare",
    "enquiries",
    "visits",
    "visited",
    "settings"
  ];

  var titles = {

    find: [
      "Find properties",
      "Search by location, budget, type and amenity."
    ],

    saved: [
      "Saved properties",
      "Homes you have saved on Estatery."
    ],

    compare: [
      "Compare",
      "Compare your selected properties."
    ],

    enquiries: [
      "My Enquiries",
      "Chat with agents and track your property enquiries."
    ],

    visits: [
      "Site Visits",
      "Request and manage your property visits."
    ],

    visited: [
      "Visited properties",
      "Properties you have already viewed."
    ],

    settings: [
      "Settings",
      "Manage your profile and preferences."
    ]

  };


  var originalTitle =
    head.querySelector("h1")
      ? head.querySelector("h1").textContent.trim()
      : "Welcome back";

  var originalText =
    head.querySelector("p")
      ? head.querySelector("p").textContent.trim()
      : "";


  /* =====================================================
     CREATE VIEWS
  ===================================================== */

  var homeV = d.createElement("div");

  homeV.className = "dv";
  homeV.id = "v-home";

  while (head.nextSibling) {
    homeV.appendChild(head.nextSibling);
  }

  main.appendChild(homeV);

  var views = {
    home: homeV
  };

  keys.slice(1).forEach(function (key) {

    var v = d.createElement("div");

    v.className = "dv";
    v.id = "v-" + key;
    v.hidden = true;

    main.appendChild(v);

    views[key] = v;

  });


  /* =====================================================
     MOBILE MENU
  ===================================================== */

  var menuButton = d.createElement("button");

  menuButton.className = "dv-menu-btn";
  menuButton.textContent = "☰";
  menuButton.setAttribute("aria-label", "Open menu");

  head.insertBefore(
    menuButton,
    head.firstChild
  );

  menuButton.onclick = function () {
    side.classList.toggle("open");
  };


  /* =====================================================
     PROPERTY CARD
  ===================================================== */

  function card(p) {

    if (!p) return "";

    var fav =
      ls("fav", []).indexOf(p.id) > -1;

    return `
      <article class="property-card" data-id="${p.id}">

        <div class="property-image">

          <img
            src="${p.img}"
            alt="${p.title}"
            loading="lazy"
          >

          <span class="property-tag">
            ${p.mode}
          </span>

          <button
            class="favorite-btn ${fav ? "on" : ""}"
            data-fav="${p.id}"
            aria-label="Save property"
          >
            ${fav ? "♥" : "♡"}
          </button>

        </div>

        <div class="property-content">

          <h3>${p.title}</h3>

          <div class="property-location">
            ${p.loc}
          </div>

          <div class="property-price">
            ${p.price}
          </div>

          <div class="property-meta">

            ${
              p.beds
                ? `<span>${p.beds} Beds</span>
                   <span>${p.baths} Baths</span>`
                : ""
            }

            <span>
              ${Number(p.area).toLocaleString()} sqft
            </span>

          </div>

        </div>

      </article>
    `;
  }


  function empty(titleText, message, action) {

    return `
      <div class="dv-card dv-empty">

        <h3>${titleText}</h3>

        <p>${message}</p>

        ${action || ""}

      </div>
    `;

  }


  /* =====================================================
     FIND
  ===================================================== */

  var limit = 10;

  function renderFind(options) {

    options = options || {};

    var v = views.find;

    if (!v.dataset.ready) {

      v.dataset.ready = "1";

      v.innerHTML = `

        <form
          class="dv-card dv-form"
          id="findForm"
          style="margin-bottom:18px"
        >

          <div>

            <label>LOCATION</label>

            <input
              name="loc"
              placeholder="Chennai, Coimbatore..."
            >

          </div>

          <div>

            <label>BUDGET</label>

            <select name="bud">

              <option value="">Any budget</option>

              <option value="0-50">
                Under ₹50 Lakhs
              </option>

              <option value="50-100">
                ₹50L - ₹1 Cr
              </option>

              <option value="100-200">
                ₹1 Cr - ₹2 Cr
              </option>

              <option value="200-9999">
                Above ₹2 Cr
              </option>

            </select>

          </div>

          <div>

            <label>PROPERTY TYPE</label>

            <select name="type">

              <option value="">
                Any type
              </option>

              <option>Apartment</option>
              <option>Villa</option>
              <option>House</option>
              <option>Plot</option>

            </select>

          </div>

          <div>

            <label>AMENITY</label>

            <select name="am">

              <option value="">
                Any amenity
              </option>

              <option>Swimming Pool</option>
              <option>Parking</option>
              <option>Gym</option>
              <option>Security</option>

            </select>

          </div>

          <div style="align-self:end">

            <button
              class="dv-btn"
              style="width:100%;height:44px"
            >
              Search
            </button>

          </div>

        </form>

        <div class="dv-bar">
          <strong id="findCount"></strong>
        </div>

        <div
          class="property-grid"
          id="findResults"
          style="display:grid;gap:20px"
        ></div>

        <div
          style="text-align:center;margin-top:22px"
        >

          <button
            class="dv-btn o"
            id="findMore"
          >
            Show more
          </button>

        </div>

      `;

      $("#findForm", v).onsubmit = function (e) {

        e.preventDefault();

        limit = 10;

        draw();

      };

      $("#findMore", v).onclick = function () {

        limit += 10;

        draw();

      };

    }

    var form = $("#findForm", v);

    if (options.set) {

      Object.keys(options.set).forEach(function (key) {

        if (form.elements[key]) {
          form.elements[key].value =
            options.set[key];
        }

      });

    }

    limit = 10;

    draw();


    function draw() {

      var loc =
        form.loc.value
          .trim()
          .toLowerCase();

      var budget =
        form.bud.value.split("-");

      var type =
        form.type.value;

      var amenity =
        form.am.value;


      var results = P.filter(function (p) {

        return (

          !loc ||
          (
            p.loc + " " + p.title
          )
            .toLowerCase()
            .indexOf(loc) > -1

        ) && (

          !type ||
          p.type === type

        ) && (

          !amenity ||
          p.am.indexOf(amenity) > -1

        ) && (

          !form.bud.value ||
          (
            p.lakhs != null &&
            p.lakhs >= Number(budget[0]) &&
            p.lakhs < Number(budget[1])
          )

        );

      });


      $("#findCount", v).textContent =
        results.length
          ? `Showing ${Math.min(limit, results.length)} of ${results.length} properties`
          : "";


      $("#findResults", v).innerHTML =
        results.length
          ? results
              .slice(0, limit)
              .map(card)
              .join("")
          : empty(
              "No properties found",
              "Try another location, budget or property type."
            );


      $("#findMore", v).hidden =
        results.length <= limit;

    }

  }


  /* =====================================================
     SAVED
  ===================================================== */

  function renderSaved() {

    var ids = ls("fav", []);

    var list =
      ids
        .map(byId)
        .filter(Boolean);


    views.saved.innerHTML =
      list.length

        ? `

          <div class="dv-bar">

            <strong>
              ${list.length} saved properties
            </strong>

            <button
              class="dv-btn o"
              id="clearSaved"
            >
              Clear all
            </button>

          </div>

          <div
            class="property-grid"
            style="display:grid;gap:20px"
          >
            ${list.map(card).join("")}
          </div>

        `

        : empty(
            "Nothing saved yet",
            "Tap the heart on a property and it will appear here.",
            `<button
              class="dv-btn"
              data-go="find"
            >
              Find properties
            </button>`
          );


    var clear =
      $("#clearSaved", views.saved);

    if (clear) {

      clear.onclick = function () {

        sv("fav", []);

        sync();

        toast("Saved properties cleared");

      };

    }

  }


  /* =====================================================
     COMPARE
  ===================================================== */

  function renderCompare() {

    var ids = ls("cmp", []);

    var list =
      ids
        .map(byId)
        .filter(Boolean);


    if (!list.length) {

      views.compare.innerHTML =
        empty(
          "Nothing to compare",
          "Select properties to compare them here.",
          `<a
             class="dv-btn"
             href="properties.html"
           >
             Browse properties
           </a>`
        );

      return;

    }


    views.compare.innerHTML = `

      <div class="dv-card">

        <div class="dv-bar">

          <strong>
            ${list.length} properties selected
          </strong>

        </div>

        <div style="overflow:auto">

          <table
            style="
              width:100%;
              border-collapse:collapse;
              font-size:13px;
            "
          >

            <thead>

              <tr>

                <th style="text-align:left;padding:12px">
                  Property
                </th>

                <th style="text-align:left;padding:12px">
                  Location
                </th>

                <th style="text-align:left;padding:12px">
                  Type
                </th>

                <th style="text-align:left;padding:12px">
                  Price
                </th>

                <th style="text-align:left;padding:12px">
                  Beds
                </th>

                <th style="text-align:left;padding:12px">
                  Area
                </th>

                <th></th>

              </tr>

            </thead>

            <tbody>

              ${list.map(function (p) {

                return `

                  <tr>

                    <td style="padding:12px">
                      <strong>${p.title}</strong>
                    </td>

                    <td style="padding:12px">
                      ${p.loc}
                    </td>

                    <td style="padding:12px">
                      ${p.type}
                    </td>

                    <td style="padding:12px">
                      ${p.price}
                    </td>

                    <td style="padding:12px">
                      ${p.beds || "-"}
                    </td>

                    <td style="padding:12px">
                      ${p.area} sqft
                    </td>

                    <td style="padding:12px">

                      <button
                        class="dv-btn o"
                        data-rmc="${p.id}"
                      >
                        Remove
                      </button>

                    </td>

                  </tr>

                `;

              }).join("")}

            </tbody>

          </table>

        </div>

      </div>

    `;

  }


  /* =====================================================
     ENQUIRY DATA
  ===================================================== */

  function getEnquiries() {

    return ls(
      "estatery_enquiries",
      []
    );

  }


  function saveEnquiries(data) {

    sv(
      "estatery_enquiries",
      data
    );

  }


  /*
     Creates demo enquiries only once.
  */

  function initializeEnquiries() {

    var existing =
      ls("estatery_enquiries", null);

    if (existing !== null) {
      return existing;
    }


    var demo = [

      {
        id:"ENQ001",
        propertyId:"p7",
        property:"Modern Garden Villa",
        user:"Harini",
        status:"Replied",
        created:"Sep 28",
        messages:[
          {
            sender:"user",
            text:"I am interested in this property. Is it still available?",
            time:"Sep 28 · 10:30 AM"
          },
          {
            sender:"admin",
            text:"Yes, the property is currently available. I can help you schedule a site visit.",
            time:"Sep 28 · 11:15 AM"
          }
        ]
      },

      {
        id:"ENQ002",
        propertyId:"p8",
        property:"Premium City Apartment",
        user:"Harini",
        status:"Pending",
        created:"Sep 25",
        messages:[
          {
            sender:"user",
            text:"Could you please share more details about this apartment?",
            time:"Sep 25 · 2:20 PM"
          }
        ]
      }

    ];


    saveEnquiries(demo);

    return demo;

  }


  /* =====================================================
     ENQUIRY CHAT
  ===================================================== */

  var selectedEnquiry = null;


  function renderEnquiries() {

    var enquiries =
      initializeEnquiries();


    if (!enquiries.length) {

      views.enquiries.innerHTML =
        empty(
          "No enquiries yet",
          "When you contact an agent, your conversation will appear here.",
          `<button
             class="dv-btn"
             data-go="find"
           >
             Find properties
           </button>`
        );

      return;

    }


    selectedEnquiry =
      selectedEnquiry || enquiries[0].id;


    views.enquiries.innerHTML = `

      <div class="chat-layout">

        <div class="chat-properties">

          <div
            style="
              padding:10px 12px;
              font-size:12px;
              font-weight:800;
              color:var(--dash-muted);
            "
          >
            YOUR ENQUIRIES
          </div>

          ${enquiries.map(function (e) {

            return `

              <div
                class="
                  chat-property
                  ${e.id === selectedEnquiry ? "active" : ""}
                "
                data-chat="${e.id}"
              >

                <strong>
                  ${e.property}
                </strong>

                <span>
                  ${e.status}
                </span>

              </div>

            `;

          }).join("")}

        </div>


        <div class="chat-box">

          ${renderChatContent(enquiries)}

        </div>

      </div>

    `;


    $$("[data-chat]", views.enquiries)
      .forEach(function (item) {

        item.onclick = function () {

          selectedEnquiry =
            item.dataset.chat;

          renderEnquiries();

        };

      });


    var send =
      $("#sendMessage", views.enquiries);

    if (send) {

      send.onclick = sendMessage;

    }


    var input =
      $("#chatMessage", views.enquiries);

    if (input) {

      input.addEventListener(
        "keydown",
        function (e) {

          if (e.key === "Enter") {

            e.preventDefault();

            sendMessage();

          }

        }
      );

    }

  }


  function renderChatContent(enquiries) {

    var current =
      enquiries.filter(function (e) {

        return e.id === selectedEnquiry;

      })[0];


    if (!current) {
      return "";
    }


    return `

      <div class="chat-header">

        <strong>
          ${current.property}
        </strong>

        <span>
          Enquiry ID: ${current.id}
        </span>

      </div>


      <div
        class="chat-messages"
        id="chatMessages"
      >

        ${current.messages.map(function (m) {

          return `

            <div class="message ${m.sender}">

              <div class="bubble">

                ${m.text}

                <small>
                  ${m.time}
                </small>

              </div>

            </div>

          `;

        }).join("")}

      </div>


      <div class="chat-input">

        <input
          id="chatMessage"
          placeholder="Type your message..."
        >

        <button
          class="dv-btn"
          id="sendMessage"
        >
          Send
        </button>

      </div>

    `;

  }


  function sendMessage() {

    var input =
      $("#chatMessage", views.enquiries);

    if (!input) return;


    var message =
      input.value.trim();

    if (!message) return;


    var enquiries =
      getEnquiries();


    var enquiry =
      enquiries.filter(function (e) {

        return e.id === selectedEnquiry;

      })[0];


    if (!enquiry) return;


    var now =
      new Date();


    var time =
      now.toLocaleDateString(
        "en-IN",
        {
          day:"2-digit",
          month:"short"
        }
      )
      +
      " · "
      +
      now.toLocaleTimeString(
        "en-IN",
        {
          hour:"2-digit",
          minute:"2-digit"
        }
      );


    enquiry.messages.push({

      sender:"user",
      text:message,
      time:time

    });


    enquiry.status =
      "Pending";


    saveEnquiries(enquiries);

    input.value = "";

    renderEnquiries();

    sync();

    toast("Message sent to agent");

  }


  /* =====================================================
     CREATE NEW ENQUIRY
  ===================================================== */

  function createEnquiry(propertyId) {

    var p = byId(propertyId);

    if (!p) return;


    var enquiries =
      getEnquiries();


    var existing =
      enquiries.filter(function (e) {

        return e.propertyId === propertyId;

      })[0];


    if (existing) {

      selectedEnquiry = existing.id;

      go("enquiries");

      return;

    }


    var id =
      "ENQ" +
      Date.now();


    enquiries.unshift({

      id:id,

      propertyId:propertyId,

      property:p.title,

      user:"Harini",

      status:"Pending",

      created:"Just now",

      messages:[

        {
          sender:"user",
          text:"Hello, I am interested in this property. Please share more details.",
          time:"Just now"
        }

      ]

    });


    saveEnquiries(enquiries);

    selectedEnquiry = id;

    go("enquiries");

    toast("Enquiry sent");

  }


  /* =====================================================
     SITE VISIT DATA
  ===================================================== */

  function getVisits() {

    return ls(
      "estatery_site_visits",
      []
    );

  }


  function saveVisits(data) {

    sv(
      "estatery_site_visits",
      data
    );

  }


  function initializeVisits() {

    var existing =
      ls("estatery_site_visits", null);

    if (existing !== null) {
      return existing;
    }


    var demo = [

      {
        id:"VIS001",
        propertyId:"p7",
        property:"Modern Garden Villa",
        date:"2026-10-05",
        time:"10:30 AM",
        status:"Scheduled",
        adminNote:"Visit confirmed by agent."
      },

      {
        id:"VIS002",
        propertyId:"p8",
        property:"Premium City Apartment",
        date:"2026-10-12",
        time:"3:00 PM",
        status:"Pending",
        adminNote:"Waiting for agent confirmation."
      }

    ];


    saveVisits(demo);

    return demo;

  }


  /* =====================================================
     SITE VISITS
  ===================================================== */

  function renderVisits() {

    var visits =
      initializeVisits();


    views.visits.innerHTML = `

      <div class="visit-request">

        <form
          class="dv-card dv-form"
          id="visitForm"
        >

          <div>

            <label>PROPERTY</label>

            <select name="property">

              ${P.map(function (p) {

                return `
                  <option value="${p.id}">
                    ${p.title}
                  </option>
                `;

              }).join("")}

            </select>

          </div>


          <div>

            <label>DATE</label>

            <input
              type="date"
              name="date"
              required
            >

          </div>


          <div>

            <label>TIME</label>

            <input
              type="time"
              name="time"
              required
            >

          </div>


          <div>

            <label>MESSAGE</label>

            <input
              name="note"
              placeholder="Optional message"
            >

          </div>


          <div style="align-self:end">

            <button
              class="dv-btn"
              style="height:44px;width:100%"
            >
              Request Visit
            </button>

          </div>

        </form>

      </div>


      <div class="dv-card">

        <div class="dv-bar">

          <strong>
            Your Site Visits
          </strong>

          <span class="dv-pill">
            ${visits.length} requests
          </span>

        </div>


        ${
          visits.length

          ? visits.map(function (v) {

              return `

                <div class="visit-item">

                  <div class="visit-info">

                    <strong>
                      ${v.property}
                    </strong>

                    <p>
                      ${formatDate(v.date)}
                      ·
                      ${v.time}
                    </p>

                    ${
                      v.note
                        ? `<p>${v.note}</p>`
                        : ""
                    }

                    ${
                      v.adminNote
                        ? `<p>
                            Agent:
                            ${v.adminNote}
                           </p>`
                        : ""
                    }

                  </div>


                  <div class="visit-actions">

                    <span class="dv-pill ${
                      v.status === "Scheduled"
                        ? "g"
                        : v.status === "Rejected"
                        ? "r"
                        : "w"
                    }">

                      ${v.status}

                    </span>


                    ${
                      v.status === "Pending"

                      ? `

                        <button
                          class="dv-btn o"
                          data-cancel-visit="${v.id}"
                        >
                          Cancel
                        </button>

                      `

                      : ""

                    }

                  </div>

                </div>

              `;

            }).join("")

          : empty(
              "No site visits",
              "Request a visit for any property you are interested in."
            )

        }

      </div>

    `;


    $("#visitForm", views.visits)
      .onsubmit = function (e) {

        e.preventDefault();

        var form = e.target;

        var property =
          byId(form.property.value);

        var date =
          form.date.value;

        var time =
          form.time.value;

        if (!property || !date || !time) {

          toast("Please select property, date and time");

          return;

        }


        var formattedTime =
          formatTime(time);


        visits.unshift({

          id:"VIS" + Date.now(),

          propertyId:property.id,

          property:property.title,

          date:date,

          time:formattedTime,

          status:"Pending",

          note:form.note.value.trim(),

          adminNote:"Waiting for agent response."

        });


        saveVisits(visits);

        form.reset();

        renderVisits();

        sync();

        toast("Site visit request sent");

      };


    $$(
      "[data-cancel-visit]",
      views.visits
    ).forEach(function (button) {

      button.onclick = function () {

        var id =
          button.dataset.cancelVisit;

        var updated =
          getVisits().filter(function (v) {

            return v.id !== id;

          });


        saveVisits(updated);

        renderVisits();

        sync();

        toast("Site visit cancelled");

      };

    });

  }


  function formatDate(value) {

    if (!value) return "";

    var date =
      new Date(value + "T00:00:00");

    return date.toLocaleDateString(
      "en-IN",
      {
        day:"2-digit",
        month:"short",
        year:"numeric"
      }
    );

  }


  function formatTime(value) {

    var parts =
      value.split(":");

    var h =
      Number(parts[0]);

    var m =
      parts[1];

    var suffix =
      h >= 12 ? "PM" : "AM";

    h =
      h % 12 || 12;

    return h + ":" + m + " " + suffix;

  }


  /* =====================================================
     VISITED
  ===================================================== */

  function renderVisited() {

    var ids = [
      "p10",
      "p11",
      "p12",
      "p4"
    ];

    views.visited.innerHTML = `

      <div
        class="property-grid"
        style="display:grid;gap:20px"
      >

        ${ids
          .map(function (id) {

            return card(byId(id));

          })
          .join("")}

      </div>

    `;

  }


  /* =====================================================
     SETTINGS
  ===================================================== */

  function renderSettings() {

    var profile =
      ls(
        "profile",
        {
          name:"Harini",
          email:"hello@estatery.example",
          phone:"+91 98765 43210",
          city:"Chennai"
        }
      );


    views.settings.innerHTML = `

      <form
        class="dv-card dv-form"
        id="settingsForm"
      >

        <div>

          <label>NAME</label>

          <input
            name="name"
            value="${profile.name}"
          >

        </div>

        <div>

          <label>EMAIL</label>

          <input
            name="email"
            value="${profile.email}"
          >

        </div>

        <div>

          <label>PHONE</label>

          <input
            name="phone"
            value="${profile.phone}"
          >

        </div>

        <div>

          <label>CITY</label>

          <input
            name="city"
            value="${profile.city}"
          >

        </div>

        <div style="align-self:end">

          <button
            class="dv-btn"
            style="height:44px"
          >
            Save changes
          </button>

        </div>

      </form>

    `;


    $("#settingsForm", views.settings)
      .onsubmit = function (e) {

        e.preventDefault();

        var data = {};

        [
          "name",
          "email",
          "phone",
          "city"
        ].forEach(function (key) {

          data[key] =
            e.target.elements[key].value;

        });


        sv("profile", data);

        toast("Settings saved");

      };

  }


  /* =====================================================
     RENDER MAP
  ===================================================== */

  var render = {

    find:renderFind,

    saved:renderSaved,

    compare:renderCompare,

    enquiries:renderEnquiries,

    visits:renderVisits,

    visited:renderVisited,

    settings:renderSettings

  };


  /* =====================================================
     NAVIGATION
  ===================================================== */

  var buttons =
    $$(".side-menu button");


  function go(key, options) {

    if (!views[key]) return;


    Object.keys(views)
      .forEach(function (x) {

        views[x].hidden =
          x !== key;

      });


    buttons.forEach(function (button, index) {

      button.classList.toggle(
        "active",
        keys[index] === key
      );

    });


    var h =
      head.querySelector("h1");

    var p =
      head.querySelector("p");


    h.textContent =
      key === "home"
        ? originalTitle
        : titles[key][0];


    p.textContent =
      key === "home"
        ? originalText
        : titles[key][1];


    if (render[key]) {

      render[key](options);

    }


    side.classList.remove("open");

    window.scrollTo({
      top:0,
      behavior:"smooth"
    });

  }


  buttons.forEach(function (button, index) {

    button.onclick = function () {

      go(keys[index]);

    };

  });


  /* =====================================================
     HOME SEARCH
  ===================================================== */

  var searchButton =
    $(".search-button");


  if (searchButton) {

    searchButton.onclick = function () {

      var fields =
        $$(".search-box input,.search-box select");

      var budgetIndex =
        fields[1].selectedIndex;

      var type =
        fields[2].value;

      var amenity =
        fields[3].value;


      go(
        "find",
        {
          set:{
            loc:fields[0].value,

            bud:[
              "",
              "0-50",
              "50-100",
              "100-200",
              "200-9999"
            ][budgetIndex],

            type:
              type === "Any Type"
                ? ""
                : type,

            am:
              amenity === "Any Amenity"
                ? ""
                : amenity

          }

        }
      );

    };

  }


  /* =====================================================
     HOME LINKS
  ===================================================== */

  $$(".section-title a")
    .forEach(function (link) {

      var text =
        link.closest(".section-title")
          ?.querySelector("h2")
          ?.textContent
          .trim();


      if (
        text === "Recently Visited" &&
        link.getAttribute("href") === "#"
      ) {

        link.onclick = function (e) {

          e.preventDefault();

          go("visited");

        };

      }

    });


  /* =====================================================
     GLOBAL CLICK EVENTS
  ===================================================== */

  d.addEventListener(
    "click",
    function (e) {

      var target;


      /* FAVORITE */

      target =
        e.target.closest("[data-fav]");

      if (target) {

        var fav =
          ls("fav", []);

        var id =
          target.dataset.fav;

        var index =
          fav.indexOf(id);


        if (index === -1) {

          fav.push(id);

          toast("Saved to your list");

        } else {

          fav.splice(index, 1);

          toast("Removed from saved");

        }


        sv("fav", fav);

        sync();

        return;

      }


      /* GO */

      target =
        e.target.closest("[data-go]");

      if (target) {

        go(target.dataset.go);

        return;

      }


      /* REMOVE COMPARE */

      target =
        e.target.closest("[data-rmc]");

      if (target) {

        var cmp =
          ls("cmp", []);

        cmp =
          cmp.filter(function (id) {

            return id !==
              target.dataset.rmc;

          });


        sv("cmp", cmp);

        renderCompare();

        sync();

        return;

      }

    }
  );


  /* =====================================================
     MAKE HOME PROPERTY HEARTS WORK
  ===================================================== */

  $$(".property-card")
    .forEach(function (cardElement) {

      var h =
        cardElement.querySelector("h3");

      var button =
        cardElement.querySelector(".favorite-btn");

      if (!h || !button) return;


      var property =
        P.filter(function (p) {

          return p.title ===
            h.textContent.trim();

        })[0];


      if (property) {

        button.dataset.fav =
          property.id;

      }

    });


  /* =====================================================
     STAT COUNTERS
  ===================================================== */

  function sync() {

    var fav =
      ls("fav", []);

    var compare =
      ls("cmp", []);

    var enquiries =
      getEnquiries();

    var visits =
      getVisits();


    var stats =
      $$(".stat-card h2");


    if (stats.length >= 4) {

      stats[0].textContent =
        fav.length;

      stats[1].textContent =
        compare.length;

      stats[2].textContent =
        enquiries.length;

      stats[3].textContent =
        visits.length;

    }


    $$("[data-fav]")
      .forEach(function (button) {

        var on =
          fav.indexOf(
            button.dataset.fav
          ) > -1;


        button.classList.toggle(
          "on",
          on
        );


        button.textContent =
          on ? "♥" : "♡";

      });


    if (
      views.saved &&
      !views.saved.hidden
    ) {

      renderSaved();

    }

  }


  /* =====================================================
     LISTEN FOR ADMIN CHANGES
  ===================================================== */

  window.addEventListener(
    "storage",
    function (event) {

      if (
        event.key ===
          "estatery_enquiries" ||
        event.key ===
          "estatery_site_visits"
      ) {

        if (!views.enquiries.hidden) {
          renderEnquiries();
        }

        if (!views.visits.hidden) {
          renderVisits();
        }

        sync();

        toast(
          "You have an update from Estatery"
        );

      }

    }
  );


  /* =====================================================
     START
  ===================================================== */

  initializeEnquiries();
  initializeVisits();

  sync();

})();