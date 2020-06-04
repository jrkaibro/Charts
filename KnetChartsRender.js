var _this;

function KnetCharts($) {
    this.Pie;
    this.Polar;
    this.Line;
    this.Radar;
    this.Doughnut;
    this.Funnel;
    this.Bar;
    this.HorizontalBar;
    this.Charts;
    this.SelectedItem;
    this.Width;
    this.Height;

    // Databinding for property Pie
    this.SetPie = function (data) {
        ///UserCodeRegionStart:[SetPie] (do not remove this comment.)
        this.Pie = data;
        ///UserCodeRegionEnd: (do not remove this comment.)
    }

    // Databinding for property Pie
    this.GetPie = function () {
        ///UserCodeRegionStart:[GetPie] (do not remove this comment.)
        return this.Pie;
        ///UserCodeRegionEnd: (do not remove this comment.)
    }

    // Databinding for property Polar
    this.SetPolar = function (data) {
        ///UserCodeRegionStart:[SetPolar] (do not remove this comment.)
        this.Polar = data;
        ///UserCodeRegionEnd: (do not remove this comment.)
    }

    // Databinding for property Polar
    this.GetPolar = function () {
        ///UserCodeRegionStart:[GetPolar] (do not remove this comment.)
        return this.Polar;
        ///UserCodeRegionEnd: (do not remove this comment.)
    }

    // Databinding for property Line
    this.SetLine = function (data) {
        ///UserCodeRegionStart:[SetLine] (do not remove this comment.)
        this.Line = data;
        ///UserCodeRegionEnd: (do not remove this comment.)
    }

    // Databinding for property Line
    this.GetLine = function () {
        ///UserCodeRegionStart:[GetLine] (do not remove this comment.)
        return this.Line;
        ///UserCodeRegionEnd: (do not remove this comment.)
    }

    // Databinding for property Radar
    this.SetRadar = function (data) {
        ///UserCodeRegionStart:[SetRadar] (do not remove this comment.)
        this.Radar = data;
        ///UserCodeRegionEnd: (do not remove this comment.)
    }

    // Databinding for property Radar
    this.GetRadar = function () {
        ///UserCodeRegionStart:[GetRadar] (do not remove this comment.)
        return this.Radar;
        ///UserCodeRegionEnd: (do not remove this comment.)
    }

    // Databinding for property Doughnut
    this.SetDoughnut = function (data) {
        ///UserCodeRegionStart:[SetDoughnut] (do not remove this comment.)
        this.Doughnut = data;
        ///UserCodeRegionEnd: (do not remove this comment.)
    }

    // Databinding for property Doughnut
    this.GetDoughnut = function () {
        ///UserCodeRegionStart:[GetDoughnut] (do not remove this comment.)
        return this.Doughnut;
        ///UserCodeRegionEnd: (do not remove this comment.)
    }

    // Databinding for property Funnel
    this.SetFunnel = function (data) {
        ///UserCodeRegionStart:[SetFunnel] (do not remove this comment.)
        this.Funnel = data;
        ///UserCodeRegionEnd: (do not remove this comment.)
    }

    // Databinding for property Funnel
    this.GetFunnel = function () {
        ///UserCodeRegionStart:[GetFunnel] (do not remove this comment.)
        return this.Funnel;
        ///UserCodeRegionEnd: (do not remove this comment.)
    }

    // Databinding for property Bar
    this.SetBar = function (data) {
        ///UserCodeRegionStart:[SetBar] (do not remove this comment.)
        this.Bar = data;
        ///UserCodeRegionEnd: (do not remove this comment.)
    }

    // Databinding for property Bar
    this.GetBar = function () {
        ///UserCodeRegionStart:[GetBar] (do not remove this comment.)
        return this.Bar;
        ///UserCodeRegionEnd: (do not remove this comment.)
    }

    // Databinding for property HorizontalBar
    this.SetHorizontalBar = function (data) {
        ///UserCodeRegionStart:[SetHorizontalBar] (do not remove this comment.)
        this.HorizontalBar = data;
        ///UserCodeRegionEnd: (do not remove this comment.)
    }

    // Databinding for property HorizontalBar
    this.GetHorizontalBar = function () {
        ///UserCodeRegionStart:[GetHorizontalBar] (do not remove this comment.)
        return this.HorizontalBar;
        ///UserCodeRegionEnd: (do not remove this comment.)
    }

    // Databinding for property Charts
    this.SetCharts = function (data) {
        ///UserCodeRegionStart:[SetCharts] (do not remove this comment.)
        this.Charts = data;
        ///UserCodeRegionEnd: (do not remove this comment.)
    }

    // Databinding for property Charts
    this.GetCharts = function () {
        ///UserCodeRegionStart:[GetCharts] (do not remove this comment.)
        return this.Charts;
        ///UserCodeRegionEnd: (do not remove this comment.)
    }

    // Databinding for property SelectedItem
    this.SetSelectedItem = function (data) {
        ///UserCodeRegionStart:[SetSelectedItem] (do not remove this comment.)
        this.SelectedItem = data;
        ///UserCodeRegionEnd: (do not remove this comment.)
    }

    // Databinding for property SelectedItem
    this.GetSelectedItem = function () {
        ///UserCodeRegionStart:[GetSelectedItem] (do not remove this comment.)
        return this.SelectedItem;
        ///UserCodeRegionEnd: (do not remove this comment.)
    }

    var charts = [];

    this.show = function () {
        ///UserCodeRegionStart:[show] (do not remove this comment.)
        var myCharts = this.Charts;
        _this = this;

        var buffer = '';

        if (!this.IsPostBack) {
            myCharts.forEach(function (chart, index) {
                myCharts[index] = ConfigureChart(chart);
            });

            buffer += createDivChart(myCharts);
            document.getElementById(this.ContainerName).innerHTML = buffer;

            myCharts.forEach(function (chart, index) {
                try {
                    charts.push(CreateChart(chart));
					//console.log(chart);
                } catch (err) {
                    try {
                        printInCanvas(chart.name, chart.options.title.text + ":\n Dados não encontrados");
                    } catch (err) {
                        console.log("Erro ao criar gráfico: " + err);
                    }
                }
            });
        }

        function ConfigureChart(chart) {
            try {
                chart.data = JSON.parse(chart.data);
                if (chart.type == 'funnel') {
                    chart.options.tooltips = {
                        callbacks: {
                            title: function (tooltipItem, data) {
                                return data.labels[tooltipItem[0].index];
                            },
                            label: function (tooltipItem, data) {
                                return data.values[tooltipItem.index];
                            }
                        }
                    };
                    chart.options.scales = {
                        yAxes: [{
                            display: true,
                            type: "linear",
                            ticks: {
                                display: false,
                                beginAtZero: true,
                                stacked: true,
                                stepSize: 5
                            }
                        }
                        ]
                    };
                } else if (chart.type == 'line') {
                    chart.data.datasets.forEach(function (item, index2) {
                        chart.data.datasets[index2].borderColor = item.pointBackgroundColor;
                    });
                } else if (chart.type == 'horizontalBar') {
                    chart.options.scales = {
                        xAxes: [{
                            ticks: {
                                beginAtZero: true,
                                stepSize: 5
                            }
                        }
                        ],
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                stepSize: 5
                            }
                        }
                        ]
                    };
                }
            } catch (err) {
                console.log("Erro ao configurar gráfico: " + err);

                chart = {
                    type: 'bar',
                    data: {
                        labels: [""],
                        datasets: [{
                            label: '',
                            data: [],
                            backgroundColor: [
                            ],
                            borderColor: [
                            ],
                            borderWidth: 0
                        }]
                    },
                    options: {
                        responsive: true,
                        legend: {
                            display: false
                        },
                        title: {
                            display: true,
                            fontSize: 16,
                            fontColor: 'red',
                            fontStyle: 'bold',
                            padding: 100,
                            text: 'Erro ao renderizar gráfico'
                        },
                        scales: {
                            display: false,
                            xAxes: [{ display: false }],
                            yAxes: [{ display: false }]
                        }
                    },
                    name: 'Chart' + Math.floor((Math.random() * 100000) + 1)
                };
            }

            return chart;
        }

        function printInCanvas(id, msg) {
            var canvas = document.getElementById(id);
            var ctx = canvas.getContext("2d");
            ctx.font = "14px Arial";
            ctx.fillStyle = "red";
            ctx.textAlign = "center";

            var lineHeight = ctx.measureText("M").width * 1.2;
            var lines = msg.split("\n");
            var x = canvas.width / 2;
            var y = canvas.height / 2;

            for (var i = 0; i < lines.length; ++i) {
                ctx.fillText(lines[i], x, y);
                y += lineHeight;
            }
        }

        function CreateChart(chartConfig) {
            var chartObject;
            try {
                if (chartConfig) {
                    var ctx = document.getElementById(chartConfig.name).getContext("2d");
                    chartObject = new Chart(ctx, chartConfig);
                }
            } catch (err) {
                console.log("Erro ao criar gráfico: " + err);
            }
            return chartObject;
        }

        function UpdateChart(chartConfig) {
            var i = 0;

            if (charts.length > 0) {
                charts.forEach(function (chart, index) {
                    if (chart.config.name == chartConfig.name) {
                        chart.destroy();
                        i = index;
                    }
                });
            }

            charts[i] = CreateChart(chartConfig);
        }

        function toTitleCase(str) {
            return str.replace(/\w\S*/g, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        }

        function createDivChart(charts) {
            var countCharts = charts.length;

            var buffer = '';
            buffer += '	<section class="view-container animate-fade-up">'
            buffer += '	    <div class="page page-dashboard">'

            charts.forEach(function (chart, index) {
                try {
                    var name = "";

                    if (chart && chart.name) {
                        name = chart.name;
                    }

                    if (isOdd(index + 1)) {
                        if ((index + 1) < countCharts) {
                            buffer += '	        <div class="row">'
                            buffer += '	            <div class="col-lg-6">'
                            buffer += '	                <div class="panel panel-default">'
                            buffer += '	                    <div class="panel-body">'

                            buffer += createDivChartFilter(chart);

                            buffer += '							<canvas id="' + name + '" class="canvas-img-responsive" height="130"></canvas>'
                            buffer += '	                    </div>'
                            buffer += '	                </div>'
                            buffer += '	            </div>'
                        } else {
                            buffer += '	        <div class="row">'
                            buffer += '	            <div class="col-lg-12">'
                            buffer += '	                <div class="panel panel-default">'
                            buffer += '	                    <div class="panel-body">'

                            buffer += createDivChartFilter(chart);

                            buffer += '							<canvas id="' + name + '" class="canvas-img-responsive" height="100"></canvas>'
                            buffer += '	                    </div>'
                            buffer += '	                </div>'
                            buffer += '	            </div>'
                            buffer += '	        </div>'
                        }
                    } else {
                        buffer += '	       	    	<div class="col-lg-6">'
                        buffer += '	       	    	    <div class="panel panel-default">'
                        buffer += '	       	    	        <div class="panel-body">'

                        buffer += createDivChartFilter(chart);

                        buffer += '									<canvas id="' + name + '" class="canvas-img-responsive" height="130"></canvas>'
                        buffer += '	       	    	        </div>'
                        buffer += '	       	    	    </div>'
                        buffer += '	       	    	</div>'
                        buffer += '	       		</div>'
                    }
                } catch (err) {
                    console.log("Erro ao criar div: " + err);
                }
            });

            buffer += '	    </div>'
            buffer += '	</section>'

            return buffer;
        }

        function createDivChartFilter(chart) {
            var buffer = '';

            try {
                if (chart.filter) {
                    buffer += ' <div id="' + chart.filter.name + 'Filter" class="filter-button">'
                    buffer += ' 	<label class="Label">' + chart.filter.name + '</label>'
                    buffer += ' 	<select id="' + chart.filter.name + 'Select" name="' + chart.filter.name + 'Select" class="Attribute input-sm" onchange="changeChart(this, \'' + chart.name + '\');">'

                    chart.filter.filters.forEach(function (filter, index) {
                        var obj = filter.split(';');
                        buffer += ' <option value="' + obj[0] + '">' + obj[1] + '</option>'
                    });

                    buffer += ' 	</select>'
                    buffer += ' </div>'
                } else {
                    buffer += ' <div class="Label" style="height:30px;">&nbsp;</div>'
                }
            } catch (err) {
                console.log("Erro ao criar div: " + err);
            }

            return buffer;
        }

        function isEven(n) {
            return n % 2 == 0;
        }

        function isOdd(n) {
            return Math.abs(n % 2) == 1;
        }

        this.RefreshFunnel = function (chartConfig) {
            ConfigureChart(chartConfig);
            UpdateChart(chartConfig)
        }

        this.RefreshHorizontalBar = function (chartConfig) {
            ConfigureChart(chartConfig);
            UpdateChart(chartConfig)
        }

        this.RefreshBar = function (chartConfig) {
            ConfigureChart(chartConfig);
            UpdateChart(chartConfig)
        }
        ///UserCodeRegionEnd: (do not remove this comment.)
    }
    ///UserCodeRegionStart:[User Functions] (do not remove this comment.)

    ///UserCodeRegionEnd: (do not remove this comment.):
}

function changeChart(sel, chart) {
    _this.SelectedItem.ID = sel.value;
    _this.SelectedItem.Chart = chart;
    _this.OnClick();
}