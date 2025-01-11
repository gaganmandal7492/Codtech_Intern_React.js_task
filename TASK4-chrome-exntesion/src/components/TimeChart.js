import React from "react";
import DonutChart from "react-donut-chart";
import "./TimeChart.css";

class TimeChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      siteData: [],
    };
  }

  sort_keys(obj) {
    var domain_keys = Object.keys(obj)
      .sort(function (a, b) {
        return obj[a] - obj[b];
      })
      .reverse();
    return domain_keys;
  }

  format_seconds(seconds) {
    if (seconds < 60) {
      return seconds + " s";
    } else if (seconds >= 60 && seconds < 3600) {
      return Math.floor(seconds / 60) + " m " + (seconds % 60) + " s";
    } else if (seconds > 3600) {
      var hour = Math.floor(seconds / 3600);
      var minute = Math.floor((seconds - hour * 3600) / 60);
      return hour + " h " + minute + " m " + (seconds % 60) + " s";
    }
  }

  componentDidMount() {
    var data = [];

    try {
      // Check if 'today_domains' exists in localStorage
      var domainsString = localStorage["today_domains"];

      // If 'today_domains' doesn't exist or is undefined, exit early
      if (!domainsString) {
        console.warn("No data found for today's domains.");
        return;
      }

      // Try to parse the JSON data from localStorage
      var domains = JSON.parse(domainsString);

      // If the parsed object is empty, return early
      if (Object.keys(domains).length === 0) {
        console.warn("No data found for today's domains.");
        return;
      }

      var domain_keys = this.sort_keys(domains);

      for (var i = 0; i < domain_keys.length; i++) {
        var domain = domain_keys[i];

        var dict = {};
        dict["label"] = domain;
        dict["value"] = domains[domain]; // No need to parse again, since it's already parsed

        data.push(dict);
      }

      this.setState({ siteData: data });
    } catch (error) {
      console.error(
        "Error loading or parsing 'today_domains' from localStorage:",
        error
      );
    }
  }

  render() {
    return (
      <div className="time-chart-section">
        <div className="time-chart-heading">Today's Usage</div>
        <DonutChart
          className="time-chart"
          data={this.state.siteData}
          height={1000 / 3}
          width={1000 / 3}
          innerRadius={0.6}
          colors={[
            "#f44336",
            "#e91e63",
            "#9c27b0",
            "#673ab7",
            "#3f51b5",
            "#2196f3",
            "#03a9f4",
            "#00bcd4",
            "#009688",
            "#4caf50",
            "#8bc34a",
            "#cddc39",
            "#ffeb3b",
            "#ffc107",
            "#ff9800",
            "#ff5722",
            "#795548",
            "#607d8b",
          ]}
          legend={false}
        />
      </div>
    );
  }
}

export default TimeChart;
