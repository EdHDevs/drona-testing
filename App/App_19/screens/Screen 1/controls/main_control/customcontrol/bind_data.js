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
          const map = L.map("map").setView([39.0, -81.0], 6);

          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; OpenStreetMap contributors'
          }).addTo(map);

          const from = [{{gps}}];
          const to = [44.65453, -79.38018];

          function stepsBetween(start, end, kmStep = 1) {
            const R = 6371;
            const dLat = ((end[0] - start[0]) * Math.PI) / 180;
            const dLon = ((end[1] - start[1]) * Math.PI) / 180;
            const a =
              Math.sin(dLat / 2) ** 2 +
              Math.cos((start[0] * Math.PI) / 180) *
                Math.cos((end[0] * Math.PI) / 180) *
                Math.sin(dLon / 2) ** 2;
            const dist = 2 * R * Math.asin(Math.sqrt(a));
            const steps = Math.floor(dist / kmStep);
            const points = [];
            for (let i = 0; i <= steps; i++) {
              const lat = start[0] + ((end[0] - start[0]) * i) / steps;
              const lon = start[1] + ((end[1] - start[1]) * i) / steps;
              points.push([+lat.toFixed(5), +lon.toFixed(5)]);
            }
            return points;
          }

          const steps = stepsBetween(from, to, 1);

          // Add all 1km step markers
          steps.forEach((coord) => {
            L.marker(coord).addTo(map);
          });

          // Add start marker
          L.marker(from).addTo(map).bindPopup("Start (L1AAA)").openPopup();

          // Add destination marker
          L.marker(to).addTo(map).bindPopup("End (P1AAA)");

          // Add 50m clock-in zone around destination
          L.circle(to, {
            radius: 50,
            color: "#00ff00",
            fillOpacity: 0.3
          }).addTo(map);
        }, []);

        return (
          <div>
            <h3>Tracking Route (1km steps)</h3>
            <div id="map" ref={mapRef}></div>
          </div>
        );
      };

      ReactDOM.render(<App />, document.getElementById("root"));
    </script>
  </body>
</html>