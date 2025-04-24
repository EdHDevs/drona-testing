<html>
  <head>
    <link
      rel="stylesheet"
      href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    />
    <style>
      #map {
        height: 500px;
        width: 100%;
        margin-top: 12px;
        border-radius: 8px;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>

    <script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin></script>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <script type="text/babel">
      const { useEffect, useRef } = React;

      const App = () => {
        const mapRef = useRef(null);

        useEffect(() => {
          const Lmap = L.map("map").setView([20.5937, 78.9629], 5);

          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; OpenStreetMap contributors'
          }).addTo(Lmap);

          const data = [
            {
              type_columns: "circle",
              coords_colms: [22.43134, 78.837609],
              radius_colmns: 326838.7435
            },
            {
              type_columns: "marker",
              coords_colms: [18.88238, 73.380321]
            },
            {
              type_columns: "polygon",
              coords_colms: [
                [26.57575, 70.1288],
                [26.88973, 87.9682],
                [31.64122, 75.75305]
              ],
              paint: {
                color: "#008000",
                weight: 3,
                fillColor: "#ff0000"
              }
            },
            {
              type_columns: "marker",
              coords_colms: [13.0294183, 77.6444617],
              icon: "????"
            }
          ];

          // Add shapes
          data.forEach((item) => {
            if (item.type_columns === "circle") {
              L.circle(item.coords_colms, {
                radius: item.radius_colmns,
                color: "#0000ff"
              }).addTo(Lmap);
            }
            if (item.type_columns === "marker") {
              const marker = L.marker(item.coords_colms);
              if (item.icon) {
                marker.setIcon(
                  L.divIcon({
                    className: "custom-icon",
                    html: item.icon,
                    iconSize: [20, 20]
                  })
                );
              }
              marker.addTo(Lmap);
            }
            if (item.type_columns === "polygon") {
              L.polygon(item.coords_colms, {
                color:
