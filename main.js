const app = () => {
    const outline = document.querySelector(".moving-outline circle");


    const outlineLength = outline.getTotalLength();

    let fakeDuration = 100;

    outline.style.strokeDashoffset = outlineLength;
    outline.style.strokeDasharray = outlineLength;
    let progress = outlineLength - (45 / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

}
app()
const app1 = () => {
    const outline = document.querySelector(".moving circle");


    const outlineLength = outline.getTotalLength();

    let fakeDuration = 100;

    outline.style.strokeDashoffset = outlineLength;
    outline.style.strokeDasharray = outlineLength;
    let progress = outlineLength - (30 / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

}
app1()

var ctx = document.getElementById('chart').getContext("2d");

var gradientStroke = ctx.createLinearGradient(1000, 1200, 1000, 0);
gradientStroke.addColorStop(1, "#fff");
gradientStroke.addColorStop(0.25, "#fff");
gradientStroke.addColorStop(0.5, "#ffa9a9f2");
gradientStroke.addColorStop(0, "#fff");
var data = {
    legend: false,
    labels: ["Mon", "Tue", "Wed", "Thu", "Friday", "Sat", "Sun", ],
    datasets: [{
        fill: true,
        backgroundColor: gradientStroke,
        borderColor: '#F98686',
        borderWidth: 2,
        data: [340, 190, 250, 420, 300, 1000, 300],
        pointBorderWidth: 9,
        pointRadius: 9,
        pointBorderColor: 'transparent',
        pointHoverRadius: 4,
        pointHoverBorderWidth: 3,
        pointHoverBackgroundColor: '#F98686',
        pointHoverBorderColor: '#F98686',
        pointBackgroundColor: 'transparent'


    }]
};
var options = {
    hover: {
        mode: 'index',
        intersect: false
    },
    tooltips: {
        backgroundColor: '#FFF',
        bodyFontColor: '#393f5b',
        bodyFontSize: 20,
        displayColors: false,
        bodySpacing: 10,
        intersect: false,
        bodyFontStyle: 'bold',
        xPadding: 15,
        yPadding: 15,
        mode: 'index',
        callbacks: {
            title: function () {}
        }
    },
    legend: {
        display: false
    },
    maintainAspectRatio: false,
    scales: {
        yAxes: [{
            stacked: true,
            gridLines: {
                display: true,
                color: "#6e6e6e26",
                padding: 0,
            },
            ticks: {
                beginAtZero: true,
                min: 0,
                max: 1200,
                stepSize: 300,
                display: true
            }
        }],
        xAxes: [{
            gridLines: {
                display: false,
                color: "#6e6e6e26",

            },
            ticks: {
                fontSize: 14,
                fontColor: '#afb6d4',
            }
        }]
    }
};

let draw = Chart.controllers.line.prototype.draw;
Chart.controllers.line.prototype.draw = function () {
    draw.apply(this, arguments);
    let ctx = this.chart.chart.ctx;
    let _stroke = ctx.stroke;
    ctx.stroke = function () {
        ctx.save();
        ctx.shadowColor = '#fb9898';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 40;
        _stroke.apply(this, arguments);
        ctx.restore();
    }
};
Chart.defaults.LineWithLine = Chart.defaults.line;
Chart.controllers.LineWithLine = Chart.controllers.line.extend({
    draw: function (ease) {
        if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
            var activePoint = this.chart.tooltip._active[0],
                ctx = this.chart.ctx,
                x = activePoint.tooltipPosition().x,
                topY = this.chart.scales['y-axis-0'].top,
                bottomY = this.chart.scales['y-axis-0'].bottom;

            // draw line
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x, topY);
            ctx.lineTo(x, bottomY);
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#6e6e6e26';
            ctx.shadowBlur = 1;
            ctx.stroke();
            ctx.restore();
        }
        Chart.controllers.line.prototype.draw.call(this, ease);
    }
});
var chart = new Chart(ctx, {
    type: 'LineWithLine',
    data: data,
    options: options
});

var config = {
    type: 'doughnut',
    data: {

        datasets: [{
            data: [
                200,
                200,
                300,
                400
            ],
            backgroundColor: [
                "#922c88",
                "#7ed321",
                "#7abec5",
                "#ff3270"

            ],
        }]

    },
    options: {
        responsive: true,
        cutoutPercentage: 95

    }
};


window.onload = function () {
    var ctx = document.getElementById("donut").getContext("2d");
    window.myPie = new Chart(ctx, config);
};